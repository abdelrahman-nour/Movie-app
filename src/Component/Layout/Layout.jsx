// import Navbar from "../Layout/Navbar";
// <<<<<<< HEAD
// import Footer from "../Layout/Footer";
// import Search from "../Search/Search.jsx";
// import MovieCard from "../Cards/MovieCard.jsx";
// export default function Layout() {
//   return (
//     <>
//       <Navbar />
//       <Search />
//       <MovieCard />
//       <Footer />
// =======
// import { Outlet } from "react-router-dom";
// import Footer from "./Footer.jsx";
// export default function Layout() {
//   return (
//     <>
//       <div className="flex flex-col min-h-screen">
//         <Navbar />
//         <main className="flex-1">
//           <Outlet />
//         </main>
//         <Footer />
//       </div>
// >>>>>>> origin/nour
//     </>
//   );
// }
import Navbar from "./Navbar.jsx";
import { Outlet } from "react-router-dom";
import Footer from "./Footer.jsx";

export default function Layout() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-1">
          <Outlet />
        </main>

        <Footer />
      </div>
    </>
  );
}
