<script lang="ts">
  import type { Snippet } from "svelte";
  let { children }: { children: Snippet } = $props();
</script>

<div class="game-container">
  {@render children()}
</div>

<style>
  .game-container {
    height: calc(100% - var(--header-height));
    padding: 1rem;
    font-size: var(--font-size-4);
    letter-spacing: var(--font-letterspacing-2);
    line-height: var(--font-lineheight-4);
    font-weight: var(--font-weight-5);
  }
</style>
