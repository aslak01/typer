<script lang="ts">
  import "../app.css";
  import "@fontsource-variable/jost";
  import "@fontsource-variable/ibarra-real-nova";
  import ColorSwitcher from "$lib/components/ColorSwitcher.svelte";
</script>

<main>
  <nav>
    <ColorSwitcher />
  </nav>
  <slot />
</main>

<style>
  :global(body) {
    font-family: "Jost", sans-serif;
  }
  main {
    height: 100%;
  }
</style>
