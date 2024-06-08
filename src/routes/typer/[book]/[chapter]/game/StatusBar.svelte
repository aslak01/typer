<script lang="ts">
  let {
    wpm = 0,
    acc = 0,
    time = 0,
    mode = "N",
  }: { wpm: number; acc: number; time: number; mode: string } = $props();
</script>

<div class="bar">
  <div class="entry">
    Time: <b>{time}</b>
  </div>
  <div class="entry">
    WPM <b>{wpm}</b>
  </div>
  <div class="entry">
    Accuracy <b>{acc}</b> %
  </div>
  <div class="entry">
    mode <b>{mode}</b>
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
