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
  @property --_opacity {
    initial-value: 100%;
    inherits: false;
    syntax: "<percent>";
  }
  .focused.active {
    /* --_color: color(var(--yellow-4) alpha(var(--_opacity), 1)); */
    /* --_color: rgba(from var(--yellow-4) r g b / var(--_opacity)); */
    --_color: color-mix(in srgb, var(--yellow-4), transparent var(--_opacity))
      box-shadow: -0.3ch 0 0 0 var(--_color);
    animation: blink-animation 2s infinite linear;
  }

  @keyframes blink-animation {
    to {
      --_opacity: 0%;
    }
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
