<script lang="ts">
  let {
    page,
    nextPage,
  }: {
    page: string;
    nextPage: () => void;
  } = $props();

  import { gameState } from "$lib/stores/gameState.svelte";

  let curr = $state(0);
  let typed = $state("");
  let misclicks = $state(0);
  let deltas: number[] = $state([]);
  const avgOfDeltas = $derived(
    deltas.reduce((acc, curr) => acc + curr, 0) / deltas.length || 1,
  );
  let currLen = $derived(page.length);
  let lastTimestamp = 0;

  let game: HTMLElement | null = null;

  let typingInterval: number | undefined;

  function setTypingStatus(typing: boolean) {
    clearInterval(typingInterval);

    if (typing) {
      function incrementTime() {
        gameState.time += 10;
      }
      typingInterval = setInterval(incrementTime, 10);
    }
  }

  function isInput(inp: string): boolean {
    return (
      inp.length === 1 ||
      inp === "Enter" ||
      inp === "Tab" ||
      inp === "Backspace"
    );
  }

  function isInsert(m: string) {
    return m.toLowerCase() === "i";
  }

  function handleKeydown(e: KeyboardEvent) {
    const { key } = e;

    const isInsertMode = isInsert(gameState.mode);

    if (!isInsertMode) {
      if (isInsert(key)) {
        gameState.mode = "I";
        setTypingStatus(true);
        return;
      }
    }

    if (isInsertMode) {
      if (key === "Escape") {
        gameState.mode = "N";
        setTypingStatus(false);
        return;
      }
      if (key === "Tab") {
        // tab is an input so prevent it behaving
        // as a window controller
        e.preventDefault();
      }
    }

    const keyIsInput = isInput(key);

    if (!keyIsInput || !isInsertMode) {
      return;
    }

    if (key === "Backspace") {
      if (typed.length > 0) {
        typed = typed.slice(0, -1);
        curr--;
      }
      return;
    }

    let inserted = key;

    if (key === "Enter") {
      inserted = "↪";
    }
    if (key === "Tab") {
      inserted = "→";
    }
    const target = page[curr];
    const isCorrect = matches(inserted, target);

    if (curr < currLen) {
      typed += inserted;
      curr++;
    }

    if (!isCorrect) {
      misclicks++;
    }

    if (isCorrect) {
      const delta = gameState.time - lastTimestamp;
      deltas.push(delta);
      lastTimestamp = gameState.time;
    }

    if (curr >= currLen && isCorrect) {
      const acc = getAccuracy(typed, page);
      const realAcc = 100 - (misclicks / page.length) * 100;

      gameState.realAcc = realAcc > 0 ? realAcc : 0;
      gameState.acc = acc;
      lastTimestamp = gameState.time;
      gameState.typed += page.length;
      gameState.lastTime = gameState.time;

      misclicks = 0;
      typed = "";
      curr = 0;
      deltas = [];

      nextPage();
    }
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
  // $effect(() => {
  //   if (!game) return;
  //   if (gameState.mode === "I") {
  //     game.setAttribute("tabindex", "-1");
  //     game.focus();
  //   }
  //   if (gameState.mode === "N") {
  //     game.setAttribute("tabindex", "0");
  //     game.blur();
  //   }
  // });
</script>

<svelte:window on:keydown={handleKeydown} />

<div
  bind:this={game}
  class="text-zone {gameState.mode === 'I' ? 'inserting' : ''}"
>
  <div class="text-area">
    {#each page as letter, i}
      {@const active = i === typed.length}
      {@const correct = matches(typed[i], page[i])}
      {@const attempted = typed.length > i}
      {@const wrong = attempted && !correct}
      <span class:correct class:wrong class:active>
        {#if !wrong}
          {#if letter === " "}
            &ensp;
          {:else if letter === "↪"}
            <span class="cr spchar">↪</span><br />
          {:else if letter === "→"}
            <span class="tab spchar">→</span>
          {:else}
            {letter}
          {/if}
        {:else if typed[i] === " "}
          ·
        {:else}
          {typed[i]}&shy;
        {/if}
      </span>
    {/each}
  </div>
</div>

<style>
  .text-zone {
    display: flex;
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
    padding-inline: 0.5ch;
  }
  .correct {
    color: var(--text-faded);
  }
  .wrong {
    color: var(--red-5);
    text-decoration-line: underline;
    text-decoration-style: solid;
    text-decoration-color: var(--red-5);
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
