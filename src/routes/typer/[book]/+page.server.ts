import { getChapters } from "$lib/server/book";
import { bookIndex } from "$lib/data/books/index";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, fetch }) {
  try {
    const currentBook = bookIndex.find((book) => book.path === params.book)
    if (!currentBook) {
      throw new Error(`Invalid book, ${params.book}`)
    }
    const textPath = `/books/${currentBook.path}/${currentBook.parts[1].filename}`
    console.log(textPath)
    const response = await fetch(textPath)

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`)
    }
    const text = await response.text()
    console.log(text)
    if (typeof text !== "string") {
      throw new Error(`Malformed fetched book`)
    }
    const chapters = getChapters(text)
    return {
      bookMeta: currentBook,
      chapters
    }
  } catch (error) {
    console.error(error)
    return { error: 'Unable to fetch book' }
  }
}
