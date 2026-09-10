// Place this file at: src/Component/Details/EmptyWatchList.jsx
import { Link } from "react-router-dom";

export default function EmptyWatchList() {
  return (
    <section className="mx-auto flex max-w-md flex-col items-center px-6 py-24 text-center">
      <svg viewBox="0 0 120 120" className="mb-8 h-28 w-28" fill="none">
        <rect
          x="14"
          y="30"
          width="92"
          height="60"
          rx="6"
          className="fill-[#141822] stroke-[#232838]"
          strokeWidth="2"
        />
        <circle cx="14" cy="45" r="5" className="fill-[#0B0E14]" />
        <circle cx="14" cy="60" r="5" className="fill-[#0B0E14]" />
        <circle cx="14" cy="75" r="5" className="fill-[#0B0E14]" />
        <circle cx="106" cy="45" r="5" className="fill-[#0B0E14]" />
        <circle cx="106" cy="60" r="5" className="fill-[#0B0E14]" />
        <circle cx="106" cy="75" r="5" className="fill-[#0B0E14]" />
        <path d="M45 48l20 12-20 12z" className="fill-[#E3B341]" />
      </svg>

      <h2 className="text-2xl font-bold text-[#F5F3EE]">
        Your watchlist is empty
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-[#8B93A7]">
        Movies and shows you save will show up here. Start exploring and add
        anything you don't want to forget about.
      </p>

      <Link
        to="/"
        className="mt-8 rounded-full bg-[#E3B341] px-6 py-3 text-sm font-semibold text-[#0B0E14] transition-colors hover:bg-[#f0c869]"
      >
        Browse movies
      </Link>
    </section>
  );
}
