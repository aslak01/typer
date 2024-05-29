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

  function setTypingStatus() {
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
    const key = e.key;
    let inserting = false;

    if (mode.toLowerCase() !== "i") return;

    if (curr >= currLen) {
      console.log("YOU DID IT");
      typed = "";
      curr = 0;
      nextPage();
      return;
    }

    if (key === "Backspace" && typed.length > 0) {
      typed = typed.slice(0, -1);
      curr--;
      return;
    }

    if (key.length === 1) {
      setTypingStatus();
      inserting = true;
    }

    if (inserting) {
      typed += key;
      curr++;
      //console.log(typed);
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
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="text-zone">
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
          {:else if letter === "\n"}
            <br />
            <br />
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
    font-size: var(--font-size-4);
    letter-spacing: var(--font-letterspacing-2);
    line-height: var(--font-lineheight-4);
    font-weight: var(--font-weight-5);
    font-family: "Jost", sans-serif;

    height: 40dvh;
    overflow: hidden;
  }
  .text-area {
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
