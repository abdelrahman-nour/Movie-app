import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTvDetails } from "../Api/Api";
import { Heart, Star, Link } from "lucide-react";
import Recommendations from "../Component/Details/recommendation";
import Reviews from "../Component/Details/reviews";

function TVDetails() {
  const [tv, setTv] = useState(null);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function showTvs() {
      setIsLoading(true);

      const data = await getTvDetails(id);

      setTv(data);
      setIsLoading(false);
    }

    showTvs();
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
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.8624 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289 69.5422 4.10194 63.2754 1.94025 56.7698 1.05124 51.7666 0.367541 46.6976 0.446843 41.7345 1.27873 39.2613 1.69328 37.813 4.19778 38.4501 6.62326 39.0873 9.04874 41.5694 10.4717 44.0505 10.1071 47.8511 9.54855 51.7191 9.52689 55.5402 10.0491 60.8642 10.7766 65.9928 12.5457 70.6331 15.2552 75.2735 17.9648 79.3347 21.5619 82.5849 25.841 84.9175 28.9121 86.7995 32.2913 88.1811 35.8758 89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-center bg-white px-4 py-5 mt-3">
            <div className="w-full max-w-7xl flex flex-col md:flex-row gap-6">

              {/* Poster */}
              <div className="w-full md:w-[28%]">
                <img
                  src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`}
                  alt={tv.name}
                  className="w-full max-w-[300px] mx-auto rounded-2xl shadow-lg"
                />
              </div>

              {/* Info */}
              <div className="flex-1 relative">

                {/* Heart */}
                <button className="absolute right-0 top-0 text-3xl cursor-pointer hover:scale-110 transition-transform">
                  <Heart className="w-6 h-6 fill-yellow-300 text-yellow-300" />
                </button>

                {/* Title */}
                <h1 className="text-xl md:text-2xl font-bold mb-2 pr-10">
                  {tv.name}
                </h1>

                {/* Date */}
                <p className="text-gray-500 mb-4 text-sm">
                  {tv.first_air_date}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-5">
                  <Star className="w-5 h-5 fill-zinc-900 text-zinc-900" />
                  <Star className="w-5 h-5 fill-zinc-900 text-zinc-900" />
                  <Star className="w-5 h-5 fill-zinc-900 text-zinc-900" />
                  <Star className="w-5 h-5 fill-zinc-900 text-zinc-900" />
                  <Star className="w-5 h-5" />

                  <span className="text-base text-gray-600">
                    {tv.vote_count}
                  </span>
                </div>

                {/* Overview */}
                <p className="text-gray-700 text-base leading-6 mb-5">
                  {tv.overview}
                </p>

                {/* Genres */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {tv.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="bg-yellow-400 px-4 py-2 rounded-full text-sm font-medium"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>

                {/* Duration + Languages */}
                <div className="flex flex-wrap gap-8 mb-5 text-base">

                  <div>
                    <span className="font-bold">
                      Duration:
                    </span>{" "}
                    {tv.episode_run_time?.[0] || "N/A"} Min.
                  </div>

                  <div>
                    <span className="font-bold">
                      Languages:
                    </span>{" "}
                    {tv.spoken_languages
                      .map((language) => language.english_name)
                      .join(", ")}
                  </div>

                </div>

                {/* Production Company */}
                {tv.production_companies?.length > 0 && (
                  <div className="mb-5">

                    {tv.production_companies[0].logo_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w200${tv.production_companies[0].logo_path}`}
                        alt={tv.production_companies[0].name}
                        className="w-24 h-auto"
                      />
                    ) : (
                      <p className="text-xl font-bold">
                        {tv.production_companies[0].name}
                      </p>
                    )}

                  </div>
                )}

                {/* Website */}
                {tv.homepage && (
                  <a
                    href={tv.homepage}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 border border-yellow-300 px-5 py-2 rounded-full hover:bg-gray-100 text-sm"
                  >
                    Website
                    <Link className="w-4 h-4" />
                  </a>
                )}

              </div>
            </div>
          </div>

          {/* Reviews */}
          <Reviews type="tv" id={id} />

          {/* Recommendations */}
          <Recommendations type="tv" id={id} />
        </>
      )}
    </>
  );
}

export default TVDetails;