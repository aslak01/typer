type User = {
  name: string;
  books: Book[] | null;
  lastActiveBook: Book | null;
};

type Book = {
  meta: BookMeta;
  title: string;
  author: string;
  year: number;
  content: Chapter[];
};

type BookMeta = {
  active: boolean;
  complete: boolean;
  length: number;
  typed: number;
  lastUpdated: number;
  activeTime: number;
  wpm: number;
};

type Chapter = {
  meta: BookMeta;
  content: ChapterContent;
  finishedIndex: number;
};

type ChapterContent = {
  title: string;
  text: string;
};
