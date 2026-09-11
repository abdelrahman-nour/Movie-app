import { Heart, Sun, Moon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useWatchlist } from "../../context/WatchlistContext";
import { useTheme } from "../../context/ThemeContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { watchlist } = useWatchlist();
  const { isDark, toggleTheme } = useTheme();

  return (
    <nav
      className={`w-full ${
        isDark ? "bg-gray-800" : "bg-yellow-300"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        <Link to="/">
          <h1
            className={`font-bold text-xl cursor-pointer ${
              isDark ? "text-white" : "text-black"
            }`}
          >
            Movie App
          </h1>
        </Link>

        <div className="flex gap-5 items-center">

          <div className="lang">
            <select
              name="language"
              id="language"
              className={`bg-transparent border-none outline-none cursor-pointer font-medium text-sm ${
                isDark ? "text-white" : "text-black"
              }`}
            >
              <option value="en">En</option>
              <option value="ar">Ar</option>
            </select>
          </div>

          {/* Dark Mode */}
          <button
          onClick={toggleTheme}
          className="cursor-pointer hover:scale-110 transition-transform"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-yellow-300" />
            ) : (
            <Moon className="w-5 h-5 text-black" />
            )}
          </button>

          {/* Watchlist */}
          <button
            className="watchlist flex gap-1.5 items-center cursor-pointer bg-transparent border-none p-0"
            onClick={() => navigate("/watchlist")}
          >
            <Heart
              className={`w-5 h-5 ${
                isDark
                  ? "fill-white text-white"
                  : "fill-black text-black"
              }`}
            />

            <span
              className={`font-semibold text-sm ${
                isDark ? "text-white" : "text-black"
              }`}
            >
              watchlist
            </span>

            <span className="bg-white text-black text-xs font-bold px-1.5 py-0.5 rounded-full">
              {watchlist.length}
            </span>
          </button>

        </div>
      </div>
    </nav>
  );
}