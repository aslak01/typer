<script lang="ts">
  import type { Snippet } from "svelte";
  let { children }: { children: Snippet } = $props();
  import "../app.css";
  import StatusBar from "$lib/components/StatusBar.svelte";
  import Header from "$lib/components/Header.svelte";
  import { page } from "$app/stores";
  import { bookIndex } from "$lib/data/books";
  import { gameState } from "$lib/stores/gameState.svelte";
</script>

<main>
  <div class="hotbars">
    <Header>
      <h1><a href="/">typer</a></h1>
      {#if "book" in $page.params}
        {@const book = bookIndex.find((b) => b.path === $page.params.book)}
        {#if book}
          <a href={`/typer/${book.path}`}>{book.title}</a>
        {/if}
      {/if}
      {#if "chapter" in $page.params}
        chapter {$page.params.chapter}
      {/if}
    </Header>
    {#if gameState.mode !== "I"}
      <StatusBar />
    {/if}
  </div>
  {@render children()}
</main>

<style>
  main {
    --status-height: 50px;

    height: calc(100dvh - var(--status-height));
  }
  h1 {
    font-size: 1rem;
  }
  .hotbars {
    position: relative;
    margin-block-end: var(--status-height);
  }
  a,
  a:hover {
    color: unset;
    text-decoration: unset;
  }
</style>
