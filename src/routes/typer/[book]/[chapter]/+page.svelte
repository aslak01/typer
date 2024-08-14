<script lang="ts">
  let { data } = $props();
  let { chapter } = data;
  let pages = chapter?.pages || [];

  import { playerState } from "$lib/stores/playerState.svelte";
  import { onMount } from "svelte";

  // import { localStore } from "$lib/stores/useLocalStorage.svelte";
  import { gameState } from "$lib/stores/gameState.svelte";
  // import { createChapterState } from "$lib/stores/chapterState.svelte";

  import Game from "./game/Game.svelte";
  import PadderParser from "./game/PadderParser.svelte";

  let page = $derived.by(() => {
    if (!chapter) return "";
    return pages[gameState.currPage];
  });
  let prevPage = $derived.by(() => {
    if (!chapter) return "";
    const prevPage = pages[gameState.currPage - 1];
    if (!prevPage) return "";
    return prevPage;
  });
  let nextPage = $derived.by(() => {
    if (!chapter) return "";
    const nextPage = pages[gameState.currPage + 1];
    if (!nextPage) return "";
    return nextPage;
  });
  onMount(() => {
    if (playerState.activeBook) {
      playerState.activeBooks = playerState.activeBook;
    }
  });
</script>

{#if page}
  <div class="text-container">
    <div class="section-wrapper">
      <PadderParser text={prevPage} fade={true} pos="top" />
    </div>

    <div class="section-wrapper">
      <Game {page} nextPage={gameState.nextPage} totalPages={pages.length} />
    </div>
    <div class="section-wrapper">
      <PadderParser text={nextPage} fade={false} pos="bottom" />
    </div>
  </div>
{/if}

<style>
  .text-container {
    display: grid;
    gap: 0.2lh;
    grid-template-columns: 1fr;
    grid-template-rows: 30% 40% 30%;
    /*grid-auto-rows: 1fr;*/
    max-inline-size: var(--size-content-3);
    height: 100%;
    overflow: hidden;
    margin: 0 auto;
  }

  .section-wrapper {
    display: flex;
    align-items: center;
    position: relative;
    border: 5px solid white;
  }
</style>
