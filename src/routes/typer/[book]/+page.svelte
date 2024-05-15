<script lang="ts">
  /**  @type {import('./$types').PageData} */
  export let data;
</script>

{data.bookMeta.title}

{#each data.chapters as chapter}
  <h2>{chapter.title}</h2>
  {chapter.pages}
{/each}
