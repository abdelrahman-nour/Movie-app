import { createContext, useContext, useEffect, useState } from "react";

const WatchlistContext = createContext(null);
const STORAGE_KEY = "movieapp_watchlist";

export function WatchlistProvider({ children }) {
  const [watchlist, setWatchlist] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(watchlist));
  }, [watchlist]);

  function addToWatchlist(movie) {
    setWatchlist((prev) => {
      if (prev.some((item) => item.id === movie.id)) return prev;
      return [...prev, movie];
    });
  }

  function removeFromWatchlist(id) {
    setWatchlist((prev) => prev.filter((item) => item.id !== id));
  }

  function isInWatchlist(id) {
    return watchlist.some((item) => item.id === id);
  }

  function toggleWatchlist(movie) {
    if (isInWatchlist(movie.id)) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  }

  return (
    <WatchlistContext.Provider
      value={{
        watchlist,
        addToWatchlist,
        removeFromWatchlist,
        isInWatchlist,
        toggleWatchlist,
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  const ctx = useContext(WatchlistContext);
  if (!ctx) {
    throw new Error("useWatchlist must be used inside a <WatchlistProvider>");
  }
  return ctx;
}