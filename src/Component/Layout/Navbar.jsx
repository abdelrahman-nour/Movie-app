import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full bg-yellow-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div>
          <Link to={`/`}>
            <h1 className="font-bold text-xl text-black cursor-pointer">
              Movie App
            </h1>
          </Link>
        </div>

        <div className="flex gap-5 items-center">
          <div className="lang">
            <select
              name="language"
              id="language"
              className="bg-transparent border-none outline-none cursor-pointer font-medium text-sm text-black"
            >
              <option value="en">En</option>
              <option value="ar">Ar</option>
            </select>
          </div>

          <button className="watchlist flex gap-1.5 items-center cursor-pointer bg-transparent border-none p-0">
            <Heart className="w-5 h-5 fill-black text-black" />
            <span className="font-semibold text-sm text-black">watchlist</span>
            <span className="bg-white text-black text-xs font-bold px-1.5 py-0.5 rounded-full">
              0
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}
