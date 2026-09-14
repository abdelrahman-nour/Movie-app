export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  isDark,
}) {
  return (
    <div className="flex justify-center items-center gap-3 mt-8 mb-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-md bg-yellow-400 text-black disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer font-bold hover:scale-105 transition-all shadow-md"
      >
        Previous
      </button>

      <span
        className={`font-semibold ${
          isDark ? "text-white" : "text-black"
        }`}
      >
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-md bg-yellow-400 text-black disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer font-bold hover:scale-105 transition-all shadow-md"
      >
        Next
      </button>
    </div>
  );
}