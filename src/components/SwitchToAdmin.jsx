import { Link } from "react-router-dom";
import {
  ADMIN_ROLE,
  AUTHORIZE,
  BASE_URL,
  GET_USERS,
  INSTRUCTOR_ROLE,
  MANAGE_INSTRUCTORS,
  USER_ROLE,
} from "../paths";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import customFetch from "../Redux/axiosObject";
import myAlert from "../alert";

const SwitchToAdmin = () => {
  const permissions = [ADMIN_ROLE, INSTRUCTOR_ROLE];
  const [values, setValues] = useState({
    email: "",
    permission_type: USER_ROLE,
  });

  const handleChangeRole = (values) => {
    console.log({ values });
    customFetch
      .put(`${BASE_URL}${AUTHORIZE}`, values)
      .then((res) => {
        console.log({ chc: res?.data });
        setValues({
          email: "",
          permission_type: USER_ROLE,
        });
        myAlert(res?.data?.message, !res?.data?.status);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="toast-container">
          <ToastContainer limit={2} />
        </div>
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
            Enter Email Address of the Registered User
          </label>
          <input
            type="email"
            id="email"
            value={values.email}
            required
            onChange={(e) => setValues({ email: e.target.value })}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="users"
            className="block text-sm font-medium text-gray-700"
          >
            Select Permission Type
          </label>
          <select
            id="permission_type"
            value={values.permission_type}
            onChange={(e) =>
              setValues({ ...values, permission_type: e.target.value })
            }
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value={USER_ROLE}>Choose Option</option>
            <option value={ADMIN_ROLE}>Admin</option>
            <option value={INSTRUCTOR_ROLE}>Instructor</option>
          </select>
        </div>

        <button
          onClick={() => handleChangeRole(values)}
          className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
        >
          Switch User
        </button>
      </div>
    </div>
  );
};

export default SwitchToAdmin;
