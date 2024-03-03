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
    />{:else}{letter.value}{/if}{#if active}<Cursor
      shouldBlink={!isTyping}
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
    color: var(--red-5);
    box-shadow: 0 3px 0 0 var(--red-5);
  }
  /* .wrong.space { */
  /*   background: var(--red-4); */
  /* } */
</style>
