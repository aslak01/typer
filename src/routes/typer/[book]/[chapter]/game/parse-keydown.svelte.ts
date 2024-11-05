function isInput(inp: string): boolean {
  return (
    inp.length === 1 || inp === "Enter" || inp === "Tab" || inp === "Backspace"
  );
}

function isInsert(m: string) {
  return m.toLowerCase() === "i";
}

export function parseInsert(e: KeyboardEvent, gameState, pageState) {
  const { key } = e;
  const isInsertMode = isInsert(gameState.mode);
  let isTyping = false;

  if (!isInsertMode) {
    if (isInsert(key)) {
      gameState.mode = "I";
      isTyping = true;
      return { key: null, isTyping: true };
    }
  }

  if (isInsertMode) {
    if (key === "Escape") {
      gameState.mode = "N";
      let isTyping = false;
      return { key: null, isTyping: false };
    }

    if (key === "Tab") {
      // tab is an input so prevent it behaving
      // as a window controller
      e.preventDefault();
    }
  }

  isTyping = true;

  const keyIsInput = isInput(key);

  if (!keyIsInput || !isInsertMode) {
    return { key: null, isTyping };
  }

  if (key === "Backspace") {
    if (pageState.typed.length > 0) {
      pageState.typed = pageState.typed.slice(0, -1);
      pageState.currIndex--;
    }
    return { key: null, isTyping };
  }

  if (key === "Enter") {
    return { key: "↪", isTyping };
  }
  if (key === "Tab") {
    return { key: "→", isTyping };
  }
  return { key: key, isTyping };
}
