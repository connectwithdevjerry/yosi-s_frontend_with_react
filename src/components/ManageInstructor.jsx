import { Link } from "react-router-dom";
import {
  ADMIN_ROLE,
  AUTHORIZE,
  BASE_URL,
  GET_USERS,
  INSTRUCTOR_ROLE,
  USER_ROLE,
  USER_TO_MANAGER,
} from "../paths";
import { useEffect, useState } from "react";
import customFetch from "../Redux/axiosObject";
import { ToastContainer } from "react-toastify";
import Loader from "./Loader";
import { useSelector } from "react-redux";
const ManageInstructor = () => {
  const permissions = [ADMIN_ROLE, INSTRUCTOR_ROLE];

  const [users, setUsers] = useState([]);

  useEffect(() => {
    customFetch
      .get(`${BASE_URL}${GET_USERS}`)
      .then((res) => {
        setUsers(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const admin_et_instructors = users.filter((user) =>
    permissions.includes(user.permissionLev)
  );

  const myRole = useSelector((state) => state.user.myRole);

  const handleAdminRemove = (email) => {
    customFetch
      .put(`${BASE_URL}${AUTHORIZE}`, {
        email,
        permission_type: USER_ROLE,
      })
      .then((res) => {
        setUsers(users.filter((user) => user.email !== email));
        myAlert(res?.data?.message, !res?.data?.status);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (myRole !== ADMIN_ROLE) {
    return (
      <div>
        <h1>You are not authorized to access this page.</h1>
      </div>
    );
  }

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="toast-container">
          <ToastContainer limit={2} />
        </div>
        <h1 className="text-3xl font-bold mb-4">Manage Instructor</h1>
        <Link
          to={USER_TO_MANAGER}
          className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
        >
          User to Instructor/Admin
        </Link>

        <table className="min-w-full mt-8">
          <thead className="border">
            <tr>
              <th className="px-6 py-3 bg-gray-50 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">
                First Name
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">
                Last Name
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">
                Perm_Type
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-lg text-right font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          {!admin_et_instructors.length && (
            <div className="flex justify-center mt-[120px]">
              <Loader />
            </div>
          )}
          <tbody className="bg-white divide-y divide-gray-200">
            {admin_et_instructors.map(
              ({ _id, firstName, lastName, email, permissionLev }) => (
                <tr key={_id}>
                  <td className="px-6 py-4 whitespace-nowrap">{firstName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{lastName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {permissionLev}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleAdminRemove(email)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Remove
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

export default ManageInstructor;
