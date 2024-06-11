<script lang="ts">
  import type { Snippet } from "svelte";
  let { children }: { children: Snippet } = $props();
</script>

<div class="bar">
  <!-- <div class="entry"> -->
  <!--   {entry} -->
  <!-- </div> -->
  {@render children()}
</div>

<style>
  .bar {
    background-color: var(--surface3);
    display: flex;
    align-items: center;
    gap: 2ch;
    padding-inline: 1ch;
    padding-block: 0.2ch;
  }
</style>
