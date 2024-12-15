import { CLASSES, CONTACT } from "../paths";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-6 text-center">
        <div className="mb-4">
          <Link to={CLASSES} className="text-lg font-bold text-white-800">
            Maimi Dance Festival
          </Link>
        </div>
        <nav className="space-x-6">
          <Link to={""} className="hover:text-gray-400">
            STUDIO
          </Link>
          <Link to={CLASSES} className="hover:text-gray-400">
            CLASSES
          </Link>
          <Link to={CONTACT} className="hover:text-gray-400">
            CONTACT
          </Link>
        </nav>
        <p className="mt-4 text-sm">
          &copy; 2024 Maimi Dance Festival. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
