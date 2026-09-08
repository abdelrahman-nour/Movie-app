import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      return;
    }

    navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
  };

  return (
    <section className="w-full pt-4 sm:pt-6 pb-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-zinc-300/40 p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-black mb-2 sm:mb-3">
            Welcome to our movie app
          </h2>
          <p className="text-gray-700 text-xs sm:text-sm md:text-base mb-5 sm:mb-6 font-medium leading-relaxed">
            Millions of movies, TV shows and people to discover. Explore now.
          </p>
          <form
            onSubmit={handleSearch}
            className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 items-stretch sm:items-center w-full"
          >
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search and explore...."
              className="w-full flex-1 bg-white text-black px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl border border-transparent outline-none shadow-sm text-sm focus:ring-2 focus:ring-yellow-400"
            />
            <button
              type="submit"
              className="w-full sm:w-auto bg-yellow-300 hover:bg-yellow-400 active:scale-95 text-black font-semibold px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl cursor-pointer transition-all shadow-sm text-sm text-center"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
