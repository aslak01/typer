<script lang="ts">
  import type { LetterObj } from "./types";
  import Cursor from "./Cursor.svelte";
  export let letter: LetterObj;
  export let active: boolean;
  export let space: boolean;
  export let focused: boolean;
  export let correct: boolean | null;
  export let isTyping: boolean;
</script>

<span
  class:correct
  class:wrong={correct === false}
  class:space
  class:focused
  class:active
  >{#if letter.value === "\n"}<br
    />{:else if letter.value === " "}&ensp;{:else}{letter.value}{/if}{#if active}<Cursor
      shouldBlink={!isTyping}
      shouldExist={focused}
    />{/if}</span
>

<style>
  span {
    position: relative;
  }

  .correct {
    color: var(--text-faded);
  }
  .wrong {
    color: var(--red-3);
    /* box-shadow: 0 3px 0 0 var(--red-5); */
    /* text-decoration: var(--red-5) wavy underline; */

    text-decoration-line: underline;
    text-decoration-style: wavy;
    text-decoration-color: var(--red-5);
  }
  /* .space { */
  /*   display: inline-block; */
  /*   width: 0.5ch; */
  /* } */
  /* .wrong.space { */
  /*   background: var(--red-4); */
  /* } */
</style>
