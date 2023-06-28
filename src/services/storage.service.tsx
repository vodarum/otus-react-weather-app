const STORAGE_SEARCH_HISTORY = "searchHistory";

const getSearchHistory = (): Array<string> => {
  const searchHistoryAsString = localStorage.getItem(STORAGE_SEARCH_HISTORY);
  const searchHistory: Array<string> = searchHistoryAsString
    ? JSON.parse(searchHistoryAsString)
    : [];

  return searchHistory;
};

const addCityToSearchHistory = (city: string): void => {
  const searchHistory = getSearchHistory();
  const newSearchHistory = [
    city,
    ...searchHistory.filter((c) => c !== city),
  ].slice(0, 10);

  localStorage.setItem(
    STORAGE_SEARCH_HISTORY,
    JSON.stringify(newSearchHistory)
  );
};

export { getSearchHistory, addCityToSearchHistory };
