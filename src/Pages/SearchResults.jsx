import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { searchMovies } from "../Api/Api";
import "react-circular-progressbar/dist/styles.css";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import Pagination from "../Component/Pagination/Pagination";

export default function SearchResults() {
  const { movieName } = useParams();
  const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (!movieName) return;
    searchMovies(movieName ,page).then((data) => {
      setMovies(data.results || []);
      setTotalPages(data.total_pages || 1);
    });
  }, [movieName, page]);


  return (
    <section className="max-w-7xl mx-auto px-6 py-6">
      <h2 className="text-2xl font-bold mb-6">
        Search Results for :{" "}
        <span className="text-yellow-400">{movieName}</span>
      </h2>

      {movies.length === 0 ? (
        <p className="text-gray-500 py-10">
          No movies found matching "{movieName}".
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="flex flex-col w-full cursor-pointer group"
            >
              <Link to={`/movie/${movie.id}`}>
                <div className="relative mb-5">
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                        : "https://via.placeholder.com/500x750?text=No+Poster"
                    }
                    alt={movie.title}
                    className="w-full h-72 object-cover rounded-2xl shadow-sm transition-transform duration-200 group-hover:scale-[1.02]"
                  />

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
              </Link>

              <div className="flex flex-col px-1">
                <Link to={`/movie/${movie.id}`}>
                  <h3 className="text-base font-bold text-black group-hover:text-yellow-400 transition-colors truncate">
                    {movie.title}
                  </h3>
                </Link>

                <div className="flex justify-between items-center mt-1">
                  <span className="text-gray-500 text-xs font-normal">
                    {movie.release_date || "N/A"}
                  </span>

                  <button className="cursor-pointer hover:scale-110 transition-transform">
                    <Heart className="w-4 h-4 fill-yellow-300 text-yellow-300" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </section>
  );
}
