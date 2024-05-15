<script lang="ts">
  // import { tick } from "svelte";
  import { onMount } from "svelte";
  import { clickoutside } from "@svelte-put/clickoutside";
  import { confetti } from "@neoconfetti/svelte";
  import { wpm } from "$lib/stores/typed";
  // https://svelte.dev/repl/4e41a080739a4427a1f2c98b7f5d4b24?version=4.2.1
  import Typer from "./typer/Typer.svelte";

  /** @type {import('./$types').PageData} */
  export let data;

  let focused = true;

  function handleFocus() {
    focused = true;
  }
  function handleBlur() {
    focused = false;
  }
  let showConfetti = false;

  let editorState = {
    mode: "N",
  };

  let state = {
    focused: true,
    page: 1,
    chapter: 1,
    linesPerPage: 8,
  };

  $: currChap = data.chapters[state.chapter - 1];
  $: currPages = currChap.pages.filter((l) => l !== "");
  $: pagesInChap = Math.ceil(currPages.length / state.linesPerPage);
  $: currPg = state.page;
  $: lnsPerPage = state.linesPerPage;

  function getPage(text: string[], start: number, lines: number): string[] {
    return text.slice(start, start + lines);
  }

  let page;

  onMount(() => {
    page = currPages.slice(currPg - 1, lnsPerPage);
  });

  function turnPage() {
    console.log("turning page");

    const currPgEnd = state.page * state.linesPerPage;
    state.page += 1;
    state = state;
    // const currPgStart = currPgEnd - state.linesPerPage
    const done = state.page >= pagesInChap;
    if (!done) {
      page = getPage(currPages, currPgEnd, state.linesPerPage);
      console.log(page);
      console.log(currPgEnd);
    } else {
      showConfetti = true;
      return undefined; // No more values
    }
  }
  function incChap() {
    const currChap = state.chapter;
    const totalChaps = data.chapters.length;
    if (currChap < totalChaps) {
      state.chapter++;
      state.page = 1;
      state = state;
      page = getPage(
        data.chapters[state.chapter - 1].pages,
        0,
        state.linesPerPage,
      );
    }
  }

  let game: HTMLElement;

  function handleKeydown(event: KeyboardEvent) {
    const { key } = event;
    console.log(key);

    if (key.toLowerCase() === "i") {
      if (editorState.mode !== "I") {
        editorState.mode = "I";
        game.focus();
        console.log("enteringInsertMode");
        console.log(game);
      }
    }

    if (key === "Escape") {
      if (editorState.mode !== "N") {
        editorState.mode = "N";
        game.blur();
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
        <button on:click={() => turnPage()}>Next page</button>
      </div>
      <div class="statusbar-item">
        <button on:click={() => incChap()}>Next chapter</button>
      </div>

      <div class="statusbar-item">
        wpm: {$wpm}
      </div>
      <div class="statusbar-item">
        Page: {state.page} / {pagesInChap}
      </div>
    </div>

    <br />

    {currChap.title}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
    <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
    <div
      class="game {focused ? '' : 'blur'}"
      bind:this={game}
      use:clickoutside
      on:blur={handleBlur}
      on:focus={handleFocus}
      on:click={handleFocus}
      on:clickoutside={handleBlur}
      tabindex="0"
      role="application"
    >
      {#key page}
        <Typer
          strings={page}
          mode={editorState.mode}
          {focused}
          on:done={() => turnPage()}
        >
          {#if showConfetti}
            <div class="confettiwrapper">
              <div use:confetti></div>
            </div>
          {/if}
        </Typer>
      {/key}
    </div>
  </div>
{/if}

<style>
  .confettiwrapper {
    /* border: 4px solid red; */
    display: inline-block;
  }
  .game {
    width: 80ch;
    padding: var(--size-4);
    background: var(--surface2);
  }
  .game.blur {
    background: var(--surface1);
    backdrop-filter: blur(5px);
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
