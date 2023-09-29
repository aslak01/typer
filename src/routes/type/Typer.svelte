<script lang="ts">
  import { clickoutside } from "@svelte-put/clickoutside";
  export let words = ["type", "this", "fast", "today"];
  let string = words.join(" ");
  let curr = 0;
  let correct = "";
  console.log(string);
  let focused = true;
  function handleFocus() {
    focused = true;
  }

  function handleBlur() {
    focused = false;
  }
  function handleKeydown(e: KeyboardEvent) {
    const key = e.key;
    if (focused) {
      if (key === string[0]) {
        correct += curr;
        curr++;
        string = string.slice(1);
      }
    }
    //
  }
  $: console.log(string);
</script>

<svelte:window on:keydown|preventDefault={handleKeydown} />

<button
  class={focused ? "" : "blur"}
  use:clickoutside
  on:blur={handleBlur}
  on:focus={handleFocus}
  on:click={handleFocus}
  on:clickoutside={handleBlur}
>
  <div class="text-area">
    {#each words as word}
      <div class="word">
        {#each word.split("") as letter}
          <span class="letter">
            {letter}
          </span>
        {/each}
      </div>
    {/each}
  </div>
</button>

<style>
  button {
    all: unset;
  }

  .type-area {
    position: relative;
  }

  .blur {
    filter: blur(3px);
    -webkit-filter: blur(3px);
  }

  .word {
    display: inline;
  }
</style>
