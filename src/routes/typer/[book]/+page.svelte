<script lang="ts">
  let { data } = $props();
  let { bookMeta, chapters } = data;
  import { playerState } from "$lib/stores/playerState.svelte";
</script>

{#if bookMeta && chapters}
  <ol>
    {#each chapters as chapter, i}
      <li>
        <h2>
          <a href={`/typer/${bookMeta.path}/${i + 1}`}>{chapter.title}</a>
        </h2>
      </li>
    {/each}
  </ol>
{/if}

<style>
  h2 {
    font-size: 1rem;
  }
  a,
  a:hover {
    color: unset;
    text-decoration: unset;
  }
</style>
