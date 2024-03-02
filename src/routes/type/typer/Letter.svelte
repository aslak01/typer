<script lang="ts">
  import type { LetterObj } from "./types";
  export let letter: LetterObj;
  export let active: boolean;
  export let space: boolean;
  export let focused: boolean;
  export let correct: boolean | null;
</script>

<span
  class:correct
  class:wrong={correct === false}
  class:space
  class:focused
  class:active
  >{#if letter.value === "\n"}<br />{:else}{letter.value}{/if}</span
>

<style>
  .focused.active {
    --_color: var(--yellow-4);
    box-shadow: -0.2ch 0 0 0 var(--_color);
    position: relative;
  }
  .focused.active::after {
    content: "";
    position: absolute;
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
