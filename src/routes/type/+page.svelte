<script lang="ts">
  import { clickoutside } from "@svelte-put/clickoutside";
  import { chap1extract } from "./chap1";
  import Typer from "./Typer.svelte";
  const string =
    "Soon after this he inquired, if I thought that the breaking up of the";
  let focused = true;
  function handleFocus() {
    focused = true;
  }

  function handleBlur() {
    focused = false;
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  class={focused ? "" : "blur"}
  use:clickoutside
  on:blur={handleBlur}
  on:focus={handleFocus}
  on:click={handleFocus}
  on:clickoutside={handleBlur}
>
  <Typer string={chap1extract} {focused} />
</div>

<style>
  .blur {
    filter: blur(3px);
    -webkit-filter: blur(3px);
  }
</style>
