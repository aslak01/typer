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
    box-shadow: -3px 0px 0px 0px var(--yellow-4);
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
