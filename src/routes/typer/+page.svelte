<script lang="ts">
  import { bookIndex } from "$lib/data/books/index";
</script>

<ul>
  {#each bookIndex as book}
    <li class="book">
      <a href={`/typer/${book.path}`}>
        <img
          src={`books/${book.path}/cover.jpg`}
          alt="{book.title + ' cover'})"
        />
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
    align-items: start;
    padding-block-end: 5ch;
  }
  img {
    max-height: 150px;
  }
  a {
    display: grid;
    grid-template-columns: 80px 1fr;
    gap: 1em;
  }
</style>
