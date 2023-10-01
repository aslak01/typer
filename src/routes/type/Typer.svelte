<script lang="ts">
  import { onMount } from "svelte";

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
  type LetterObj = {
    value: string;
    correct: null | Boolean;
    time: null | number;
  };
  let strObjArr: LetterObj[] = [];
  onMount(() => {
    strObjArr = string
      .split("")
      .map((l) => ({ value: l, correct: null, time: null }));
    console.log(strObjArr);
  });
</script>

<svelte:window on:keydown|preventDefault={handleKeydown} />

<div class="text-area">
  {#each strObjArr as letter}<span
      class="letter {letter.correct ? 'correct' : ''} {letter.correct === false
        ? 'wrong'
        : ''}">{letter.value}</span
    >{/each}
</div>

<style>
  .correct {
    color: green;
  }
  .wrong {
    color: red;
  }
</style>
