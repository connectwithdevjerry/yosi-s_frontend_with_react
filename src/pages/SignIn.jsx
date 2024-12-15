import { Footer, Navbar } from "../components";
import { Link } from "react-router-dom";
import { SIGNUP, FORGOT_PASSWORD, USER_ROLE, ADMIN, LEARNMORE } from "../paths";
import { useDispatch, useSelector } from "react-redux";
import { signInValidationSchema } from "../formValidation";
import { useFormik } from "formik";
import { getUser } from "../Redux/userSlice";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import myAlert from "../alert";
import { ToastContainer } from "react-toastify";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuth = useSelector((state) => state.user.isAuth);
  const loading = useSelector((state) => state.user.loading);
  const myRole = useSelector((state) => state.user.myRole);
  const userMessage = useSelector((state) => state.user.userMessage);
  const alertError = useSelector((state) => state.user.alertError);

  useEffect(() => {
    if (userMessage) {
      myAlert(userMessage, alertError);
    }
  }, [userMessage]);

  useEffect(() => {
    if (isAuth) {
      console.log("signin", myRole)
      return myRole !== USER_ROLE ? navigate(ADMIN) : navigate(LEARNMORE);
    }
  }, [isAuth]);

  const { values, touched, errors, handleSubmit, handleBlur, handleChange } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: signInValidationSchema,
      onSubmit: async (values) => {
        console.log("Form submitted:", values);

        dispatch(getUser(values));

        // if (isAuth) {
        //   navigate("/");
        // } else {
        //   console.log({ userMessage });
        //   return;
        // }
      },
    });

  return (
    <div>
      <Navbar isAuthPage={true} />
      <section className="bg-gray-100 flex items-center justify-center py-24">
        {/* <!-- Sign In Container --> */}
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <div className="toast-container">
            <ToastContainer limit={2} />
          </div>
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Sign In
          </h2>
          <form method="POST" onSubmit={handleSubmit} className="space-y-4">
            {/* <!-- Email Field --> */}
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleChange}
                value={values.email}
                onBlur={handleBlur}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Enter your email"
              />
              {touched.email && errors.email && (
                <p className="text-xs text-red-500">{errors.email}</p>
              )}
            </div>
            {/* <!-- Password Field --> */}
            <div>
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={handleChange}
                value={values.password}
                onBlur={handleBlur}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Enter your password"
              />
              {touched.password && errors.password && (
                <p className="text-xs text-red-500">{errors.password}</p>
              )}
            </div>
            {/* <!-- Forgot Password --> */}
            <div className="text-right">
              <Link
                to={FORGOT_PASSWORD}
                className="text-indigo-600 hover:underline text-sm"
              >
                Forgot Password?
              </Link>
            </div>
            {/* <!-- Sign In Button --> */}
            <button
              type="submit"
              disabled={loading ? true : false}
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Sign In
            </button>
          </form>
          {/* <!-- Sign Up Link --> */}
          <p className="text-center text-gray-600 mt-6">
            Don't have an account?
            <Link
              to={SIGNUP}
              className="text-indigo-600 hover:underline font-medium"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default SignIn;
