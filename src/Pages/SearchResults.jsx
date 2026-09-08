import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { searchMovies } from "../Api/Api";
import { Heart } from "lucide-react";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("query") || "";

  const [searchInput, setSearchInput] = useState(query);
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);

  //   getMovies
  useEffect(() => {
    const getMovies = async () => {
      setIsLoading(true);
      const data = await searchMovies(query);
      setMovies(data);
      setIsLoading(false);
    };
    if (query) {
      getMovies();
    }
  }, [query]);

  //  searchHandler
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/search?query=${searchInput.trim()}`);
    }
  };

  return (
    <>
      <section className="max-w-7xl mx-auto px-6 mt-6">
        {/* searchBtn */}
        <form onSubmit={handleSearch} className="flex gap-3 items-center mb-8">
          <input
            key={query}
            type="search"
            defaultValue={query}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search and explore...."
            className="flex-1 bg-white text-black px-5 py-3 rounded-xl border border-gray-200 outline-none shadow-sm text-sm"
          />
          <button
            type="submit"
            className="bg-yellow-300 hover:bg-yellow-400 text-black font-semibold px-8 py-3 rounded-xl cursor-pointer transition shadow-sm text-sm"
          >
            Search
          </button>
        </form>

        <h2 className="text-xl font-bold mb-6">
          Search Results for :{" "}
          <span className="text-yellow-400 font-black">{query}</span>
        </h2>

        {isLoading ? (
          <div className="text-center py-10">
            <div role="status">
              <svg
                aria-hidden="true"
                className="inline w-8 h-8 text-neutral-tertiary animate-spin fill-brand"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : movies.length === 0 ? (
          <div className="text-center py-10 text-gray-400">
            No movies found.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="flex flex-col w-full cursor-pointer group"
              >
                {/*  */}
                <div className="relative mb-5">
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                        : "https://placehold.co/500x750/27272a/ffffff?text=No+Poster"
                    }
                    alt={movie.title}
                    className="w-full h-72 object-cover rounded-2xl shadow-sm transition-transform duration-200 group-hover:scale-[1.02]"
                  />

                  {/* percentage */}
                  <div className="absolute -bottom-4 left-3 w-9 h-9 bg-black rounded-full border-2 border-green-500 flex items-center justify-center text-white font-bold">
                    <span className="text-xs">
                      {Math.round(movie.vote_average * 10)}
                      <span className="align-top font-normal">%</span>
                    </span>
                  </div>
                </div>

                {/* title */}
                <div className="flex flex-col px-1">
                  <h3 className="text-base font-bold text-black group-hover:text-yellow-400 transition-colors">
                    {movie.title}
                  </h3>
                  {/* date */}
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-gray-500 text-xs font-normal">
                      {movie.release_date || "Unknown Date"}
                    </span>
                    {/* watchlist */}
                    <button className="cursor-pointer hover:scale-110 transition-transform">
                      <Heart className="w-4 h-4 fill-yellow-300 text-yellow-300" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
