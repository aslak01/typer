<script lang="ts">
  let { data } = $props();
  let { chapter } = data;

  import { createChapterState, gameState } from "./game/state.svelte";

  import Game from "./game/Game.svelte";
  import PadderParser from "./game/PadderParser.svelte";
  import StatusBar from "./game/StatusBar.svelte";

  const chapterState = chapter && createChapterState(chapter.pages);
</script>

<div class="game-container">
  {#if chapterState}
    <StatusBar {gameState} />
    <div class="text-container">
      <div class="section-wrapper">
        <PadderParser text={chapterState.aboveContent} fade={true} pos="top" />
      </div>

      <div class="section-wrapper">
        <Game
          chapter={chapterState.activePage}
          nextPage={chapterState.turnPage}
        />
      </div>
      <div class="section-wrapper">
        <PadderParser text={chapterState.belowContent} fade={false} pos="bot" />
      </div>
    </div>
  {/if}
</div>

<style>
  .game-container {
    height: 100dvh;
    padding: 1rem;
    font-size: var(--font-size-4);
    letter-spacing: var(--font-letterspacing-2);
    line-height: var(--font-lineheight-4);
    font-weight: var(--font-weight-5);
  }
  .text-container {
    display: grid;
    /*gap: 0.5rem;*/
    grid-template-columns: 1fr;
    grid-template-rows: 33% 33% 33%;
    /*grid-auto-rows: 1fr;*/
    max-inline-size: var(--size-content-3);
    max-height: 90%;
    height: 90%;
    overflow: hidden;
  }
  .section-wrapper {
    display: flex;
    align-items: start;
    position: relative;
  }
</style>
