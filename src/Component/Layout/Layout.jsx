import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";
import Search from "../Search/Search.jsx";
import MovieCard from "../Cards/MovieCard.jsx";
export default function Layout() {
  return (
    <>
      <Navbar />
      <Search />
      <MovieCard />
      <Footer />
    </>
  );
}
