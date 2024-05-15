<script lang="ts">
  import { bookIndex } from "$lib/data/books/index";
</script>

<ul>
  {#each bookIndex as book}
    <li class="book">
      <img
        src={`books/${book.path}/cover.jpg`}
        alt="{book.title + ' cover'})"
      />
      <a href={`/typer/${book.path}`}>
        {book.author} - {book.title} ({book.year})
      </a>
    </li>
  {/each}
</ul>

<style>
  ul {
    padding: 0;
    padding-block: 50px;
    list-style-type: none;
  }
  li {
    display: grid;
    grid-template-columns: 80px 1fr;
    align-items: center;
    gap: 1em;
  }
  img {
    max-height: 150px;
  }
</style>
