import logo from "../assets/maimi-dance-logo.png";
import { Link } from "react-router-dom";
import { CLASSES, LEARNMORE, SIGNIN, SIGNUP, MY_CLASSES } from "../paths";
import { useSelector } from "react-redux";

const Navbar = ({ isAuthPage }) => {
  const isAuth = useSelector((state) => state.user.isAuth);

  return (
    <header className="container mx-auto px-6 py-4 flex justify-between items-center">
      <div className="flex justify-center items-center">
        <img src={logo} alt="logo" className="h-12" />
        <Link
          to={CLASSES}
          className="text-sm md:text-md lg:text-lg font-bold text-gray-800"
          style={{ color: "#b40895" }}
        >
          Mami Dance Festival
        </Link>
      </div>
      <nav className="hidden md:flex space-x-6">
        <Link
          to={LEARNMORE}
          className="hover:text-gray-100 text-gray-200 bg-pink-600 hover:bg-pink-900 px-2 py-1 rounded"
        >
          CLASSES
        </Link>
        {!isAuthPage && isAuth && (
          <Link
            to={MY_CLASSES}
            className="hover:text-gray-100 text-gray-200 bg-pink-600 hover:bg-pink-900 px-2 py-1 rounded"
          >
            MY CLASSES
          </Link>
        )}
        <Link
          to={""}
          className="hover:text-gray-100 text-gray-200 bg-pink-600 hover:bg-pink-900 px-2 py-1 rounded"
        >
          CONTACT
        </Link>
      </nav>
      {!isAuthPage && !isAuth && (
        <div className="space-x-4">
          <Link
            to={SIGNUP}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
          >
            Sign Up
          </Link>
          <Link
            to={SIGNIN}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Sign In
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
