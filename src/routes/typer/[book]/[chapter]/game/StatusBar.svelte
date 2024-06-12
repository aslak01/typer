<script lang="ts">
  let { gameState }: { gameState: any } = $props();
  let extras = $state(false);
</script>

<div class="bar">
  {#if extras}
    <div class="entry">
      Time: <b>{gameState.time}</b>
    </div>
    <div class="entry">
      mode <b>{gameState.mode}</b>
    </div>
  {/if}
  <div class="entry">
    wpm <b>{gameState.wpm}</b>
  </div>
  <div class="entry">
    acc <b>{gameState.acc}</b> ({gameState.realAcc})
  </div>

  <div class="entry right">
    <label
      >Extras
      <input type="checkbox" bind:checked={extras} />
    </label>
  </div>
</div>

<style>
  .bar {
    background-color: var(--surface3);
    display: flex;
    align-items: start;
    gap: 2ch;
    padding-inline: 1ch;
    padding-block: 0.2ch;
  }
  .right {
    margin-left: auto;
  }
</style>
