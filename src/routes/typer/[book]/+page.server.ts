import type { PageServerLoad } from "./$types";

import { getChapters } from "$lib/server/book";
import { bookIndex } from "$lib/data/books/index";
import { splitChapterInPages } from "$lib/utils/bookFuncs";

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

    // type Book = {
    //   title: string;
    //   slug: string;
    //   chapters: Chapter[];
    //   chapsComplete: number;
    // };
    // type Chapter = {
    //   title: string;
    //   slug: string;
    //   completedPages: number;
    //   totalPages: number;
    // };

    const book = {
      title: currentBook.title,
      slug: currentBook.path,
      chapters: chapters.map((c, i) => ({
        title: c.title,
        slug: String(i + 1),
        completedPages: 0,
        totalPages: splitChapterInPages(c.pages).length,
      })),
      chapsComplete: 0,
    };

    return {
      bookMeta: currentBook,
      book,
      chapters,
    };
  } catch (error) {
    console.error(error);
    return { error: "Unable to fetch book" };
  }
};
