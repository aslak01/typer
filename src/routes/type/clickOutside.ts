function assertIsNode(e: EventTarget | null): asserts e is Node {
  if (!e || !("nodeType" in e)) {
    throw new Error(`Node expected`);
  }
}

export function clickOutside(node: Node) {
  // the node has been mounted in the DOM

  window.addEventListener("click", handleClick);

  function handleClick(e: MouseEvent) {
    if (e.target === null) return;
    assertIsNode(e.target);
    if (!node.contains(e.target)) {
      node.dispatchEvent(new CustomEvent("outsideclick"));
    }
  }

  return {
    destroy() {
      // the node has been removed from the DOM
      window.removeEventListener("click", handleClick);
    },
  };
}
