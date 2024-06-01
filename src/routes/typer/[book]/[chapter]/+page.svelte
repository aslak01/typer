<script lang="ts">
  import { error } from "@sveltejs/kit";
  let { data } = $props();
  let { chapter } = data;

  import Game from "./game/Game.svelte";
  import PadderParser from "./game/PadderParser.svelte";
  import StatusBar from "./game/StatusBar.svelte";
  import { sliceAtNearestSpace } from "$lib/utils";

  function getLines() {
    const TMP_CPW = 5;
    const TMP_WPL = 13;
    const LNS = 4;
    return TMP_WPL * TMP_CPW * LNS;
  }

  function createGameState(pages: string) {
    const pageLenMax = getLines();
    const paddingLen = 300;
    const firstPageLen = sliceAtNearestSpace(pages.slice(0, pageLenMax)).length;
    let page = $state(0);
    let mode = $state("N");
    let pageStart = $state(0);
    let pageEnd = $state(firstPageLen);
    function turnPage() {
      page++;
      pageStart = pageEnd;
      pageEnd =
        pageStart +
        sliceAtNearestSpace(pages.slice(pageStart, pageStart + pageLenMax))
          .length;
    }
    let activePage = $derived(pages.slice(pageStart, pageEnd).trim());
    let aboveContent = $derived.by(() => {
      const end = pageStart;
      const startPos = end - paddingLen;
      const start = startPos > 0 ? startPos : 0;
      return pages.slice(start, end);
    });
    let belowContent = $derived.by(() => {
      const start = pageEnd;
      const end = start + paddingLen;
      return pages.slice(start, end);
    });
    return {
      get page() {
        return page;
      },
      get pageStart() {
        return pageStart;
      },
      get pageEnd() {
        return pageEnd;
      },
      get activePage() {
        return activePage;
      },
      get aboveContent() {
        return aboveContent;
      },
      get belowContent() {
        return belowContent;
      },
      get mode() {
        return mode;
      },
      set mode(m: string) {
        mode = m;
      },
      turnPage,
    };
  }

  const gameState = chapter && createGameState(chapter.pages);

  let playerState = $state({
    activeBook: "",
    activeBooks: [],
  });
</script>

<StatusBar wpm={10} acc={87} />

<div class="game-container">
  {#if chapter && gameState}
    <header>
      <h1>{chapter.title}</h1>
    </header>
    <div class="text-container">
      <div class="section-wrapper">
        <PadderParser text={gameState.aboveContent} fade={true} pos="top" />
      </div>

      <div class="section-wrapper">
        <Game
          chapter={gameState.activePage}
          mode={gameState.mode}
          nextPage={gameState.turnPage}
        />
      </div>
      <div class="section-wrapper">
        <PadderParser text={gameState.belowContent} fade={false} pos="bot" />
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
  header h1 {
    font-size: var(--font-size-4);
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
