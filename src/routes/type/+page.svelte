<script lang="ts">
  import Typer from "./Typer.svelte";
  const words = ["type", "this", "fast", "today"];
</script>

<div class="typer-wrapper">
  <Typer {words} />
</div>

<style>
  .typer-wrapper {
    height: 300px;
  }
</style>
