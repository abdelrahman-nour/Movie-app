import { useEffect, useState } from "react";
import {
  getMovieRecommendations,
  getTvRecommendations,
} from "../../Api/Api";

import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useNavigate } from "react-router-dom";

export default function Recommendations({ type, id }) {
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchRecommendations() {
      setIsLoading(true);

      let data = [];

      if (type === "movie") {
        data = await getMovieRecommendations(id);
      } else if (type === "tv") {
        data = await getTvRecommendations(id);
      }

      setRecommendations(data);
      setIsLoading(false);
    }

    if (id && type) {
      fetchRecommendations();
    }
  }, [type, id]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      <div className="border-t border-gray-300 pt-5">

        <h2 className="text-xl sm:text-2xl font-bold mb-5">
          Recommendations
        </h2>

        {isLoading ? (
          <p className="text-center py-10">
            Loading recommendations...
          </p>
        ) : (
          <Swiper
            modules={[Autoplay]}
            spaceBetween={12}
            slidesPerView={2.5}
            loop={true}
            allowTouchMove={true}
            autoplay={{
              delay: 1000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 4,
                spaceBetween: 16,
              },
              768: {
                slidesPerView: 5,
                spaceBetween: 16,
              },
              1024: {
                slidesPerView: 6,
                spaceBetween: 16,
              },
            }}
          >
            {recommendations.slice(0, 16).map((item) => {
              const rating = Math.round(item.vote_average * 10);

              return (
                <SwiperSlide key={item.id}>
                  <div
                    onClick={() =>
                      navigate(
                        type === "movie"
                          ? `/movie/${item.id}`
                          : `/tv/${item.id}`
                      )
                    }
                    className="cursor-pointer group"
                  >

                    <div className="relative aspect-[2/3] w-full mb-2">
                      <img
                        src={
                          item.poster_path
                            ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                            : "https://via.placeholder.com/500x750?text=No+Poster"
                        }
                        alt={item.title || item.name}
                        className="w-full h-full object-cover rounded-lg sm:rounded-xl shadow-sm transition-transform duration-200 group-hover:scale-[1.03]"
                      />

                      <div className="absolute -bottom-2 left-1 w-7 h-7 sm:w-8 sm:h-8 bg-black rounded-full p-[2px]">
                        <CircularProgressbar
                          value={rating}
                          text={`${rating}`}
                          styles={buildStyles({
                            textSize: "28px",
                            pathColor:
                              rating >= 70
                                ? "#22c55e"
                                : rating >= 50
                                ? "#eab308"
                                : "#ef4444",
                            trailColor: "#374151",
                            textColor: "#fff",
                          })}
                        />
                      </div>
                    </div>

                    <h3 className="text-[11px] sm:text-xs font-bold text-black truncate mt-3 group-hover:text-yellow-400 transition-colors">
                      {item.title || item.name}
                    </h3>

                    <p className="text-[9px] sm:text-[10px] text-gray-500 mt-0.5">
                      {item.release_date ||
                        item.first_air_date ||
                        "N/A"}
                    </p>

                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
      </div>
    </section>
  );
}