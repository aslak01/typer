type Chapter = {
  title: string;
  slug: string;
  completedPages: number;
  totalPages: number;
};

type Book = {
  title: string;
  slug: string;
  chapters: Chapter[];
  chapsComplete: number;
};

import { localStore } from "./useLocalStorage.svelte";

function createPlayerState() {
  let activeBook = $state(localStore("activeBook", null));
  let activeBooks = $state(localStore("activeBooks", []));
  //let activeBook: Book | null = $state(activeBookLocal.value);
  //let activeBooks: Book[] = $state([]);
  return {
    get activeBook(): Book | null {
      return activeBook.value;
    },
    set activeBook(b: Book) {
      localStore("activeBook", b);
    },
    get activeBooks(): Book[] {
      return activeBooks.value;
    },
    set activeBooks(b: Book) {
      const curr = activeBooks.value;
      const newArr = curr.push(b);
      localStore("activeBooks", newArr);
    },
  };
}

export const playerState = createPlayerState();
