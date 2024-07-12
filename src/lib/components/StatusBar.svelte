<script lang="ts">
  import { gameState } from "$lib/stores/gameState.svelte";
  let extras = $state(false);
</script>

{#if gameState.playing && gameState.currLen > 0}
  <div class="bar">
    <div class="entry">
      P {gameState.currPage} / {gameState.currLen}
    </div>
    <div class="entry">
      wpm <b>{gameState.wpm}</b>
    </div>
    <div class="entry">
      acc <b>{gameState.acc}</b> ({gameState.realAcc})
    </div>

    {#if extras}
      <div class="entry">
        Time: <b>{gameState.time}</b>
      </div>
      <div class="entry">
        mode <b>{gameState.mode}</b>
      </div>
      <div class="entry">
        <button onclick={() => gameState.nextPage()}>+1</button>
        <button onclick={() => gameState.prevPage()}>-1</button>
      </div>
    {/if}

    <div class="entry right">
      <label
        >Extras
        <input type="checkbox" bind:checked={extras} />
      </label>
    </div>
  </div>
{/if}

<style>
  .bar {
    background-color: var(--surface3);
    display: flex;
    align-items: start;
    gap: 2ch;
    padding-inline: 1ch;
    padding-block: 0.2ch;
    position: absolute;
    width: 100%;
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
  button:focus,
  button:focus-visible {
    border-color: var(--brand);
  }
</style>
