<script lang="ts">
  import { onMount } from "svelte";
  // import { confetti } from "@neoconfetti/svelte";
  import { wpm } from "$lib/stores/typed";
  import Typer from "./typer/Typer.svelte";

  const { data } = $props();
  const { chapters } = data;

  let game: HTMLElement | null = $state(null);
  let showConfetti = $state(false);

  let editorState = {
    mode: "N",
  };

  let gameState = $state({
    focused: true,
    page: 1,
    chapter: 1,
    linesPerPage: 8,
    charsTyped: 0,
  });

  let currChap = $derived(
    chapters ? chapters[gameState.chapter - 1] : { title: "", pages: "" },
  );
  let currPages = $derived(currChap.pages);
  let pagesInChap = $derived(
    Math.ceil(currPages.length / gameState.linesPerPage),
  );
  let currPg = $derived(gameState.page);
  let lnsPerPage = $derived(gameState.linesPerPage);

  function getPage(text: string, start: number, lines: number): string {
    return text.slice(start, start + lines);
  }

  function getLines() {
    const TMP_WPL = 15;
    const TMP_CPW = 5;
    const LNS = 8;
    return TMP_WPL * TMP_CPW * LNS;
  }

  let page = $state("");

  onMount(() => {
    page = getPage(currPages, 0, getLines());
  });

  function turnPage() {
    console.log("turning page");

    const currPgEnd = gameState.page * gameState.linesPerPage;
    gameState.page += 1;
    // const currPgStart = currPgEnd - gameState.linesPerPage
    const done = gameState.page >= pagesInChap;
    if (!done) {
      page = getPage(currPages, currPgEnd, gameState.linesPerPage);
      console.log(page);
      console.log(currPgEnd);
    } else {
      showConfetti = true;
      return undefined; // No more values
    }
  }
  function incChap() {
    const currChap = gameState.chapter;
    const totalChaps = chapters?.length || 1;
    if (currChap < totalChaps) {
      gameState.chapter++;
      gameState.page = 1;
      page = getPage(
        chapters[gameState.chapter - 1].pages,
        0,
        gameState.linesPerPage,
      );
    }
  }

  function handleKeydown(event: KeyboardEvent) {
    const { key } = event;
    console.log(key);

    if (key.toLowerCase() === "i") {
      if (editorState.mode !== "I") {
        editorState.mode = "I";
        game?.focus();
        console.log("enteringInsertMode");
        console.log(game);
      }
    }

    if (key === "Escape") {
      if (editorState.mode !== "N") {
        editorState.mode = "N";
        game?.blur();
        console.log("leaving InsertMode");
      }
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

{#if page}
  <div class="wrapp">
    <div class="statusbar">
      <div class="statusbar-item">
        <button onclick={() => turnPage()}>Next page</button>
      </div>
      <div class="statusbar-item">
        <button onclick={() => incChap()}>Next chapter</button>
      </div>

      <div class="statusbar-item">
        wpm: {$wpm}
      </div>
      <div class="statusbar-item">
        Page: {gameState.page} / {pagesInChap}
      </div>
    </div>

    <br />

    {currChap.title}
    <div class="game" bind:this={game}>
      {#key page}
        <Typer {page} mode={editorState.mode} on:done={() => turnPage()}>
          <!-- {#if showConfetti} -->
          <!--   <div class="confettiwrapper"> -->
          <!--     <div use:confetti></div> -->
          <!--   </div> -->
          <!-- {/if} -->
        </Typer>
      {/key}
    </div>
  </div>
{/if}

<style>
  /* .confettiwrapper { */
  /*   /* border: 4px solid red; */
  /*   display: inline-block; */
  /* } */
  .game {
    width: 60ch;
    padding: var(--size-4);
    background: var(--surface2);
  }
  .game:focus {
    outline: 3px var(--surface5);
  }
  .statusbar {
    display: flex;
    gap: 1em;
    align-items: center;
  }
  .statusbar-item {
    padding: 0;
  }
</style>
