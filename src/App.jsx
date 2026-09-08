import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Watchlist from "./Pages/Watchlist.jsx";
import MovieDetails from "./Pages/MovieDetails.jsx";
import TvDetails from "./Pages/TvDetails.jsx";
import TvShows from "./Pages/TvShows.jsx";
import NotFound from "./Pages/NotFound.jsx";
import SearchResults from "./Pages/SearchResults.jsx";
function App() {
  return (
    <>
      <Routes>
        <Route path={`/`} element={<Home />}></Route>
        <Route path={`/movie/:id/`} element={<MovieDetails />}></Route>
        <Route path={`/tv/:id/`} element={<TvDetails />}></Route>
        <Route path={`/tv`} element={<TvShows />}></Route>
        <Route path={`/watchlist`} element={<Watchlist />}></Route>
        <Route path={`/search`} element={<SearchResults />}></Route>
        <Route path={`*`} element={<NotFound />}></Route>
      </Routes>
    </>
  );
}

export default App;
