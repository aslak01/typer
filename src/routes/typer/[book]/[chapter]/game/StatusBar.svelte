<script lang="ts">
  type TODO = any;
  let {
    gameState,
    chapterState,
    chapLen,
  }: { gameState: TODO; chapterState: TODO; chapLen: number } = $props();
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
    P {chapterState.page} / {chapLen}
  </div>
  <div class="entry">
    <button onclick={() => chapterState.nextPage()}>+1</button>
    <button onclick={() => chapterState.prevPage()}>-1</button>
  </div>
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
  button {
    padding: 0;
    border: 1px solid var(--text1);
    border-radius: 5px;
    padding: 0.3ch;
    line-height: 1;
    background-color: var(--surface2);
  }
  button:hover {
    background-color: var(--surface3);
  }
</style>
