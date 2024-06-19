<script lang="ts">
  let { data } = $props();
  let { chapter } = data;
  let pages = chapter?.pages || [];

  // import { localStore } from "$lib/stores/useLocalStorage.svelte";
  import { gameState } from "$lib/stores/gameState.svelte";
  import { createChapterState } from "$lib/stores/chapterState.svelte";
  let chapterState = $state(createChapterState(pages.length));

  import Game from "./game/Game.svelte";
  import PadderParser from "./game/PadderParser.svelte";
  import StatusBar from "./game/StatusBar.svelte";

  let page = $derived.by(() => {
    if (!chapter) return "";
    return pages[chapterState.page];
  });
  let prevPage = $derived.by(() => {
    if (!chapter) return "";
    const prevPage = pages[chapterState.page - 1];
    if (!prevPage) return "";
    return prevPage;
  });
  let nextPage = $derived.by(() => {
    if (!chapter) return "";
    const nextPage = pages[chapterState.page + 1];
    if (!nextPage) return "";
    return nextPage;
  });

  // $effect(() => {
  //   console.log("hei");
  //   //localStore("activeBook", book);
  // });
</script>

<div class="game-container">
  {#if chapterState && page}
    <StatusBar {gameState} {chapterState} chapLen={pages.length} />
    <div class="text-container">
      <div class="section-wrapper">
        <PadderParser text={prevPage} fade={true} pos="top" />
      </div>

      <div class="section-wrapper">
        <Game {page} nextPage={chapterState.nextPage} />
      </div>
      <div class="section-wrapper">
        <PadderParser text={nextPage} fade={false} pos="bot" />
      </div>
    </div>
  {/if}
</div>

<style>
  .game-container {
    height: calc(100% - var(--header-height));
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
    align-items: center;
    position: relative;
  }
</style>
