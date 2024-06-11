const lastIndexOfSymbols = (symbols: string[]) => (str: string) => {
  return (
    str
      .split("")
      .map((letter, index) => (symbols.includes(letter) ? index : -1))
      .filter((index) => index !== -1)
      .pop() || -1
  );
};

const lastIndexOfSeparator = lastIndexOfSymbols([
  ".",
  ",",
  ")",
  "\n",
  "—",
  ":",
  ";",
]);

export function sliceAtNearestSpace(str: string) {
  const threshold = 40;
  const lastSpaceIndex = str.lastIndexOf(" ");
  const lastSeparatorIndex = lastIndexOfSeparator(str);
  console.log("last space", lastSpaceIndex, "lastSep", lastSeparatorIndex);

  if (lastSpaceIndex === -1 && lastSeparatorIndex === -1) {
    return str;
  }

  if (lastSeparatorIndex === -1) {
    return str.slice(0, lastSpaceIndex);
  }

  if (lastSpaceIndex === -1) {
    return str.slice(0, lastSeparatorIndex + 1);
  }

  if (lastSpaceIndex - lastSeparatorIndex < threshold) {
    return str.slice(0, lastSeparatorIndex + 1);
  }

  return str.slice(0, lastSpaceIndex);
}
