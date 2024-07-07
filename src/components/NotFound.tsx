import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="not-found">
      <h2>Sorry error 404</h2>
      <p>That page cannot be found</p>
      <div className="mt-5">
        <Link
          to="/"
          className="border-1 rounded-lg bg-custom-color-2 text-white p-1 hover:text-black transform duration-150"
        >
          Back to the home page...
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
