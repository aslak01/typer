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
      const item = localStorage.getItem("activeBook");
      if (item) {
        return deserialize(item);
      }
      return null;
    },
    set activeBook(b: Book) {
      console.log("setting book", b);
      localStorage.setItem("activeBook", serialize(b));
    },
    get activeBooks(): Book[] {
      const books = localStorage.getItem("activeBooks");
      if (books) {
        return deserialize(books);
      }
      return [];
    },
    set activeBooks(b: Book) {
      const booksStr = localStorage.getItem("activeBooks");
      if (booksStr) {
        const books = deserialize(booksStr) as Book[];
        books.push(b);
        localStorage.setItem("activeBooks", serialize(books));
      }
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
