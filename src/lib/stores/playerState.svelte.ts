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
  let activeBook = localStore("activeBook", null);
  //let activeBook: Book | null = $state(activeBookLocal.value);
  let activeBooks = localStore("activeBooks", []);
  //let activeBooks: Book[] = $state([]);
  //
  return {
    get activeBook(): Book | null {
      return activeBook.value || null;
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
