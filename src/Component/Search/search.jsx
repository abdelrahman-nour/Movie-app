export default function Search() {
  return (
    <section className="w-full pt-6 pb-4">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-zinc-300/25 p-8 md:p-10 rounded-2xl">
          <h2 className="text-3xl md:text-4xl font-black text-black mb-3">
            Welcome to our movie app
          </h2>
          <p className="text-gray-500 text-sm md:text-base mb-6 font-medium">
            Millions of movies, TV shows and people to discover. Explore now.
          </p>

          <form className="flex flex-col sm:flex-row gap-3 items-center w-full">
            <input
              type="search"
              placeholder="Search and explore...."
              className="w-full flex-1 bg-white text-black px-5 py-3.5 rounded-xl border border-transparent outline-none shadow-sm text-sm transition "
            />
            <button
              type="submit"
              className="w-full sm:w-auto bg-yellow-300 hover:bg-yellow-400 text-black font-semibold px-8 py-3.5 rounded-xl cursor-pointer transition shadow-sm"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
