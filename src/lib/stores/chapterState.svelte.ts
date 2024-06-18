export function createChapterState(chapLength: number) {
  let page = $state(0);
  function nextPage() {
    if (page + 1 <= chapLength) {
      page++;
    }
  }
  function prevPage() {
    if (page - 1 >= 0) {
      page--;
    }
  }
  return {
    get page() {
      return page;
    },
    nextPage,
    prevPage,
  };
}
