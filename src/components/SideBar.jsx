import { Link, useLocation } from "react-router-dom";
import {
  ADMIN,
  ADMIN_ROLE,
  INSTRUCTOR_ROLE,
  MANAGE_CLASSES,
  MANAGE_INSTRUCTORS,
} from "../paths";
import logo from "../assets/maimi-dance-logo.png";
const SideBar = ({ perm_type }) => {
  const location = useLocation();
  const { pathname } = location;

  const sideStyle = (value) => {
    if (value) return "bg-pink-600 text-white hover:bg-pink-600 rounded";
    return "bg-pink-200 hover:bg-pink-600 rounded";
  };

  return (
    <aside className="w-1/5 bg-pink-100 text-black h-screen p-5">
      <img
        src={logo}
        alt="logo"
        className="mb-16 mx-auto"
        style={{ height: 100 }}
      />
      <nav>
        <ul className="space-y-4">
          <li className={sideStyle(pathname === ADMIN)}>
            <Link to={ADMIN} className="block px-4 py-2 hover:text-gray-200">
              Dashboard
            </Link>
          </li>
          <li className={sideStyle(pathname.includes(MANAGE_CLASSES))}>
            <Link
              to={MANAGE_CLASSES}
              className="block px-4 py-2 hover:text-gray-200"
            >
              Manage Classes
            </Link>
          </li>
          {perm_type === ADMIN_ROLE && (
            <li className={sideStyle(pathname.includes(MANAGE_INSTRUCTORS))}>
              <Link
                to={MANAGE_INSTRUCTORS}
                className="block px-4 py-2 hover:text-gray-200"
              >
                Manage Instructors
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
