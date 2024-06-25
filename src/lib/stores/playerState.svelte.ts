import { browser } from "$app/environment";

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

function createPlayerState() {
  return {
    get activeBook(): Book | null {
      if (!browser) return null;
      const item = localStorage.getItem("activeBook");
      if (item) {
        return deserialize(item);
      }
      return null;
    },
    set activeBook(b: Book) {
      if (!browser) return;
      console.log("setting book", b);
      localStorage.setItem("activeBook", serialize(b));
    },
    get activeBooks(): Book[] | [] {
      if (!browser) return [];
      const books = localStorage.getItem("activeBooks");
      if (books) {
        return deserialize(books);
      }
      return [];
    },
    set activeBooks(b: Book) {
      if (!browser) return;
      const booksStr = localStorage.getItem("activeBooks");
      const books = (deserialize(booksStr) || []) as Book[];
      console.log("books", books);
      const bookSlugs = books.map((b) => b.slug);
      if (bookSlugs.includes(b.slug)) {
        return;
      }
      books.push(b);
      localStorage.setItem("activeBooks", serialize(books));
    },
    get activeChapters(): Book[] {
      return [];
    },
    set activeChapters(c: Book) {
      //
    },
  };
}

function serialize<T>(value: T): string {
  return JSON.stringify(value);
}

function deserialize<T>(item: string): T {
  return JSON.parse(item);
}

export const playerState = createPlayerState();
