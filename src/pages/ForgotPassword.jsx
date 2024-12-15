import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import customFetch from "../Redux/axiosObject";
import { useNavigate } from "react-router-dom";
import { BACK_FORGOT } from "../paths";
import myAlert from "../alert";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const initialValues = {
    email: "",
  };
  const validationSchema = yup.object({
    email: yup.string().email().required("Email is required"),
  });
  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: (values) => {
        customFetch
          .post(BACK_FORGOT, values)
          .then((res) => {
            console.log(res.data);
            if (res.data.status)
              return navigate(`/resetlinksent/${values.email}`);
          })
          .catch((err) => {
            myAlert(err.message, true);
            console.log(err);
          });
      },
    });
  return (
    <section>
      <div className="flex bg-white items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-8">
        <div className="xl:mx-auto xl:w-full shadow-md p-4 xl:max-w-sm 2xl:max-w-md">
          <div className="mb-2 flex justify-center"></div>
          <h2 className="text-center text-2xl font-bold leading-tight text-black">
            Let's fix your password
          </h2>
          <form className="mt-8" method="POST" onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div>
                <label className="text-base font-medium text-gray-900">
                  Enter Email address
                </label>
                <div className="mt-2">
                  <input
                    placeholder="Email"
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                {touched.email && errors.email && (
                  <div className="text-sm text-red-500">{errors.email}</div>
                )}
              </div>

              <div>
                <button
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  type="submit"
                >
                  Get Reset Link
                </button>
              </div>
              <div className="flex items-center space-x-3">
                <Link
                  to="/signin"
                  className="text-sm font-medium text-gray-600 hover:text-gray-900"
                >
                  Not supposed to be here? Back to Sign In
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
