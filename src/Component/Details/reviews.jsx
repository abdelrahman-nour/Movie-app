import { UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import {
  getMovieReviews,
  getTvReviews,
} from "../../Api/Api";
import { useTheme } from "../../context/ThemeContext";

export default function Reviews({ type, id }) {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedReviews, setExpandedReviews] = useState([]);

  const { isDark } = useTheme();

  useEffect(() => {
    async function fetchReviews() {
      setIsLoading(true);

      let data = [];

      if (type === "movie") {
        data = await getMovieReviews(id);
      } else if (type === "tv") {
        data = await getTvReviews(id);
      }

      setReviews(data);
      setIsLoading(false);
    }

    if (id && type) {
      fetchReviews();
    }
  }, [type, id]);

  const toggleReview = (reviewId) => {
    if (expandedReviews.includes(reviewId)) {
      setExpandedReviews(
        expandedReviews.filter((id) => id !== reviewId)
      );
    } else {
      setExpandedReviews([...expandedReviews, reviewId]);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6">

      {/* Section line */}
      <div
        className={`border-t pt-6 ${
          isDark ? "border-gray-700" : "border-gray-300"
        }`}
      >

        {/* Title */}
        <div className="flex items-center justify-between mb-6">
          <h2
            className={`text-xl sm:text-2xl font-bold ${
              isDark ? "text-white" : "text-black"
            }`}
          >
            Reviews
          </h2>

          <span
            className={`text-sm ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {reviews.length} Reviews
          </span>
        </div>

        {/* Loading */}
        {isLoading ? (
          <p
            className={`text-center py-10 ${
              isDark ? "text-gray-300" : "text-black"
            }`}
          >
            Loading reviews...
          </p>
        ) : reviews.length === 0 ? (
          <p
            className={`text-center py-10 ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            No reviews available.
          </p>
        ) : (
          <div className="space-y-4">

            {reviews.slice(0, 3).map((review) => {
              const isExpanded = expandedReviews.includes(review.id);

              return (
                <div
                  key={review.id}
                  className={`border rounded-xl p-4 sm:p-5 ${
                    isDark
                      ? "border-gray-700 bg-gray-800"
                      : "border-gray-200 bg-white"
                  }`}
                >

                  {/* User info */}
                  <div className="flex items-center justify-between mb-4">

                    <div className="flex items-center gap-3">

                      {/* Avatar */}
                      <div
                        className={`w-10 h-10 rounded-full overflow-hidden flex items-center justify-center ${
                          isDark ? "bg-gray-700" : "bg-gray-200"
                        }`}
                      >
                        {review.author_details?.avatar_path ? (
                          <img
                            src={
                              review.author_details.avatar_path.startsWith(
                                "http"
                              )
                                ? review.author_details.avatar_path
                                : `https://image.tmdb.org/t/p/w200${review.author_details.avatar_path}`
                            }
                            alt={review.author}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <UserRound
                            className={`w-5 h-5 ${
                              isDark
                                ? "text-gray-400"
                                : "text-gray-500"
                            }`}
                          />
                        )}
                      </div>

                      <div>
                        <h3
                          className={`font-bold text-sm sm:text-base ${
                            isDark ? "text-white" : "text-black"
                          }`}
                        >
                          {review.author}
                        </h3>

                        <p
                          className={`text-xs ${
                            isDark
                              ? "text-gray-400"
                              : "text-gray-500"
                          }`}
                        >
                          {review.created_at
                            ? new Date(
                                review.created_at
                              ).toLocaleDateString()
                            : "Unknown date"}
                        </p>
                      </div>

                    </div>

                    {/* Rating */}
                    {review.author_details?.rating && (
                      <div className="flex items-center gap-1 bg-yellow-100 px-2 py-1 rounded-lg">
                        <span>⭐</span>

                        <span className="font-bold text-sm text-black">
                          {review.author_details.rating}/10
                        </span>
                      </div>
                    )}

                  </div>

                  {/* Review text */}
                  <p
                    className={`text-sm leading-6 ${
                      isDark
                        ? "text-gray-300"
                        : "text-gray-600"
                    }`}
                  >
                    {isExpanded
                      ? review.content
                      : `${review.content.slice(0, 250)}${
                          review.content.length > 250
                            ? "..."
                            : ""
                        }`}
                  </p>

                  {/* Read more */}
                  {review.content.length > 250 && (
                    <button
                      onClick={() => toggleReview(review.id)}
                      className="mt-2 text-sm font-semibold text-yellow-500 hover:text-yellow-600 cursor-pointer"
                    >
                      {isExpanded ? "Show less" : "Read more"}
                    </button>
                  )}

                </div>
              );
            })}

          </div>
        )}

      </div>
    </section>
  );
}
