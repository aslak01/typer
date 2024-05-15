<script lang="ts">
  import type { LetterObj } from "./types";
  import { onMount, createEventDispatcher } from "svelte";
  import { typed, time } from "$lib/stores/typed";
  import Letter from "./Letter.svelte";

  export let strings: string[];
  export let focused: boolean;
  export let mode: string;
  let curr = 0;
  let isTyping = false;
  let typingTimeout: number | undefined;
  let typingInterval: number | undefined;
  const string = strings.join("\n");
  const strlen = string.length;

  const dispatch = createEventDispatcher();

  function done() {
    dispatch("done");
  }

  function setTypingStatus() {
    clearTimeout(typingTimeout);
    clearInterval(typingInterval);
    isTyping = true;

    function incrementTime() {
      $time += 10;
    }
    typingInterval = setInterval(incrementTime, 10);

    typingTimeout = setTimeout(() => {
      isTyping = false;
      time.update((value) => value - 3000);
      clearInterval(typingInterval);
    }, 3000);
  }

  // $: console.log($time);

  function handleKeydown(e: KeyboardEvent) {
    const key = e.key;
    let inserting = false;

    if (mode.toLowerCase() !== "i") return;
    console.log(mode);

    if (curr >= strlen) {
      return;
    }

    if (key === "Backspace" && $typed.length > 0) {
      strObjArr[curr - 1].correct = null;
      $typed = $typed.slice(0, -1);
      curr--;
      return;
    }

    if (key.length === 1) {
      setTypingStatus();
      inserting = true;
    }

    if (focused && inserting) {
      // const goal = string[curr];
      const result = strObjArr[curr];
      const target = result.value;
      const correct = matches(key, target);
      result.input = key;
      $typed += key;
      if (result.correct === null) {
        result.correct = correct;
      }
      strObjArr = strObjArr;
      curr++;
      if (curr === strlen) {
        done();
      }
    }
  }

  function replaceSpecialChars(input: string): string {
    const replacements: Record<string, string> = {
      "‘": "'",
      "’": "'",
      "“": '"',
      "”": '"',
      "–": "-",
      "—": "-",
    };

    return input.replace(/[‘’“”–—]/g, (match) => replacements[match] || match);
  }

  function matches(input: string, tar: string) {
    const match = input === replaceSpecialChars(tar);
    return match;
  }

  let strObjArr: LetterObj[] = [];
  onMount(() => {
    strObjArr = string
      .split("")
      .map((l) => ({ value: l, input: null, correct: null, time: null }));
  });
</script>

<svelte:window on:keydown={handleKeydown} />

<div>
  <div class="text-area">
    {#each strObjArr as letter, i}
      {@const active = i === curr}
      {@const space = letter.value === " "}
      {@const correct = letter.correct !== null ? !!letter.correct : null}
      <Letter {letter} {correct} {space} {active} {focused} {isTyping} />{/each}
    <slot />
  </div>
</div>

<style>
  .text-area {
    font-size: var(--font-size-3);
    letter-spacing: var(--font-letterspacing-2);
    line-height: var(--font-lineheight-3);
    /* font-family: var(--font-serif); */
    font-weight: var(--font-weight-5);
    /* font-family: "Manrope", sans-serif; */
    font-family: "Jost", sans-serif;
  }
</style>
