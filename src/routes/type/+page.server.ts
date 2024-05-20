import { getChapters } from "$lib/server/book";

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch }) {
  const part1path = "/gullivers/split/1-part1/part1.txt"
  try {
    const response = await fetch(part1path)

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`)
    }
    const part1text = await response.text()
    // console.log(part1text)
    const chapters = getChapters(part1text)
    console.log(chapters)
    return {
      chapters
    };
  } catch (error) {
    console.error(error)
    return { error: 'Unable to fetch book' }
  }
}

