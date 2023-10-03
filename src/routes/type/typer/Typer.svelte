<script lang="ts">
  import type { LetterObj } from "./types";
  import { onMount } from "svelte";
  import Letter from "./Letter.svelte";

  export let string: string;
  export let focused: boolean;
  let curr = 0;
  function handleKeydown(e: KeyboardEvent) {
    const key = e.key;
    let inserting = false;

    if (curr >= string.length) {
      return;
    }

    if (key === "Backspace") {
      strObjArr[curr - 1].correct = null;
      curr--;
      return;
    }

    if (/^[a-zA-Z0-9,.\-\s'";:]$/.test(key)) {
      inserting = true;
    }

    if (focused && inserting) {
      if (key === string[curr]) {
        console.log(key);
        strObjArr[curr].correct = true;
        curr++;
      } else {
        strObjArr[curr].correct = false;
        curr++;
      }
    }
    //
  }
  let strObjArr: LetterObj[] = [];
  onMount(() => {
    strObjArr = string
      .split("")
      .map((l) => ({ value: l, correct: null, time: null }));
  });
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="text-area">
  {#each strObjArr as letter, i}{@const active = i === curr}{@const space =
      letter.value === " "}<Letter {letter} {space} {active} {focused} />{/each}
</div>

<style>
  .text-area {
    font-size: var(--font-size-3);
    letter-spacing: var(--font-letterspacing-2);
    line-height: var(--font-lineheight-3);
    /* font-family: var(--font-serif); */
    font-weight: var(--font-weight-5);
    font-family: "Ibarra Real Nova Variable", serif;
  }
</style>
