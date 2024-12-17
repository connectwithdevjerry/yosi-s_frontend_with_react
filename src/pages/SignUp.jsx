import { Footer, Navbar } from "../components";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { signupValidationSchema } from "../formValidation";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../Redux/userSlice";
import { SIGNIN } from "../paths";
import { ToastContainer } from "react-toastify";
import myAlert from "../alert";
import { useEffect } from "react";

const SignUp = () => {
  const initialValues = {
    email: "",
    password: "",
    cpassword: "",
    firstName: "",
    lastName: "",
  };

  const { userMessage } = useSelector((state) => ({
    userMessage: state.user.userMessage,
  }));


  useEffect(()=>{
    if(userMessage){
      myAlert(userMessage, true);
    }
  }, [userMessage])

  const dispatch = useDispatch();

  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: signupValidationSchema,
      onSubmit: (values) => {
        // console.log({ values });
        if (values.cpassword !== values.password) {
          return myAlert("Password does not match!", true);
        }

        delete values.cpassword;

        dispatch(createUser(values));
      },
    });

  return (
    <div>
      <Navbar isAuthPage={true} />
      <section className="container mx-auto px-6 py-16 flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Create Your Account
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
            {/* <!-- Password Input --> */}
            <div>
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-2"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                value={values.password}
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="********"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <div>
                {touched.password && errors.password && (
                  <span className="text-red-700 text-sm">
                    {errors.password}
                  </span>
                )}
              </div>
            </div>
            {/* <!-- Confirm Password Input --> */}
            <div>
              <label
                htmlFor="cpassword"
                className="block text-gray-700 font-medium mb-2"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="cpassword"
                name="cpassword"
                placeholder="********"
                value={values.cpassword}
                onBlur={handleBlur}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <div>
                {touched.cpassword && errors.cpassword && (
                  <span className="text-red-700 text-sm">
                    {errors.cpassword}
                  </span>
                )}
              </div>
            </div>
            {/* <!-- Submit Button --> */}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
            >
              Sign Up
            </button>
          </form>
          {/* <!-- Sign In Link --> */}
          <p className="mt-6 text-gray-600 text-center">
            Already have an account?
            <Link to={SIGNIN} className="text-indigo-600 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default SignUp;
