export const prerender = true;

type Chapter = {
  title: string;
  pages: string;
};

export function getChapters(txt: string): Chapter[] {
  const chapters = txt.split(/(CHAPTER.+)\n/).filter(Boolean);

  const pairs = chapters.reduce(
    (result: Chapter[], currentValue: string, index: number) => {
      if (index % 2 === 0) {
        const pair = {
          title: currentValue,
          pages: chapters[index + 1],
        };
        result.push(pair);
      }
      return result;
    },
    [],
  );

  function trimArrayWithRulesRecursive(
    array: string[],
    index = 0,
    encounteredEmptyLine = true,
  ): string[] {
    if (index >= array.length) {
      return [];
    }
    const str = array[index].trim();
    if (str !== "") {
      const rest = trimArrayWithRulesRecursive(array, index + 1, false);
      return [str, ...rest];
    } else {
      if (!encounteredEmptyLine) {
        const rest = trimArrayWithRulesRecursive(array, index + 1, true);
        return ["\n", ...rest];
      } else {
        return trimArrayWithRulesRecursive(array, index + 1, true);
      }
    }
  }

  function trimFinalEmptyLines(arr: string[]): string[] {
    const final = arr.at(-1);
    if (final === "") arr.pop();
    return arr;
  }

  function sepText(chapter: string) {
    const trimmed = trimArrayWithRulesRecursive(chapter.split("\n"));
    return trimFinalEmptyLines(trimmed);
  }

  const bookData = pairs.map((pair) => {
    return {
      title: pair.title,
      pages: sepText(pair.pages)
        .map((page) => page.replaceAll("\n", "↪"))
        .join(" ")
        .replaceAll(" ↪ ", "↪")
        .replaceAll("↪", "↪→"),
    };
  });

  return bookData;
}
