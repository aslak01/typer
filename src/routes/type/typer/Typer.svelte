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
      const goal = string[curr];
      const result = strObjArr[curr];
      const correct = key === string;
      result.input = key;
      if (result.correct === null) {
        result.correct = correct;
      }
      strObjArr = strObjArr;
      curr++;
    }
  }
  let strObjArr: LetterObj[] = [];
  onMount(() => {
    strObjArr = string
      .split("")
      .map((l) => ({ value: l, input: null, correct: null, time: null }));
  });
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="text-area">
  {#each strObjArr as letter, i}{@const active = i === curr}{@const space =
      letter.value === " "}{@const correct =
      letter.correct !== null ? letter.value === letter.input : null}<Letter
      {letter}
      {correct}
      {space}
      {active}
      {focused}
    />{/each}
</div>

<style>
  .text-area {
    font-size: var(--font-size-3);
    letter-spacing: var(--font-letterspacing-2);
    line-height: var(--font-lineheight-3);
    /* font-family: var(--font-serif); */
    font-weight: var(--font-weight-5);
    /* font-family: "Manrope", sans-serif; */
    font-family: "Jost", sans-serif;
  }
</style>
