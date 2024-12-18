import logo from "../assets/maimi-dance-logo.png";
import { Link } from "react-router-dom";
import { CLASSES, LEARNMORE, SIGNIN, SIGNUP, MY_CLASSES } from "../paths";
import { useSelector } from "react-redux";
import { useState } from "react";

const Navbar = ({ isAuthPage }) => {
  const isAuth = useSelector((state) => state.user.isAuth);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="container mx-auto px-6 py-4 flex justify-between items-center">
      {/* Logo Section */}
      <Link
        to={CLASSES}
        className="text-sm md:text-md lg:text-lg font-bold text-pink-800 ml-2"
        style={{ color: "#b40895" }}
      >
        <div className="flex items-center">
          <img src={logo} alt="logo" className="h-12" />
          <span className="text-sm md:text-md lg:text-lg font-bold text-pink-800 ml-2">
            Mami Dance Festival
          </span>
        </div>
      </Link>

      {/* Hamburger Menu for Mobile */}
      <div className="md:hidden">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-pink-600 focus:outline-none"
        >
          {menuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Navigation Links */}
      <nav
        className={`${
          menuOpen ? "flex" : "hidden"
        } md:flex flex-col md:flex-row absolute md:relative top-16 md:top-0 left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none p-6 md:p-0 space-y-4 md:space-y-0 md:space-x-6 z-10`}
      >
        <Link
          to={LEARNMORE}
          className="hover:text-gray-100 text-gray-200 bg-pink-600 hover:bg-pink-900 px-4 py-2 rounded md:inline-block"
        >
          CLASSES
        </Link>
        {!isAuthPage && isAuth && (
          <Link
            to={MY_CLASSES}
            className="hover:text-gray-100 text-gray-200 bg-pink-600 hover:bg-pink-900 px-4 py-2 rounded md:inline-block"
          >
            MY CLASSES
          </Link>
        )}
        <Link
          to=""
          className="hover:text-gray-100 text-gray-200 bg-pink-600 hover:bg-pink-900 px-4 py-2 rounded md:inline-block"
        >
          CONTACT
        </Link>
      </nav>

      {/* Authentication Links */}
      {!isAuthPage && !isAuth && (
        <div
          className={`${
            menuOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row absolute md:relative top-36 md:top-0 left-0 w-full md:w-auto bg-white md:bg-transparent p-6 md:p-0 space-y-4 md:space-y-0 md:space-x-4 z-10`}
        >
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
