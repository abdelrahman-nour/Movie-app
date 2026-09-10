import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import MovieDetails from "./Pages/MovieDetails.jsx";
import TvDetails from "./Pages/TvDetails.jsx";
import TvShows from "./Pages/TvShows.jsx";
import NotFound from "./Pages/NotFound.jsx";
import SearchResults from "./Pages/SearchResults.jsx";
import Layout from "./Component/Layout/Layout.jsx";
import Watchlist from "./Pages/Watchlist.jsx";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/tv/:id" element={<TvDetails />} />
        <Route path="/tv" element={<TvShows />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/search" element={<SearchResults />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;