import { Link } from "react-router-dom";
import { CREATE_CLASS, EDIT_CLASS } from "../paths";
const ManageClasses = () => {
  return (
    <div className="bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Manage Classes</h1>

        <Link
          to={CREATE_CLASS}
          className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
        >
          Create New Class
        </Link>

        <table className="min-w-full mt-8">
          <thead className="border">
            <tr>
              <th className="px-6 py-3 bg-gray-50 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">
                Class Title
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-lg font-medium text-gray-500 text-center uppercase tracking-wider">
                No of Students
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-lg text-right font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">Dance 1</td>
              <td className="px-6 py-4 whitespace-nowrap">Class 1</td>
              <td className="px-6 py-4 whitespace-nowrap font-bold text-center">
                1/6
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-green-600 hover:text-pink-900 mr-2">
                  Download
                </button>
                <Link
                  to={EDIT_CLASS}
                  className="text-blue-600 hover:text-blue-900 mr-2"
                >
                  Edit
                </Link>
                <button className="text-red-600 hover:text-red-900">
                  Delete
                </button>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">Class 1</td>
              <td className="px-6 py-4 whitespace-nowrap">Class 1</td>
              <td className="px-6 py-4 whitespace-nowrap font-bold text-center">
                1/6
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-green-600 hover:text-pink-900 mr-2">
                  Download
                </button>
                <Link
                  to={EDIT_CLASS}
                  className="text-blue-600 hover:text-blue-900 mr-2"
                >
                  Edit
                </Link>
                <button className="text-red-600 hover:text-red-900">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageClasses;
