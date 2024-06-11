type Chapter = {
  title: string;
  slug: string;
};
type Book = {
  title: string;
  slug: string;
  chapters: Chapter[];
};
function createPlayerState() {
  let activeBook: Book | {} = $state({});
  let activeBooks: Book[] = $state([]);
  return {
    get activeBook() {
      return activeBook;
    },
    set activeBook(b: Book) {
      activeBook = b;
    },
    get activeBooks() {
      return activeBooks;
    },
    set activeBooks(b: Book) {
      activeBooks.push(b);
    },
  };
}

export const playerState = createPlayerState();
