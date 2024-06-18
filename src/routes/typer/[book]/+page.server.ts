import { getChapters } from "$lib/server/book";
import { bookIndex } from "$lib/data/books/index";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, fetch }) => {
  try {
    const currentBook = bookIndex.find((book) => book.path === params.book);
    console.log(params.book);
    if (!currentBook) {
      throw new Error(`Invalid book, ${params.book}`);
    }
    // TODO: generalise
    const textPath = `/books/${currentBook.path}/${currentBook.parts[1].filename}`;
    const response = await fetch(textPath);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const text = await response.text();
    if (typeof text !== "string") {
      throw new Error(`Malformed fetched book`);
    }
    const chapters = getChapters(text);
    return {
      bookMeta: currentBook,
      chapters,
    };
  } catch (error) {
    console.error(error);
    return { error: "Unable to fetch book" };
  }
};
