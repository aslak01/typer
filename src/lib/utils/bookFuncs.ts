import { sliceAtNearestSpace } from "$lib/utils";

export function splitChapterInPages(chapter: string): string[] {
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
