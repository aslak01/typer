<script lang="ts">
  import type { Snippet } from "svelte";
  import "../app.css";
  import StatusBar from "$lib/components/StatusBar.svelte";
  let { children }: { children: Snippet } = $props();
  import { page } from "$app/stores";
</script>

<main>
  <StatusBar>
    <h1><a href="/">typer</a></h1>
    {JSON.stringify($page.route)}
    {JSON.stringify($page.params)}
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
  h1 a,
  h1 a:hover {
    color: unset;
    text-decoration: unset;
  }
</style>
