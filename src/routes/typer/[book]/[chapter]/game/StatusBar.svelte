<script lang="ts">
  let { wpm = 0, acc = 0 }: { wpm: number; acc: number } = $props();
</script>

<div class="bar">
  <div class="entry">
    WPM <b>{wpm}</b>
  </div>
  <div class="entry">
    Accuracy <b>{acc}</b> %
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
