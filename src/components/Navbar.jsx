import logo from "../assets/maimi-dance-logo.png";
import { Link } from "react-router-dom";
import { CLASSES, LEARNMORE, SIGNIN, SIGNUP } from "../paths";
import { useSelector } from "react-redux";

const Navbar = ({ isAuthPage }) => {
  const isAuth = useSelector((state) => state.user.isAuth);

  return (
    <header className="container mx-auto px-6 py-4 flex justify-between items-center">
      <div className="flex justify-center items-center">
        <img src={logo} alt="logo" className="h-12" />
        <Link
          to={CLASSES}
          className="text-lg font-bold text-gray-800"
          style={{ color: "#b40895" }}
        >
          Maimi Dance Festival
        </Link>
      </div>
      <nav className="hidden md:flex space-x-6">
        <Link to={""} className="hover:text-gray-500">
          STUDIO
        </Link>
        <Link to={LEARNMORE} className="hover:text-gray-500">
          CLASSES
        </Link>
        <Link to={""} className="hover:text-gray-500">
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
