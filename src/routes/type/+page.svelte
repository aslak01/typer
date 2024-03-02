<script lang="ts">
  import { tick } from "svelte";
  import { clickoutside } from "@svelte-put/clickoutside";
  import { confetti } from "@neoconfetti/svelte";
  // https://svelte.dev/repl/4e41a080739a4427a1f2c98b7f5d4b24?version=4.2.1
  import { chap1extract } from "./chap1";
  import gullivers from "$lib/data/books/gullivers/gulliver1.json";
  import Typer from "./typer/Typer.svelte";
  const chapter1 = gullivers.filter((i) => i.title === "CHAPTER I.")[0];
  console.log(chapter1);
  let focused = true;
  function handleFocus() {
    focused = true;
  }
  function handleBlur() {
    focused = false;
  }
  let showConfetti = false;
  async function doConfetti() {
    showConfetti = false;
    await tick();
    showConfetti = true;
  }

  function* iterateArray(arr: string[], linesPerPage = 25) {
    let index = 0;
    while (index < arr.length) {
      console.log(index);
      console.log(arr);
      const selection = arr.slice(index, index + linesPerPage);
      yield selection;
      index = index + linesPerPage;
    }
  }

  const generator = iterateArray(chapter1.pages);

  $: chap = generator.next().value;

  function turnPage() {
    console.log("turning page");
    const { value, done } = generator.next();
    if (!done) {
      chap = value; // Update the current value
      console.log(chap);
    } else {
      showConfetti = true;
      return undefined; // No more values
    }
  }
</script>

<div class="wrapp">
  <button on:click={() => turnPage()}>Next page</button>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
  <div
    class="game {focused ? '' : 'blur'}"
    use:clickoutside
    on:blur={handleBlur}
    on:focus={handleFocus}
    on:click={handleFocus}
    on:clickoutside={handleBlur}
    tabindex="0"
  >
    {#key chap}
      <Typer strings={chap} {focused} on:done={() => turnPage()}>
        {#if showConfetti}
          <div class="confettiwrapper">
            <div use:confetti />
          </div>
        {/if}
      </Typer>
    {/key}
  </div>
</div>

<style>
  .confettiwrapper {
    /* border: 4px solid red; */
    display: inline-block;
  }
  .game {
    width: 800px;
  }
  .game:focus {
    outline: 0;
  }
  /* .blur { */
  /*   filter: blur(3px); */
  /*   -webkit-filter: blur(3px); */
  /* } */
</style>
