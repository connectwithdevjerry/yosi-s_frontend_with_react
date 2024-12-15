import { Link } from "react-router-dom";
import { MANAGE_INSTRUCTORS } from "../paths";

const SwitchToAdmin = () => {
  return (
    <div className="bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Switch User to Instructor</h1>
        <div className="mb-8">
          <Link
            to={MANAGE_INSTRUCTORS}
            className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
          >
            Back
          </Link>
        </div>

        <div className="mb-4">
          <label
            htmlFor="search"
            className="block text-sm font-medium text-gray-700"
          >
            Search User to Instructor
          </label>
          <input
            type="text"
            id="search"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="users"
            className="block text-sm font-medium text-gray-700"
          >
            Select User
          </label>
          <select
            id="users"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select a user</option>
          </select>
        </div>

        <button className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded">
          Switch User
        </button>
      </div>
    </div>
  );
};

export default SwitchToAdmin;
