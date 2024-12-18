import { CLASSES, CONTACT } from "../paths";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Footer = () => {
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = CLASSES;
  };

  const isAuth = useSelector((state) => state.user.isAuth);
  const accessToken = localStorage.getItem("accessToken");

  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-6 text-center">
        <div className="mb-4">
          <Link to={CLASSES} className="text-lg font-bold text-white-800">
            Mami Dance Festival
          </Link>
        </div>
        <nav className="space-x-6">
          {accessToken && isAuth && (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Log Out
            </button>
          )}

          <Link to={CLASSES} className="hover:text-gray-400">
            CLASSES
          </Link>
          <Link to={CONTACT} className="hover:text-gray-400">
            CONTACT
          </Link>
        </nav>
        <p className="mt-4 text-sm">
          &copy; 2024 Mami Dance Festival. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
