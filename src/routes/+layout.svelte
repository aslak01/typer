<script lang="ts">
  import "../app.css";
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
</style>
