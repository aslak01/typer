import type { PageServerLoad } from "./$types";

import { getChapters } from "$lib/server/book";
import { bookIndex } from "$lib/data/books/index";
import { sliceAtNearestSpace } from "$lib/utils";

export const load: PageServerLoad = async ({ params, fetch }) => {
  try {
    const currentBook = bookIndex.find((book) => book.path === params.book);
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
    const chapterNo = Number(params.chapter) - 1;
    if (isNaN(chapterNo)) {
      throw new Error(`Malformed chapter number`);
    }
    const chapter = chapters[chapterNo];
    if (typeof chapter.title !== "string") {
      throw new Error(`Malformed chapter`);
    }
    const pages = splitChapterInPages(chapter.pages);
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
        slug: i + 1,
        completedPages: 0,
        totalPages: pages.length,
      })),
      chapsComplete: 0,
    };
    return {
      book,
      chapter: { ...chapter, pages },
    };
  } catch (error) {
    console.error(error);
    return { error: "Unable to fetch book" };
  }
};

function splitChapterInPages(chapter: string): string[] {
  function idealCharcount() {
    const chars_per_word = 5;
    const words_per_line = 12;
    const lines = 6;
    return chars_per_word * words_per_line * lines;
  }
  const pageLenMax = idealCharcount();
  function splitRecursive(text: string): string[] {
    if (text.length <= pageLenMax) {
      return [text];
    }

    const firstPage = sliceAtNearestSpace(text.slice(0, pageLenMax));
    const remainingText = text.slice(firstPage.length).trim();

    return [firstPage, ...splitRecursive(remainingText)];
  }
  return splitRecursive(chapter);
}
