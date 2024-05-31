<script lang="ts">
  import { error } from "@sveltejs/kit";
  let { data } = $props();
  let { chapter } = data;

  import Game from "./game/Game.svelte";
  import { sliceAtNearestSpace } from "$lib/utils";

  function getLines() {
    const TMP_CPW = 5;
    const TMP_WPL = 13;
    const LNS = 4;
    return TMP_WPL * TMP_CPW * LNS;
  }

  function createGameState(pages: string) {
    const pageLenMax = getLines();
    const paddingLen = 800;
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
    let activePage = $derived(pages.slice(pageStart, pageEnd));
    let aboveContent = $derived.by(() => {
      const end = pageStart;
      const startPos = end - paddingLen;
      const start = startPos > 0 ? startPos : 0;
      return pages.slice(start, end);
    });
    let belowContent = $derived.by(() => {
      const start = pageEnd;
      return pages.slice(start, paddingLen);
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

<div class="game-container">
  {#if chapter && gameState}
    <h1>{chapter.title}</h1>
    {gameState.aboveContent}
    <Game
      chapter={gameState.activePage}
      mode={gameState.mode}
      nextPage={gameState.turnPage}
    />
    {gameState.belowContent}
  {/if}
</div>

<style>
  .game-container {
    padding: 1em;
  }
</style>
