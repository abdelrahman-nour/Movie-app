import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";
import Search from "../Search/search.jsx";
import movieCard from "../Cards/movieCard.jsx";
export default function Layout() {
  return (
    <>
      <Navbar />
      <Search />
      <movieCard />
      <Footer />
    </>
  );
}
