import { useWatchlist } from "../context/WatchlistContext";
import WatchListCard from "../Component/Cards/watchListCard";
import EmptyWatchList from "../Component/Details/EmptyWatchList";
export default function Watchlist()
 { const { watchlist, removeFromWatchlist } = useWatchlist();
return ( <section className="mx-auto max-w-7xl px-6 py-10">
   <h1 className="text-3xl font-bold text-[#F5F3EE]">My Watchlist</h1>
  {watchlist.length === 0 ? (
    <EmptyWatchList />
  ) : (
    <div className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {watchlist.map((movie) => (
        <WatchListCard
          key={movie.id}
          movie={movie}
          onRemove={removeFromWatchlist}
        />
      ))}
    </div>
  )}
</section>
); }