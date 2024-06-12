<script lang="ts">
  import type { Snippet } from "svelte";
  import "../app.css";
  import StatusBar from "$lib/components/StatusBar.svelte";
  let { children }: { children: Snippet } = $props();
  import { page } from "$app/stores";
  import { bookIndex } from "$lib/data/books";
</script>

<main>
  <StatusBar>
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
  </StatusBar>
  {@render children()}
</main>

<style>
  main {
    height: 100%;
  }
  h1 {
    font-size: 1rem;
  }
  a,
  a:hover {
    color: unset;
    text-decoration: unset;
  }
</style>
