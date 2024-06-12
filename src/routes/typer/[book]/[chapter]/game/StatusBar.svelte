<script lang="ts">
  let { gameState }: { gameState: any } = $props();
</script>

<div class="bar">
  <div class="entry">
    Time: <b>{gameState.time}</b>
  </div>
  <div class="entry">
    mode <b>{gameState.mode}</b>
  </div>
  <div class="entry">
    wpm <b>{gameState.wpm}</b>
  </div>
  <div class="entry">
    acc <b>{gameState.acc}</b>
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
</style>
