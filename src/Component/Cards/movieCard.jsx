import { Heart } from "lucide-react";
import { useEffect } from "react";
import { getAllMovies } from "../../Api/Api";
import { useState } from "react";
export default function MovieCard() {
  const [movies, setMovies] = useState([]);
  // useApi
  useEffect(() => {
    async function fetchMovies() {
      const data = await getAllMovies();
      //   console.log(data[0].id);
      setMovies(data);
    }
    fetchMovies();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-6 py-6">
      <h2 className="text-2xl font-bold mb-6">Now Playing</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {movies.map((movie) => (
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
    </section>
  );
}
