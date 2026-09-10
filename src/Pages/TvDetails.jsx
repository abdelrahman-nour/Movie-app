import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTvDetails } from "../Api/Api";
import { Heart, Star, Link } from "lucide-react";

import Recommendations from "../Component/Details/recommendation";
import Reviews from "../Component/Details/reviews";
import { useTheme } from "../context/ThemeContext";

function TVDetails() {
  const [tv, setTv] = useState(null);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  const { isDark } = useTheme();

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
          {/* loading */}
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
                <p
                  className={`mb-4 text-sm ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {tv.first_air_date}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-5">
                  <Star className="w-5 h-5 fill-yellow-300 text-yellow-300" />
                  <Star className="w-5 h-5 fill-yellow-300 text-yellow-300" />
                  <Star className="w-5 h-5 fill-yellow-300 text-yellow-300" />
                  <Star className="w-5 h-5 fill-yellow-300 text-yellow-300" />
                  <Star className="w-5 h-5" />

                  <span
                    className={`text-base ${
                      isDark ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {tv.vote_count}
                  </span>
                </div>

                {/* Overview */}
                <p
                  className={`text-base leading-6 mb-5 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {tv.overview}
                </p>

                {/* Genres */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {tv.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-medium"
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
          <Reviews type="tv" id={id} />

          {/* Recommendations */}
          <Recommendations type="tv" id={id} />
        </>
      )}
    </>
  );
}

export default TVDetails;