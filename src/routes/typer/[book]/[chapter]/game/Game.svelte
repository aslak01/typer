<script lang="ts">
  let {
    chapter,
    mode,
    nextPage,
  }: { chapter: string; mode: string; nextPage: () => void } = $props();
  let curr = $state(0);
  let isTyping = $state(false);
  let typingTimeout: number | undefined;
  let typingInterval: number | undefined;
  let typed = $state("");
  let time = $state(0);

  let currLen = $derived(chapter.length);

  function setTypingStatus(bool: boolean) {
    clearTimeout(typingTimeout);
    clearInterval(typingInterval);
    isTyping = true;

    function incrementTime() {
      time += 10;
    }
    typingInterval = setInterval(incrementTime, 10);

    typingTimeout = setTimeout(() => {
      isTyping = false;
      time = -3000;
      clearInterval(typingInterval);
    }, 3000);
  }

  function handleKeydown(e: KeyboardEvent) {
    const { key } = e;
    const hasShift = e.getModifierState("Shift");

    function isInput(inp: string): boolean {
      return (
        inp.length === 1 ||
        inp === "Enter" ||
        inp === "Tab" ||
        inp === "Backspace"
      );
    }
    function isInsertMode(m: string) {
      return m.toLowerCase() === "i";
    }

    if (!isInsertMode(mode)) {
      if (key.toLowerCase() === "i") {
        mode = "I";
        setTypingStatus(true);
        return;
      }
    }

    if (isInsertMode(mode)) {
      if (key === "Escape") {
        mode = "N";
        setTypingStatus(false);
        return;
      }
      if (key === "Tab") {
        // tab is an input so prevent it behaving
        // as a window controller
        e.preventDefault();
      }
    }

    if (!isInput(key) || !isInsertMode(mode)) {
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
    typed += inserted;
    curr++;

    if (curr >= currLen) {
      console.log("YOU DID IT");
      typed = "";
      curr = 0;
      nextPage();
      return;
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

  function matches(input: string, tar: string) {
    if (!input || !tar) return false;
    const match = input === replaceSpecialChars(tar);
    return match;
  }
  let game: HTMLElement | null = null;
  $effect(() => {
    if (!game) return;
    if (mode === "I") {
      game.setAttribute("tabindex", "-1");
      game.focus();
    }
    if (mode === "N") {
      game.setAttribute("tabindex", "0");
      game.blur();
    }
  });
</script>

<svelte:window on:keydown={handleKeydown} />

<div bind:this={game} class="text-zone {mode === 'I' ? 'active' : ''}">
  <div class="text-area">
    {#each chapter as letter, i}
      {@const active = i === typed.length}
      {@const correct = matches(typed[i], chapter[i])}
      {@const attempted = typed.length > i}
      {@const wrong = attempted && !correct}
      <span class:correct class:wrong class:active>
        {#if !wrong}
          {#if letter === " "}
            &ensp;
          {:else if letter === "↪"}
            ↪<br />
          {:else if letter === "→"}
            <span class="tab">→</span>
          {:else}
            {letter}
          {/if}
        {:else if typed[i] === " "}
          ·
        {:else}
          {typed[i]}
        {/if}
      </span>
    {/each}
  </div>
</div>

<style>
  .text-zone {
    padding-inline: 1ch;
    height: 100%;
    display: flex;
    align-items: center;
  }
  .text-zone.active {
    background: var(--surface3);
  }
  .text-zone:focus-within {
    outline: none;
  }

  .tab {
    padding-inline: 1ch;
  }
  .correct {
    color: var(--text-faded);
  }
  /* .active { */
  /*   background-color: var(--yellow-4); */
  /*   color: var(--gray-10); */
  /* } */
  .wrong {
    color: var(--text-faded);
    /* color: var(--red-3); */
    text-decoration-line: underline;
    text-decoration-style: solid;
    text-decoration-color: var(--red-5);
  }
</style>
