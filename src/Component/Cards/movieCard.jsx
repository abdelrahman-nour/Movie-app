import { Heart } from "lucide-react";
import { useEffect } from "react";
import { getAllMovies } from "../../Api/Api";
import { useState } from "react";
import Pagination from "../Pagination/Pagination";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
export default function MovieCard() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  // useApi
  useEffect(() => {
    async function fetchMovies() {
      const data = await getAllMovies(page);
      //   console.log(data[0].id);
      setMovies(data.results || []);
      setTotalPages(data.total_pages || 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    fetchMovies();
  }, [page]);

  return (
    <section className="max-w-7xl mx-auto px-6 py-6">
      <h2 className="text-2xl font-bold mb-6">Now Playing</h2>

      <div className="grid grid-cols-4  gap-5">
        {movies.slice(0, 8).map((movie) => (
          <div
            key={movie.id}
            className="flex flex-col w-full cursor-pointer group"
          >
            {/* image */}
            <div className="relative mb-5">
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-72 object-cover rounded-2xl shadow-sm transition-transform duration-200 group-hover:scale-[1.02]"
              />

              {/* percentage */}
              <div className="absolute -bottom-4 left-3 w-10 h-10 bg-black rounded-full p-1">
                <CircularProgressbar
                  value={movie.vote_average * 10}
                  text={`${Math.round(movie.vote_average * 10)}%`}
                  styles={buildStyles({
                    textSize: "32px",
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

            {/* title */}
            <div className="flex flex-col px-1">
              <h3 className="text-base font-bold text-black group-hover:text-yellow-400 transition-colors">
                {movie.title}
              </h3>
              {/* date */}
              <div className="flex justify-between items-center mt-1">
                <span className="text-gray-500 text-xs font-normal">
                  {movie.release_date}
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
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </section>
  );
}
