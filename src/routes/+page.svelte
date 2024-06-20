<script lang="ts">
  // import { confetti } from "@neoconfetti/svelte";
  // https://svelte.dev/repl/4e41a080739a4427a1f2c98b7f5d4b24?version=4.2.1

  // import { tick } from "svelte";

  // let isVisible = false;
  import { playerState } from "$lib/stores/playerState.svelte";
</script>

<div class="splash">
  <h1>Books</h1>
  <a href="/typer">Type</a>

  {#if playerState.activeBook}
    <h2>Active book</h2>
    <div>
      <a href="typer/{playerState.activeBook.slug}"
        >{playerState.activeBook.title}</a
      >
    </div>
  {/if}
</div>

<style>
  .splash {
    padding-inline: 2ch;
  }
  h1,
  h2 {
    font-size: var(--font-normal);
    padding-block-start: 3ch;
  }
</style>
