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

type PlayerState = {
  activeBook: Book | null;
  activeBooks: Book[];
  activeChapters: Book[];
};

function createPlayerState() {
  let state: PlayerState = {
    activeBook: null,
    activeBooks: [],
    activeChapters: [],
  };

  if (browser) {
    const storedActiveBook = localStorage.getItem("activeBook");
    const storedActiveBooks = localStorage.getItem("activeBooks");
    const storedActiveChapters = localStorage.getItem("activeChapters");

    if (storedActiveBook) {
      state.activeBook = deserialize<Book>(storedActiveBook);
    }
    if (storedActiveBooks) {
      state.activeBooks = deserialize<Book[]>(storedActiveBooks);
    }
    if (storedActiveChapters) {
      state.activeChapters = deserialize<Book[]>(storedActiveChapters);
    }
  }

  return {
    get activeBook(): Book | null {
      return state.activeBook;
    },
    set activeBook(book: Book | null) {
      if (!browser) return;
      state.activeBook = book;
      if (book) {
        localStorage.setItem("activeBook", serialize(book));
      } else {
        localStorage.removeItem("activeBook");
      }
    },

    get activeBooks(): Book[] {
      return state.activeBooks;
    },
    set activeBooks(book: Book) {
      if (!browser) return;
      const existingBook = state.activeBooks.find((b) => b.slug === book.slug);
      if (!existingBook) {
        state.activeBooks = [...state.activeBooks, book];
        localStorage.setItem("activeBooks", serialize(state.activeBooks));
      }
    },

    get activeChapters(): Book[] {
      return state.activeChapters;
    },
    set activeChapters(chapters: Book) {
      if (!browser) return;
      state.activeChapters = Array.isArray(chapters) ? chapters : [chapters];
      localStorage.setItem("activeChapters", serialize(state.activeChapters));
    },

    // Helper methods
    clearState() {
      if (!browser) return;
      state = {
        activeBook: null,
        activeBooks: [],
        activeChapters: [],
      };
      localStorage.removeItem("activeBook");
      localStorage.removeItem("activeBooks");
      localStorage.removeItem("activeChapters");
    },

    updateBookProgress(
      bookSlug: string,
      chapterSlug: string,
      completedPages: number,
    ) {
      if (!browser) return;
      const book = state.activeBooks.find((b) => b.slug === bookSlug);
      if (book) {
        const chapter = book.chapters.find((c) => c.slug === chapterSlug);
        if (chapter) {
          chapter.completedPages = completedPages;
          book.chapsComplete = book.chapters.filter(
            (c) => c.completedPages === c.totalPages,
          ).length;
          this.activeBooks = book; // This will update localStorage
        }
      }
    },
  };
}

function serialize<T>(value: T): string {
  return JSON.stringify(value);
}

function deserialize<T>(item: string): T {
  try {
    return JSON.parse(item);
  } catch (e) {
    console.error("Failed to deserialize:", e);
    return {} as T;
  }
}

export const playerState = createPlayerState();
