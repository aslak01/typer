<script lang="ts">
  //import { tick } from "svelte";
  let { data } = $props();
  let { bookMeta, chapters } = data;

  // let activeChapter = $derived.by(() => {
  //   if (!chapters) {
  //     error(400, { message: "Loading book went wrong." });
  //   }
  //   const activeChapter = chapters[gameState.chapter];
  //   if (!activeChapter) {
  //     error(400, { message: "Loading book went wrong." });
  //   }
  //   console.log(activeChapter.pages);
  //   return activeChapter;
  // });
</script>

{#if bookMeta && chapters}
  <h1>{bookMeta.title}</h1>
  <!-- <h2>{activeChapter.title}</h2> -->
  <!-- <Game chapter={activePage} {mode} /> -->

  {#each chapters as chapter, i}
    <h2>
      <a href={`/typer/${bookMeta.path}/${i + 1}`}>{chapter.title}</a>
    </h2>
    <!--   {chapter.pages} -->
  {/each}
{/if}
