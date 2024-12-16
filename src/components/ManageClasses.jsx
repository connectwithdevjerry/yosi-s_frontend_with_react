import { Link } from "react-router-dom";
import {
  CREATE_CLASS,
  EDIT_CLASS,
  CHECK_SIGNUPS,
  BASE_URL,
  DELETE_CLASS,
} from "../paths";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllClasses } from "../Redux/myClassSlice";
import { ToastContainer } from "react-toastify";
import myAlert from "../alert";
import customFetch from "../Redux/axiosObject";
const ManageClasses = () => {
  const myRole = useSelector((state) => state.user.myRole);
  const classes = useSelector((state) => state.myClass.all_classes);
  const classMessage = useSelector((state) => state.myClass.classMessage);

  // const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllClasses(myRole));
    if (classMessage) {
      console.log(classMessage);
      myAlert(classMessage, true);
    }
  }, []);

  // console.log({ classes });

  const handleDelete = (id) => {
    const url = `${BASE_URL}${DELETE_CLASS}/${id}`;

    customFetch.delete(url).then((res) => {
      if (res.data.status) {
        dispatch(getAllClasses(myRole));
        return myAlert(res.data.message, !res.data.status);
      }
      return myAlert(res.data.message, !res.status);
    });
  };

  const shorten = (text, charNum) => {
    return text.length > charNum ? `${text.slice(0, charNum)}...` : text;
  };

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="toast-container">
          <ToastContainer limit={2} />
        </div>
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
              <th className="px-6 py-3 bg-gray-50 text-left text-lg font-medium text-gray-500 text-center uppercase tracking-wider">
                published
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-lg text-right font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {classes.map(
              ({
                _id,
                title,
                description,
                students,
                no_of_max_signups,
                published,
                uniqueRouteId,
              }) => (
                <tr key={_id}>
                  <td className="px-6 py-4 whitespace-nowrap">{title}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {shorten(description, 50)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-bold text-center">
                    {students?.length}/{no_of_max_signups}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {published ? "published" : "draft"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link
                      to={`${CHECK_SIGNUPS}/${uniqueRouteId}`}
                      className="text-green-600 hover:text-pink-900 mr-2"
                    >
                      check signups
                    </Link>
                    {!published && (
                      <Link
                        to={`${EDIT_CLASS}/${uniqueRouteId}`}
                        className="text-blue-600 hover:text-blue-900 mr-2"
                      >
                        Edit
                      </Link>
                    )}
                    <button
                      onClick={() => handleDelete(uniqueRouteId)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageClasses;
