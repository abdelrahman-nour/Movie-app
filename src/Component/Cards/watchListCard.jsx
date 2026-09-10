// Place this file at: src/Component/Cards/watchListCard.jsx
import { Link } from "react-router-dom";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w342";

export default function WatchListCard({ movie, onRemove }) {
  const posterUrl = movie.poster_path
    ? `${IMAGE_BASE}${movie.poster_path}`
    : movie.poster || "https://via.placeholder.com/342x513?text=No+Poster";

  const year = movie.release_date
    ? movie.release_date.slice(0, 4)
    : movie.year || "";

  return (
    <div className="group relative overflow-hidden rounded-lg border border-[#232838] bg-[#141822] transition-transform duration-200 hover:-translate-y-1">
      <button
        onClick={() => onRemove(movie.id)}
        aria-label={`Remove ${movie.title} from watchlist`}
        className="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity duration-200 hover:bg-[#E4572E] group-hover:opacity-100"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>

      <Link to={`/movie/${movie.id}`}>
        <div className="aspect-[2/3] w-full overflow-hidden bg-[#0B0E14]">
          <img
            src={posterUrl}
            alt={movie.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>

      <div className="p-3">
        <Link to={`/movie/${movie.id}`}>
          <h3 className="truncate text-sm font-semibold text-[#F5F3EE] hover:text-[#E3B341]">
            {movie.title}
          </h3>
        </Link>
        <div className="mt-1 flex items-center justify-between text-xs text-[#8B93A7]">
          <span>{year}</span>
          {movie.vote_average ? (
            <span className="flex items-center gap-1 text-[#E3B341]">
              <svg viewBox="0 0 20 20" className="h-3 w-3 fill-current">
                <path d="M10 1.6l2.6 5.6 6.1.6-4.6 4.1 1.4 6-5.5-3.2-5.5 3.2 1.4-6-4.6-4.1 6.1-.6z" />
              </svg>
              {movie.vote_average.toFixed(1)}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}