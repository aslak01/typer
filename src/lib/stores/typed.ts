import { browser } from '$app/environment';
// import { setContext } from 'svelte'
import { writable, derived } from "svelte/store";

export const typed = writable("");

// time given in increments of 10 ms
export const time = writable(0);

export const wpm = derived([typed, time], ([$typed, $time]) => {
  // const words = $typed.trim().split(/\s+/).length
  const averageWordLength = 5;
  const estimatedWords = Math.ceil($typed.length / averageWordLength);
  const minutes = $time / (1000 * 60);
  return minutes > 0 ? Math.round(estimatedWords / minutes) : 0;
});



const defaultValue = 0
const initialValue = browser ? window.localStorage.getItem('wqwtheme') ?? defaultValue : defaultValue;
