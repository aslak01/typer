import type { PageServerLoad } from "./$types";

import { getChapters } from "$lib/server/book";
import { bookIndex } from "$lib/data/books/index";
import { splitChapterInPages } from "$lib/utils/bookFuncs";

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
