import Navbar from "./Navbar.jsx";
import { Outlet } from "react-router-dom";
import Footer from "./Footer.jsx";
import AIChat from "../AIChat/AIChat.jsx";
import { useTheme } from "../../context/ThemeContext";

export default function Layout() {
  const { isDark } = useTheme();

  return (
    <div
      className={`min-h-screen ${
        isDark
          ? "bg-gray-900 text-white"
          : "bg-white text-black"
      }`}
    >
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-1">
          <Outlet />
        </main>

        <AIChat />
        <Footer />
      </div>
    </div>
  );
}