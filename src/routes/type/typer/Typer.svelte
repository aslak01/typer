<script lang="ts">
  import type { LetterObj } from "./types";
  import { onMount, createEventDispatcher } from "svelte";
  import { typed, time } from "$lib/stores/typed";
  import Letter from "./Letter.svelte";

  export let strings: string[];
  export let focused: boolean;
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
      time.update((value) => value + 10);
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

    if (curr >= strlen) {
      return;
    }

    if (key === "Backspace") {
      strObjArr[curr - 1].correct = null;
      $typed = $typed.slice(0, -1);
      curr--;
      return;
    }

    if (/^[a-zA-Z0-9,.\-\s'";:]$/.test(key)) {
      setTypingStatus();
      inserting = true;
    }

    if (focused && inserting) {
      // const goal = string[curr];
      const result = strObjArr[curr];
      const correct = matches(key, string);
      result.input = key;
      if (typeof key === "string" && key.length) {
        $typed += key;
        console.log(key);
        console.log($typed);
      }
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
    let text;
    // Replace single curved quotes
    text = input.replace(/[\u2018\u2019]/g, "'");
    // Replace double curved quotes
    text = input.replace(/[\u201C\u201D]/g, '"');
    // Replace en dash and em dash with hyphen
    text = input.replace(/[\u2013\u2014]/g, "-");
    return text;
  }

  function matches(input: string, tar: string) {
    return input === replaceSpecialChars(tar);
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
      {@const correct =
        letter.correct !== null ? letter.value === letter.input : null}
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
