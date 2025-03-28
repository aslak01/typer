<script lang="ts">
  let {
    page,
    nextPage,
    totalPages,
  }: {
    page: string;
    nextPage: () => void;
    totalPages: number;
  } = $props();

  import { gameState } from "$lib/stores/gameState.svelte";
  import { createPageState } from "$lib/stores/pageState.svelte";
  import { onDestroy, onMount } from "svelte";
  import { parseInsert } from "./parse-keydown.svelte";

  let pageLength = $derived(page.length);
  let pageState = createPageState(page);

  let game: HTMLElement | null = null;

  function setTypingStatus(typing: boolean) {
    clearInterval(pageState.typingInterval);

    if (typing) {
      function incrementTime() {
        gameState.time += 10;
      }
      pageState.typingInterval = setInterval(incrementTime, 10);
    }
  }

  function handleKeydown(e: KeyboardEvent) {
    const { key, isTyping } = parseInsert(e, gameState, pageState);

    setTypingStatus(isTyping);

    if (key === null) return;

    let inserted = key;

    const target = page[pageState.currIndex];
    const isCorrect = matches(inserted, target);

    if (pageState.currIndex < pageLength) {
      pageState.typed += inserted;
      pageState.currIndex++;
    }

    if (!isCorrect) {
      pageState.misclicks++;
    }

    if (isCorrect) {
      const delta = gameState.time - pageState.lastTimestamp;
      pageState.deltas = delta;
      pageState.lastTimestamp = gameState.time;
    }

    if (pageState.currIndex >= pageLength && isCorrect) {
      submitResults();
      resetProgress();
      nextPage();
    }
  }

  function submitResults() {
    const acc = getAccuracy(pageState.typed, page);
    const realAcc = 100 - (pageState.misclicks / page.length) * 100;

    gameState.realAcc = realAcc > 0 ? realAcc : 0;
    gameState.acc = acc;
    pageState.lastTimestamp = gameState.time;
    gameState.typed += page.length;
    gameState.lastTime = gameState.time;
  }

  function resetProgress() {
    pageState.misclicks = 0;
    pageState.typed = "";
    pageState.currIndex = 0;
    pageState.resetDeltas;
  }

  function replaceSpecialChars(input: string): string {
    const replacements: Record<string, string> = {
      "‘": "'",
      "’": "'",
      "“": '"',
      "”": '"',
      "–": "-",
      "—": "-",
    };

    return input.replace(/[‘’“”–—]/g, (match) => replacements[match] || match);
  }

  function getAccuracy(str1: string, str2: string) {
    if (str1.length !== str2.length) {
      throw new Error("Strings must be of the same length");
    }
    const matchCount = str1
      .split("")
      .filter((char, index) => char === str2[index]).length;
    const percentageMatch = (matchCount / str1.length) * 100;
    return percentageMatch;
  }

  function matches(input: string, tar: string) {
    if (!input || !tar) return false;
    const match = input === replaceSpecialChars(tar);
    return match;
  }
  $effect(() => {
    if (!game) return;
    if (gameState.mode === "I") {
      game.setAttribute("tabindex", "-1");
      game.focus();
    }
    if (gameState.mode === "N") {
      game.setAttribute("tabindex", "0");
      game.blur();
    }
  });
  onMount(() => {
    gameState.createChapterState(totalPages);
    gameState.playing = true;
  });
  onDestroy(() => (gameState.playing = false));
</script>

<svelte:window on:keydown={handleKeydown} />

<div
  bind:this={game}
  class="text-zone {gameState.mode === 'I' ? 'inserting' : ''}"
>
  <div class="text-area">
    {#each page as letter, i}
      {@const active = i === pageState.typed.length}
      {@const correct = matches(pageState.typed[i], page[i])}
      {@const attempted = pageState.typed.length > i}
      {@const wrong = attempted && !correct}
      <span class:correct class:wrong class:active>
        {#if !wrong}
          {#if letter === " "}
            &ensp;
          {:else if letter === "↪"}
            <span class="cr spchar enter">↪</span><br />
          {:else if letter === "→"}
            <span class="tab spchar">→</span>
          {:else}
            {letter}
          {/if}
        {:else if pageState.typed[i] === " "}
          ·
        {:else}
          {pageState.typed[i]}
        {/if}
      </span>
    {/each}
  </div>
</div>

<style>
  .text-zone {
    display: flex;
    height: 100%;
    align-items: center;
  }
  .text-area {
    z-index: 10;
    padding-inline: 1ch;
    background-color: var(--surface1);
  }
  .inserting .text-area {
    background: var(--surface3);
  }
  .text-zone:focus-within {
    outline: none;
  }
  .text-zone.inserting {
    word-break: break-word;
  }

  .spchar {
    background: var(--surface3);
    border-radius: 5px;
    padding-inline: 2px;
    margin-inline: 0.5ch;
  }
  .enter {
    padding-top: 5px;
    padding-bottom: -5px;
  }
  .text-zone.inserting .spchar {
    background: var(--surface4);
  }
  .text-zone .correct .spchar {
    color: var(--surface1);
  }
  .text-zone.inserting .correct .spchar {
    background: var(--text-faded);
    color: var(--surface3);
  }
  .tab {
    margin: 0;
    margin-inline-end: 0.5ch;
    padding-inline: 1ch;
  }
  .correct {
    color: var(--text-faded);
  }
  .wrong {
    color: var(--red-5);
    text-decoration-line: underline;
    text-decoration-style: solid;
    text-decoration-color: var(--red-5);
    hyphens: auto;
    -webkit-hyphens: auto;
  }
  .inserting .active {
    position: relative;
  }
  .inserting .active::before {
    content: "";
    position: absolute;
    height: 0.6lh;
    left: -3px;
    top: 0.04lh;
    outline: 1px solid var(--yellow-6);
    white-space: pre;
  }
</style>
