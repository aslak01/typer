<script lang="ts">
  import { tick } from "svelte";
  import { clickoutside } from "@svelte-put/clickoutside";
  import { confetti } from "@neoconfetti/svelte";
  // https://svelte.dev/repl/4e41a080739a4427a1f2c98b7f5d4b24?version=4.2.1
  import { chap1extract } from "./chap1-short";
  import Typer from "./typer/Typer.svelte";
  const string =
    "Soon after this he inquired, if I thought that the breaking up of the";
  let focused = true;
  function handleFocus() {
    focused = true;
  }
  function handleBlur() {
    focused = false;
  }
  let showConfetti = false;
  async function doConfetti() {
    showConfetti = false;
    await tick();
    showConfetti = true;
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<div
  class="game {focused ? '' : 'blur'}"
  use:clickoutside
  on:blur={handleBlur}
  on:focus={handleFocus}
  on:click={handleFocus}
  on:clickoutside={handleBlur}
  tabindex="0"
>
  <Typer string={chap1extract} {focused} on:done={() => doConfetti()}>
    {#if showConfetti}
      <div class="confettiwrapper">
        <div use:confetti />
      </div>
    {/if}
  </Typer>
</div>

<style>
  .confettiwrapper {
    /* border: 4px solid red; */
    display: inline-block;
  }
  .game:focus {
    outline: 0;
  }
  .blur {
    filter: blur(3px);
    -webkit-filter: blur(3px);
  }
</style>
