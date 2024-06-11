import { sliceAtNearestSpace } from "$lib/utils";

function getLines() {
  const TMP_CPW = 5;
  const TMP_WPL = 13;
  const LNS = 4;
  return TMP_WPL * TMP_CPW * LNS;
}

export function createChapterState(pages: string) {
  const pageLenMax = getLines();
  const paddingLen = 300;
  const firstPageLen = sliceAtNearestSpace(pages.slice(0, pageLenMax)).length;
  let page = $state(0);
  let pageStart = $state(0);
  let pageEnd = $state(firstPageLen);
  function turnPage() {
    page++;
    pageStart = pageEnd;
    pageEnd =
      pageStart +
      sliceAtNearestSpace(pages.slice(pageStart, pageStart + pageLenMax))
        .length;
  }
  let activePage = $derived(pages.slice(pageStart, pageEnd).trim());
  let aboveContent = $derived.by(() => {
    const end = pageStart;
    const startPos = end - paddingLen;
    const start = startPos > 0 ? startPos : 0;
    return pages.slice(start, end);
  });
  let belowContent = $derived.by(() => {
    const start = pageEnd;
    const end = start + paddingLen;
    return pages.slice(start, end);
  });
  return {
    get page() {
      return page;
    },
    get pageStart() {
      return pageStart;
    },
    get pageEnd() {
      return pageEnd;
    },
    get activePage() {
      return activePage;
    },
    get aboveContent() {
      return aboveContent;
    },
    get belowContent() {
      return belowContent;
    },
    turnPage,
  };
}

function createGameState() {
  let time = $state(0);
  let mode = $state("N");
  // typed length in chars
  let typed = $state(0);
  const wpm = $derived.by(() => {
    const words = typed / 5;
    const minutes = time / 10 / 60;
    return Math.round(words / minutes);
  });
  let accuracyArr: number[] = $state([]);
  const acc = $derived.by(() => {
    return Math.round(
      accuracyArr.reduce((acc, curr) => acc + curr, 0) / accuracyArr.length ||
      1,
    );
  });
  return {
    get mode() {
      return mode;
    },
    set mode(m: string) {
      mode = m;
    },
    get time() {
      return time;
    },
    set time(t: number) {
      time = t;
    },
    get typed() {
      return time;
    },
    set typed(t: number) {
      typed = t;
    },
    get wpm() {
      return wpm;
    },
    set acc(a: number) {
      accuracyArr.push(a);
    },
    get acc() {
      return acc;
    },
  };
}

export const gameState = createGameState();
