// Place this file at: src/Component/Layout/Footer.jsx
import { Link } from "react-router-dom";

const exploreLinks = [
  { label: "Home", to: "/" },
  { label: "TV Shows", to: "/tv" },
  { label: "Watchlist", to: "/watchlist" },
];

const supportLinks = [{ label: "Search", to: "/search" }];

export default function Footer() {
  return (
    <footer className="border-t border-[#232838] bg-[#0B0E14] text-[#8B93A7]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Link to="/" className="text-2xl font-bold text-[#F5F3EE]">
            Movie<span className="text-[#E3B341]">Hub</span>
          </Link>
          <p className="mt-3 max-w-xs text-sm leading-relaxed">
            Discover, track, and never forget the movies and shows you want
            to watch next.
          </p>
          <div className="mt-5 flex gap-3">
            <a
              href="#"
              aria-label="Twitter"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#232838] transition-colors hover:border-[#E3B341] hover:text-[#E3B341]"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                <path d="M22 5.9c-.7.3-1.5.6-2.3.7.8-.5 1.5-1.3 1.8-2.3-.8.5-1.7.8-2.6 1a4.1 4.1 0 0 0-7 3.7A11.6 11.6 0 0 1 3.4 4.6a4.1 4.1 0 0 0 1.3 5.5c-.6 0-1.3-.2-1.8-.5v.1c0 2 1.4 3.6 3.3 4a4.1 4.1 0 0 1-1.8.1c.5 1.6 2 2.8 3.8 2.8A8.2 8.2 0 0 1 2 18.6a11.6 11.6 0 0 0 6.3 1.8c7.5 0 11.7-6.3 11.7-11.7v-.5c.8-.6 1.5-1.3 2-2.1z" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#232838] transition-colors hover:border-[#E3B341] hover:text-[#E3B341]"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                <path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.2.06 2 .25 2.4.42.6.24 1 .53 1.5 1a4 4 0 0 1 1 1.5c.17.5.36 1.2.42 2.4.06 1.3.07 1.7.07 4.9s-.01 3.6-.07 4.9c-.06 1.2-.25 2-.42 2.4-.24.6-.53 1-1 1.5a4 4 0 0 1-1.5 1c-.5.17-1.2.36-2.4.42-1.3.06-1.7.07-4.9.07s-3.6-.01-4.9-.07c-1.2-.06-2-.25-2.4-.42a4 4 0 0 1-1.5-1 4 4 0 0 1-1-1.5c-.17-.5-.36-1.2-.42-2.4C2.21 15.6 2.2 15.2 2.2 12s.01-3.6.07-4.9c.06-1.2.25-2 .42-2.4a4 4 0 0 1 1-1.5 4 4 0 0 1 1.5-1c.5-.17 1.2-.36 2.4-.42C8.4 2.21 8.8 2.2 12 2.2zm0 1.8c-3.15 0-3.52 0-4.76.07-1.03.05-1.6.22-1.96.36-.5.2-.85.42-1.22.8-.38.37-.6.72-.8 1.22-.14.37-.3.93-.36 1.96-.06 1.24-.07 1.6-.07 4.76s0 3.52.07 4.76c.05 1.03.22 1.6.36 1.96.2.5.42.85.8 1.22.37.38.72.6 1.22.8.37.14.93.3 1.96.36 1.24.06 1.6.07 4.76.07s3.52 0 4.76-.07c1.03-.05 1.6-.22 1.96-.36.5-.2.85-.42 1.22-.8.38-.37.6-.72.8-1.22.14-.37.3-.93.36-1.96.06-1.24.07-1.6.07-4.76s0-3.52-.07-4.76c-.05-1.03-.22-1.6-.36-1.96a3 3 0 0 0-.8-1.22 3 3 0 0 0-1.22-.8c-.37-.14-.93-.3-1.96-.36C15.52 4 15.15 4 12 4z" />
                <circle cx="12" cy="12" r="3.2" />
                <circle cx="17.4" cy="6.6" r=".9" />
              </svg>
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-[#F5F3EE]">Explore</h3>
          <ul className="mt-4 space-y-3 text-sm">
            {exploreLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="transition-colors hover:text-[#E3B341]">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-[#F5F3EE]">Support</h3>
          <ul className="mt-4 space-y-3 text-sm">
            {supportLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="transition-colors hover:text-[#E3B341]">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-[#232838] px-6 py-5">
        <p className="mx-auto max-w-7xl text-xs">
          © {new Date().getFullYear()} MovieHub. All rights reserved.
        </p>
      </div>
    </footer>
  );
}