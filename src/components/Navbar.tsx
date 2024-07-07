import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar fixed top-0 w-full z-50 bg-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="ml-20">David Blog</h1>
        <div className="links flex space-x-4 mr-20">
          <Link to="/" className="text-black">
            Home
          </Link>
          <Link
            to="/create"
            className="text-white bg-custom-color-2 rounded-8px py-2 px-4"
          >
            New Blog
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
