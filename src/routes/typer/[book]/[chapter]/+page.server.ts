import { getChapters } from "$lib/server/book";
import { bookIndex } from "$lib/data/books/index";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, fetch }) => {
  console.log(JSON.stringify(params))
  try {
    const currentBook = bookIndex.find((book) => book.path === params.book)
    if (!currentBook) {
      throw new Error(`Invalid book, ${params.book}`)
    }
    // TODO: generalise
    const textPath = `/books/${currentBook.path}/${currentBook.parts[1].filename}`
    const response = await fetch(textPath)

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`)
    }
    const text = await response.text()
    if (typeof text !== "string") {
      throw new Error(`Malformed fetched book`)
    }
    const chapters = getChapters(text)
    const chapterNo = Number(params.chapter) - 1
    if (isNaN(chapterNo)) {
      throw new Error(`Malformed chapter number`)
    }
    console.log(chapters)
    console.log(chapterNo)
    const chapter = chapters[chapterNo]
    if (typeof chapter.title !== "string") {
      throw new Error(`Malformed chapter`)
    }
    return {
      chapter
    }
  } catch (error) {
    console.error(error)
    return { error: 'Unable to fetch book' }
  }
}
