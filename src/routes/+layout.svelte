<script lang="ts">
  import "../app.css";
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
  main {
    height: 100%;
  }
  :global(body) {
    font-family: "Ibarra Real Nova Variable", serif;
  }
</style>
