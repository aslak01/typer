<script lang="ts">
  import { error } from "@sveltejs/kit";
  let { data } = $props();
  let { chapter } = data;

  import Game from "./game/Game.svelte";
  import { sliceAtNearestSpace } from "$lib/utils";

  function getLines() {
    const TMP_CPW = 5;
    const TMP_WPL = 3;
    const LNS = 2;
    return TMP_WPL * TMP_CPW * LNS;
  }

  function createGameState() {
    if (!chapter) return;
    const pageLengthApprox = getLines();
    const firstPageLen = sliceAtNearestSpace(
      chapter.pages.slice(0, pageLengthApprox),
    ).length;
    let page = $state(0);
    let mode = $state("N");
    let pageStart = $state(0);
    let pageEnd = $state(firstPageLen);
    function turnPage() {
      if (!chapter) return;
      page++;
      pageStart = pageEnd;
      pageEnd = sliceAtNearestSpace(
        chapter.pages.slice(pageStart, pageStart + pageLengthApprox),
      ).length;
    }
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

  let activePage = $derived.by(() => {
    if (!gameState || !chapter) {
      return "";
    }
    return chapter.pages.slice(gameState.pageStart, gameState.pageEnd);
  });

  let aboveContent = $derived.by(() => {
    if (!gameState || !chapter) {
      return "";
    }
    const introLen = 1000;
    const end = gameState.pageStart;
    const startPos = end - introLen;
    const start = startPos > 0 ? startPos : 0;
    return chapter.pages.slice(start, end);
  });

  let belowContent = $derived.by(() => {
    if (!gameState || !chapter) {
      return "";
    }
    const end = 1000;
    const start = gameState.pageEnd;
    return chapter.pages.slice(start, end);
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
    {aboveContent}
    <Game
      chapter={activePage}
      mode={gameState.mode}
      nextPage={gameState.turnPage}
    />
    {belowContent}
  {/if}
</div>

<style>
  .game-container {
    padding: 1em;
  }
</style>
