import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
        <h1 className="text-9xl font-extrabold text-yellow-300 tracking-widest">
          404
        </h1>
        <div className="bg-white px-4 py-1 text-sm font-semibold rounded rotate-12 absolute shadow-md text-gray-800">
          Page Not Found
        </div>
        <p className="text-gray-600 mt-8 mb-6 text-lg">
          Sorry, the page you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="px-6 py-3 bg-yellow-300 text-white font-medium rounded-md shadow-md hover:bg-yellow-400 transition-colors"
        >
          Go Back Home
        </Link>
      </div>
    </>
  );
}
