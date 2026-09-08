import Navbar from "../Layout/Navbar";
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
