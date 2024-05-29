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

  function createGameState() {
    if (!chapter) return;
    const pageLenMax = getLines();
    const paddingLen = 1000;
    const firstPageLen = sliceAtNearestSpace(
      chapter.pages.slice(0, pageLenMax),
    ).length;
    let page = $state(0);
    let mode = $state("N");
    let pageStart = $state(0);
    let pageEnd = $state(firstPageLen);
    function turnPage() {
      if (!chapter) return;
      page++;
      pageStart = pageEnd;
      pageEnd =
        pageStart +
        sliceAtNearestSpace(
          chapter.pages.slice(pageStart, pageStart + pageLenMax),
        ).length;
    }
    let activePage = $derived(chapter.pages.slice(pageStart, pageEnd));
    let aboveContent = $derived.by(() => {
      const end = pageStart;
      const startPos = end - paddingLen;
      const start = startPos > 0 ? startPos : 0;
      return chapter.pages.slice(start, end);
    });
    let belowContent = $derived.by(() => {
      const start = pageEnd;
      return chapter.pages.slice(start, paddingLen);
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

  const gameState = createGameState();

  let playerState = $state({
    activeBook: "",
    activeBooks: [],
  });

  async function handleKeydown(event: KeyboardEvent) {
    if (!gameState) return;
    const { key } = event;

    if (key.toLowerCase() === "i") {
      if (gameState.mode !== "I") {
        gameState.mode = "I";
      }
    }

    if (key === "Escape") {
      if (gameState.mode !== "N") {
        gameState.mode = "N";
      }
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

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
