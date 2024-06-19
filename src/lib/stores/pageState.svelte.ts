export function createPageState(page: string) {
  let currIndex = $state(0);
  let typed = $state("");
  let misclicks = $state(0);
  let deltasArr: number[] = $state([]);
  const avgOfDeltas = $derived(
    deltasArr.reduce((acc, curr) => acc + curr, 0) / deltasArr.length || 1,
  );
  let currLen = $derived(page.length);
  let lastTimestamp = $state(0);

  let typingInterval: number | undefined = $state(undefined);

  function resetDeltas() {
    deltasArr = [];
  }

  return {
    get currIndex() {
      return currIndex;
    },
    set currIndex(i: number) {
      currIndex = i;
    },
    get typed() {
      return typed;
    },
    set typed(s: string) {
      typed = s;
    },
    get misclicks() {
      return misclicks;
    },
    set misclicks(i: number) {
      misclicks = i;
    },
    set deltas(a: number) {
      deltasArr.push(a);
    },
    get deltas(): number | string {
      return avgOfDeltas;
    },
    get pageLength() {
      return currLen;
    },
    get lastTimestamp() {
      return lastTimestamp;
    },
    set lastTimestamp(s: number) {
      lastTimestamp = s;
    },
    get typingInterval() {
      return typingInterval;
    },
    set typingInterval(i: number | undefined) {
      typingInterval = i;
    },
    resetDeltas,
  };
}
