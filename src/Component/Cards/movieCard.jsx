import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllMovies } from "../../Api/Api";
import Pagination from "../Common/Pagination.jsx";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function MovieCard() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchMovies() {
      setIsLoading(true);
      const data = await getAllMovies(page);
      setMovies(data.results || []);
      setTotalPages(data.total_pages || 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
      setIsLoading(false);
    }
    fetchMovies();
  }, [page]);

  const handleCategoryChange = (e) => {
    const selected = e.target.value;
    if (selected === "tv") {
      navigate("/tv");
    } else {
      navigate("/");
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl sm:text-2xl font-bold">Now Playing</h2>
        <select
          name="Category"
          id="Category"
          defaultValue="movies"
          onChange={handleCategoryChange}
          className="bg-transparent border border-gray-200 sm:border-none rounded-lg p-1.5 sm:p-0 outline-none cursor-pointer font-medium text-xs sm:text-sm text-black"
        >
          <option value="movies">Movie Shows</option>
          <option value="tv">Tv Shows</option>
        </select>
      </div>

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
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5 sm:gap-5">
            {movies.slice(0, 8).map((movie) => (
              <div
                key={movie.id}
                className="flex flex-col w-full cursor-pointer group"
              >
                {/* image */}
                <div className="relative mb-3 sm:mb-5 aspect-2/3 w-full">
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                        : "https://via.placeholder.com/500x750?text=No+Poster"
                    }
                    alt={movie.title}
                    className="w-full h-full object-cover rounded-xl sm:rounded-2xl shadow-sm transition-transform duration-200 group-hover:scale-[1.02]"
                  />

                  {/* circleRatingBadge*/}
                  <div className="absolute -bottom-3 left-2 sm:-bottom-4 sm:left-3 w-8 h-8 sm:w-10 sm:h-10 bg-black rounded-full p-0.5 sm:p-1">
                    <CircularProgressbar
                      value={movie.vote_average * 10}
                      text={`${Math.round(movie.vote_average * 10)}%`}
                      styles={buildStyles({
                        textSize: "34px",
                        pathColor:
                          movie.vote_average >= 7
                            ? "#22c55e"
                            : movie.vote_average >= 5
                              ? "#eab308"
                              : "#ef4444",
                        trailColor: "#374151",
                        textColor: "#fff",
                      })}
                    />
                  </div>
                </div>
                {/* content */}
                <div className="flex flex-col px-1">
                  <h3 className="text-sm sm:text-base font-bold text-black group-hover:text-yellow-400 transition-colors truncate">
                    {movie.title}
                  </h3>

                  <div className="flex justify-between items-center mt-1">
                    <span className="text-gray-500 text-[11px] sm:text-xs font-normal">
                      {movie.release_date || "N/A"}
                    </span>
                    {/* witchlist */}
                    <button className="cursor-pointer hover:scale-110 transition-transform">
                      <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-yellow-300 text-yellow-300" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center overflow-x-auto w-full">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(newPage) => setPage(newPage)}
            />
          </div>
        </>
      )}
    </section>
  );
}
