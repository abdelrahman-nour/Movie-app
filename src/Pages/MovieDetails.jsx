import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../Api/Api";
import { Heart } from "lucide-react";
import { Star } from "lucide-react";
import {Link} from "lucide-react"
function MovieDetails() {

  const {id} =useParams()
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
        ) :(

        <div className="min-h-screen flex items-center justify-center bg-white p-6">
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-10 items-center">

        <div className="w-full md:w-[40%]">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full max-w-[470px] mx-auto rounded-3xl shadow-lg"
          />
        </div>

        <div className="flex-1 relative">

          <button className="absolute right-0 top-0 text-3xl cursor-pointer hover:scale-110 transition-transform">
            <Heart className="sm:w-7 sm:h-7 fill-yellow-300 text-yellow-300" />
          </button>

          <h1 className="text-2xl md:text-3xl font-bold mb-3">
            {movie.title}
          </h1>

          <p className="text-gray-500 mb-7">
            {movie.release_date}
          </p>

          <div className="flex items-center gap-4 mb-8">

               <Star className="fill-zinc-900 text-zinc-900"/>
               <Star className="fill-zinc-900 text-zinc-900"/>
               <Star className="fill-zinc-900 text-zinc-900"/>
               <Star className="fill-zinc-900 text-zinc-900"/>
               <Star/>

            <span className="text-lg text-gray-600">
              {movie.vote_count}
            </span>
          </div>

          <p className="text-gray-700 text-lg leading-8 mb-7">
            {movie.overview}
          </p>

          <div className="flex flex-wrap gap-4 mb-8">
            {movie.genres.map((genre) => (
              <span
                key={genre.id}
                className="bg-yellow-400 px-7 py-3 rounded-full font-medium"
              >
                {genre.name}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-16 mb-8 text-lg">
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

          {movie.production_companies.length > 0 && (
            <div className="mb-7">
              {movie.production_companies[0].logo_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.production_companies[0].logo_path}`}
                  alt={movie.production_companies[0].name}
                  className="w-52 h-auto"
                />
              ) : (
                <p className="text-2xl font-bold">
                  {movie.production_companies[0].name}
                </p>
              )}
            </div>
          )}

          {movie.homepage && (
            <a
              href={movie.homepage}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border border-yellow-300 px-6 py-3 rounded-full hover:bg-gray-100"
            >
              Website <Link/>
            </a>
          )}
        </div>
      </div>
    </div>

        )}
    </>
  );
}

export default MovieDetails;