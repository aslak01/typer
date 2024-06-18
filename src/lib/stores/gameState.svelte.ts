function createGameState() {
  let time = $state(0);
  let mode = $state("N");
  // typed length in chars
  let typed = $state(0);
  let lastTime = $state(0);
  const wpm = $derived.by(() => {
    const words = typed / 5;
    const minutes = lastTime / 1000 / 60;
    const wpm = words / minutes;
    return !wpm || isNaN(wpm) ? "-" : wpm.toFixed(0);
  });
  let accuracyArr: number[] = $state([]);
  const acc = $derived.by(() => {
    const acc =
      accuracyArr.reduce((acc, curr) => acc + curr, 0) / accuracyArr.length;
    return !acc || isNaN(acc) ? "-" : acc.toFixed(0);
  });
  let realAccArr: number[] = $state([]);
  const realAcc = $derived.by(() => {
    const acc =
      realAccArr.reduce((acc, curr) => acc + curr, 0) / accuracyArr.length;
    return !acc || isNaN(acc) ? "-" : acc.toFixed(0);
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
      return typed;
    },
    set typed(t: number) {
      typed = t;
    },
    get lastTime() {
      return lastTime;
    },
    set lastTime(t: number) {
      lastTime = t;
    },
    get wpm() {
      return wpm || "-";
    },
    set acc(a: number) {
      accuracyArr.push(a);
    },
    get acc(): number | string {
      return acc;
    },
    set realAcc(a: number) {
      realAccArr.push(a);
    },
    get realAcc(): number | string {
      return realAcc;
    },
  };
}

export const gameState = createGameState();
