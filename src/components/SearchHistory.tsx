import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSearchHistory } from "../services/storage.service";

function SearchHistory() {
  const [searchHistory, setSearchHistory] = useState<Array<string>>([]);

  useEffect(() => {
    setSearchHistory(getSearchHistory());
  }, []);

  return (
    <div className="search-history">
      {!searchHistory.length
        ? "История запросов пуста"
        : searchHistory.map((shItem) => (
            <Link
              to={`/detail/${shItem}`}
              key={shItem}
              className="search-history__item"
            >
              {shItem}
            </Link>
          ))}
    </div>
  );
}

export default SearchHistory;
