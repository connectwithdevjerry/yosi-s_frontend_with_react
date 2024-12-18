import { Footer, Navbar } from "../components";
import { Link, useParams } from "react-router-dom";
import { useFormik } from "formik";
import {
  signupValidationSchema,
  studentRegValidationSchema,
} from "../formValidation";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../Redux/userSlice";
import { BASE_URL, MANAGE_CLASSES, SIGNIN } from "../paths";
import { ToastContainer } from "react-toastify";
import myAlert from "../alert";
import { useEffect } from "react";
import customFetch from "../Redux/axiosObject";

const StudentReg = () => {
  const initialValues = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  };

  const { userMessage } = useSelector((state) => ({
    userMessage: state.user.userMessage,
  }));

  const params = useParams();
  const id = params.id;

  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: studentRegValidationSchema,
      onSubmit: (values) => {
        const finalValues = { ...values, password: values.firstName };

        console.log({ finalValues });

        customFetch
          .post(`${BASE_URL}${STUDENT_REG_BY_ADMIN}/${id}`, finalValues)
          .then((response) => {})
          .catch((err) => {});
      },
    });

  return (
    <div>
      <section className="container mx-auto px-6 py-16 flex flex-col items-center">
        <div className="mb-12">
          <Link
            to={MANAGE_CLASSES}
            className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
          >
            BACK
          </Link>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Provide Student Details
          </h2>
          <div className="toast-container">
            <ToastContainer limit={2} />
          </div>
          <form method="POST" className="space-y-6" onSubmit={handleSubmit}>
            {/* <!-- Name Input --> */}
            <div>
              <label
                htmlFor="name"
                className="block text-gray-700 font-medium mb-2"
              >
                First Name
              </label>
              <input
                placeholder="First Name"
                type="text"
                name="firstName"
                onChange={handleChange}
                value={values.firstName}
                onBlur={handleBlur}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <div>
                {touched.firstName && errors.firstName && (
                  <span className="text-red-700 text-sm">
                    {errors.firstName}
                  </span>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="name"
                className="block text-gray-700 font-medium mb-2"
              >
                Last Name
              </label>
              <input
                placeholder="Last Name"
                name="lastName"
                type="text"
                onChange={handleChange}
                value={values.lastName}
                onBlur={handleBlur}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <div>
                {touched.lastName && errors.lastName && (
                  <span className="text-red-700 text-sm">
                    {errors.lastName}
                  </span>
                )}
              </div>
            </div>
            {/* <!-- Email Input --> */}
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                Email Address
              </label>
              <input
                placeholder="Email"
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <div>
                {touched.email && errors.email && (
                  <span className="text-red-700 text-sm">{errors.email}</span>
                )}
              </div>
            </div>
            {/* <!-- Submit Button --> */}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
            >
              Register Student for this class
            </button>
          </form>
          {/* <!-- Sign In Link --> */}
          <p className="mt-6 text-gray-600 text-center">
            Students can login on this platform with their first name as
            password
          </p>
        </div>
      </section>
    </div>
  );
};

export default StudentReg;
