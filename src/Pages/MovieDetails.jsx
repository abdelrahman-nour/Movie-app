import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../Api/Api";
import { Heart, Star, Link } from "lucide-react";
import Reviews from "../Component/Details/reviews";
import Recommendations from "../Component/Details/recommendation";
import { useWatchlist } from "../context/WatchlistContext";
import { useTheme } from "../context/ThemeContext";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isDark } = useTheme();
  const { toggleWatchlist, isInWatchlist } = useWatchlist();

 const inWatchlist = movie ? isInWatchlist(movie.id) : false;  

  useEffect(() => {
    async function showMovies() {
      setIsLoading(true);

      const data = await getMovieDetails(id);

      setMovie(data);
      setIsLoading(false);
    }

    showMovies();
  }, [id]);

  return (
    <>
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
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.8624 33.5539C95.2932 28.8221 97.8624 33.5539 97.8624C95.2932 28.8221 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2752 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7995 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>

            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (

        <>
          <div
            className={`flex justify-center px-4 py-5 mt-3 ${
              isDark ? "bg-gray-900 text-white" : "bg-white text-black"
            }`}
          >
            <div className="w-full max-w-7xl flex flex-col md:flex-row gap-6">

              {/* Poster */}
              <div className="w-full md:w-[28%]">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full max-w-[300px] mx-auto rounded-2xl shadow-lg"
                />
              </div>

              {/* Info */}
              <div className="flex-1 relative">

                {/* Heart */}
                <button className="absolute right-0 top-0 text-3xl cursor-pointer hover:scale-110 transition-transform" onClick={(event) => {
                          event.stopPropagation();
                          toggleWatchlist(movie);
                        }}
                        aria-label={
                          inWatchlist
                            ? "Remove from watchlist"
                            : "Add to watchlist"
                        }>
                  <Heart className={`w-6 h-6 ${
                            inWatchlist
                              ? "fill-yellow-300 text-yellow-300"
                              : "text-yellow-300"
                          }`}/>
                </button>

                {/* Title */}
                <h1 className="text-xl md:text-2xl font-bold mb-2 pr-10">
                  {movie.title}
                </h1>

                {/* Date */}
                <p
                  className={`mb-4 text-sm ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {movie.release_date}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-5">

                   {[1, 2, 3, 4, 5].map((star) => (
                    
                    <Star
                        key={star}
                        className={`w-5 h-5 ${
                          star <= Math.round(movie.vote_average / 2)
                            ? "fill-yellow-300 text-yellow-300"
                            : "text-gray-400"
                        }`}
                      />
                    ))}

                  <span
                    className={`text-base ${
                      isDark ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {movie.vote_count}
                  </span>
                </div>

                {/* Overview */}
                <p
                  className={`text-base leading-6 mb-5 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {movie.overview}
                </p>

                {/* Genres */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="bg-yellow-400 px-4 py-2 rounded-full text-sm font-medium text-black"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>

                {/* Duration + Languages */}
                <div className="flex flex-wrap gap-8 mb-5 text-base">
                  <div>
                    <span className="font-bold">Duration:</span>{" "}
                    {movie.runtime} Min.
                  </div>

                  <div>
                    <span className="font-bold">Languages:</span>{" "}
                    {movie.spoken_languages
                      .map((language) => language.english_name)
                      .join(", ")}
                  </div>
                </div>

                {/* Production Company */}
                {movie.production_companies.length > 0 && (
                  <div className="mb-5">
                    {movie.production_companies[0].logo_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w200${movie.production_companies[0].logo_path}`}
                        alt={movie.production_companies[0].name}
                        className="w-24 h-auto"
                      />
                    ) : (
                      <p className="text-xl font-bold">
                        {movie.production_companies[0].name}
                      </p>
                    )}
                  </div>
                )}

                {/* Website */}
                {movie.homepage && (
                  <a
                    href={movie.homepage}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 border border-yellow-300 px-5 py-2 rounded-full hover:bg-gray-100 hover:text-black text-sm"
                  >
                    Website
                    <Link className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Reviews */}
          <Reviews type="movie" id={id} />

          {/* Recommendations */}
          <Recommendations type="movie" id={id} />
        </>
      )}
    </>
  );
}

export default MovieDetails;