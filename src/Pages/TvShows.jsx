import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllTvShows } from "../Api/Api";
import { Link } from "react-router-dom";
import { useWatchlist } from "../context/WatchlistContext";
import { useTheme } from "../context/ThemeContext";

export default function TvShows() {
  const [tvShows, setTvShows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const { toggleWatchlist, isInWatchlist } = useWatchlist();
  const { isDark } = useTheme();

  useEffect(() => {
    async function fetchTv() {
      setIsLoading(true);

      const data = await getAllTvShows();

      setTvShows(data);
      setIsLoading(false);
    }

    fetchTv();
  }, []);

  const handleCategoryChange = (e) => {
    const selected = e.target.value;

    if (selected === "movies") {
      navigate("/");
    }
  };

  return (
    <>
      <section className="max-w-7xl mx-auto px-6 py-6">
        <div className="head flex justify-between items-center mb-6 px-3 py-2">

          {/* title */}
          <h2
            className={`text-2xl font-bold ${
              isDark ? "text-white" : "text-black"
            }`}
          >
            TV Shows
          </h2>

          {/* category */}
          <select
            name="Category"
            id="Category"
            defaultValue="tv"
            onChange={handleCategoryChange}
            className={`bg-transparent border-none outline-none cursor-pointer font-medium text-sm ${
              isDark ? "text-white" : "text-black"
            }`}
          >
            <option
              value="movies"
              className="bg-white text-black"
            >
              Movie Shows
            </option>

            <option
              value="tv"
              className="bg-white text-black"
            >
              Tv Shows
            </option>
          </select>
        </div>

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
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1894 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />

                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8221 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289 69.5422 4.10194 63.2752 1.94025 56.7698 1.05124 51.7666 0.367541 46.6976 0.446843 41.7345 1.27873 39.2613 1.69328 37.813 4.19778 38.4501 6.62326 39.0873 9.04874 41.5694 10.4717 44.0505 10.1071 47.8511 9.54855 51.7191 9.52689 55.5402 10.0491 60.8642 10.7766 65.9928 12.5457 70.6331 15.2552 75.2735 17.9648 79.3347 21.5619 82.5849 25.841 84.9175 28.9121 86.7995 32.2913 88.1811 35.8758 89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>

              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {tvShows.map((tv) => {
              const inWatchlist = isInWatchlist(tv.id);

              return (
                <Link to={`/tv/${tv.id}`} key={tv.id}>
                  <div className="flex flex-col w-full cursor-pointer group">

                    {/* image */}
                    <div className="relative mb-5">
                      <img
                        src={
                          tv.poster_path
                            ? `https://image.tmdb.org/t/p/w500/${tv.poster_path}`
                            : "https://placehold.co/500x750/27272a/ffffff?text=No+Poster"
                        }
                        alt={tv.name}
                        className="w-full h-72 object-cover rounded-2xl shadow-sm transition-transform duration-200 group-hover:scale-[1.02]"
                      />

                      {/* percentage */}
                      <div className="absolute -bottom-4 left-3 w-9 h-9 bg-black rounded-full border-2 border-green-500 flex items-center justify-center text-white font-bold">
                        <span className="text-xs">
                          {Math.round(tv.vote_average * 10)}
                          <span className="align-top font-normal">%</span>
                        </span>
                      </div>
                    </div>

                    {/* title */}
                    <div className="flex flex-col px-1">
                      <h3
                        className={`text-base font-bold group-hover:text-yellow-400 transition-colors ${
                          isDark ? "text-white" : "text-black"
                        }`}
                      >
                        {tv.name}
                      </h3>

                      {/* date */}
                      <div className="flex justify-between items-center mt-1">
                        <span
                          className={`text-xs font-normal ${
                            isDark ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          {tv.first_air_date || "Unknown Date"}
                        </span>

                        {/* watchlist */}
                        <button
                          type="button"
                          className="cursor-pointer hover:scale-110 transition-transform"
                          onClick={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            toggleWatchlist(tv);
                          }}
                        >
                          <Heart
                            className={`w-4 h-4 ${
                              inWatchlist
                                ? "fill-yellow-300 text-yellow-300"
                                : "text-yellow-300"
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}