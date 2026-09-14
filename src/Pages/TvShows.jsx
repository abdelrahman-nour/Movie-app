import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllTvShows } from "../Api/Api";
import { useWatchlist } from "../context/WatchlistContext";
import { useTheme } from "../context/ThemeContext";
import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";
import Pagination from "../Component/Common/Pagination.jsx";

export default function TvShows() {
  const [tvShows, setTvShows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

  const { toggleWatchlist, isInWatchlist } = useWatchlist();
  const { isDark } = useTheme();

  useEffect(() => {
    async function fetchTvShows() {
      setIsLoading(true);

      const data = await getAllTvShows(page);

      setTvShows(data.results || []);
      setTotalPages(data.total_pages || 1);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      setIsLoading(false);
    }

    fetchTvShows();
  }, [page]);

  const handleCategoryChange = (e) => {
    const selected = e.target.value;

    if (selected === "movies") {
      navigate("/");
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2
          className={`text-xl sm:text-2xl font-bold ${
            isDark ? "text-white" : "text-black"
          }`}
        >
          TV Shows
        </h2>

        <select
          name="Category"
          id="Category"
          defaultValue="tv"
          onChange={handleCategoryChange}
          className={`bg-transparent border border-gray-200 sm:border-none rounded-lg p-1.5 sm:p-0 outline-none cursor-pointer font-medium text-xs sm:text-sm ${
            isDark ? "text-white" : "text-black"
          }`}
        >
          <option value="movies" className="bg-white text-black">
            Movie Shows
          </option>

          <option value="tv" className="bg-white text-black">
            Tv Shows
          </option>
        </select>
      </div>

      {/* Loading */}
      {isLoading ? (
        <div className="text-center py-16">
          <div role="status">
            <svg
              aria-hidden="true"
              className="inline w-8 h-8 text-neutral-tertiary animate-spin fill-brand"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5091 50 91.5091C72.5987 91.5091 90.9186 73.1891 90.9186 50.5908C90.9186 27.9921 9.67226 50.5908 9.67226 50.5908C9.67226 27.9921 27.4011 9.67226 50 9.67226Z"
                fill="currentColor"
              />

              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9117 97.0079 33.5539C95.2932 28.8227 92.8711 24.3691 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2752 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4505 6.62326C39.0871 9.04874 41.569 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7768 65.992 12.5457 70.6327 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7995 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>

            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          {/* TV Shows */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5 sm:gap-5">
            {tvShows.slice(0, 8).map((tv) => {
              const inWatchlist = isInWatchlist(tv.id);

              return (
                <div
                  key={tv.id}
                  className="flex flex-col w-full cursor-pointer group"
                  onClick={() => navigate(`/tv/${tv.id}`)}
                  role="link"
                  tabIndex={0}
                  onKeyDown={(event) => {
                    if (
                      event.key === "Enter" ||
                      event.key === " "
                    ) {
                      event.preventDefault();
                      navigate(`/tv/${tv.id}`);
                    }
                  }}
                >
                  {/* Poster */}
                  <div className="relative mb-3 sm:mb-5 aspect-2/3 w-full">
                    <img
                      src={
                        tv.poster_path
                          ? `https://image.tmdb.org/t/p/w500/${tv.poster_path}`
                          : "https://via.placeholder.com/500x750?text=No+Poster"
                      }
                      alt={tv.name}
                      className="w-full h-full object-cover rounded-xl sm:rounded-2xl shadow-sm transition-transform duration-200 group-hover:scale-[1.02]"
                    />

                    {/* Rating */}
                    <div className="absolute -bottom-3 left-2 sm:-bottom-4 sm:left-3 w-8 h-8 sm:w-10 sm:h-10 bg-black rounded-full p-0.5 sm:p-1">
                      <CircularProgressbar
                        value={tv.vote_average * 10}
                        text={`${Math.round(tv.vote_average * 10)}%`}
                        styles={buildStyles({
                          textSize: "34px",
                          pathColor:
                            tv.vote_average >= 7
                              ? "#22c55e"
                              : tv.vote_average >= 5
                              ? "#eab308"
                              : "#ef4444",
                          trailColor: "#374151",
                          textColor: "#fff",
                        })}
                      />
                    </div>
                  </div>

                  {/* TV Info */}
                  <div className="flex flex-col px-1">
                    <h3
                      className={`text-sm sm:text-base font-bold group-hover:text-yellow-400 transition-colors truncate ${
                        isDark ? "text-white" : "text-black"
                      }`}
                    >
                      {tv.name}
                    </h3>

                    <div className="flex justify-between items-center mt-1">
                      <span className="text-gray-500 text-[11px] sm:text-xs font-normal">
                        {tv.first_air_date || "N/A"}
                      </span>

                      {/* Watchlist */}
                      <button
                        type="button"
                        className="cursor-pointer hover:scale-110 transition-transform"
                        onClick={(event) => {
                          event.stopPropagation();
                          toggleWatchlist(tv);
                        }}
                        aria-label={
                          inWatchlist
                            ? "Remove from watchlist"
                            : "Add to watchlist"
                        }
                      >
                        <Heart
                          className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                            inWatchlist
                              ? "fill-yellow-300 text-yellow-300"
                              : "text-yellow-300"
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          <div className="mt-8 flex justify-center overflow-x-auto w-full">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(newPage) => setPage(newPage)}
              isDark={isDark}
            />
          </div>
        </>
      )}
    </section>
  );
}