import { useNavigate, useParams } from "react-router";
import { resetPasswordSchema } from "../formValidation";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../Redux/userSlice";
import { useEffect, useState } from "react";
import { clearUserMsg } from "../Redux/userSlice";
import myAlert from "../alert";

const ResetPassword = () => {
  const params = useParams();
  const navigate = useNavigate();
  const token = params.token;
  const dispatch = useDispatch();
  const userMessage = useSelector((state) => state.user.userMessage);
  const alertError = useSelector((state) => state.user.alertError);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userMessage) {
      myAlert(userMessage, alertError);
    }
  }, [token, navigate]);

  const initialValues = {
    newPassword: "",
    cnewPassword: "",
  };

  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: resetPasswordSchema,
      onSubmit: (values) => {
        setLoading(true);
        if (values.newPassword !== values.cnewPassword) {
          alert("Passwords do not match!");
          setLoading(false);
          return;
        }
        dispatch(resetPassword({ ...values, token }));
        setTimeout(() => {
          navigate("/signin");
          dispatch(clearUserMsg());
        }, 3000);
        setLoading(false);
      },
    });

  return (
    <section>
      {userMessage && (
        <div className="bg-indigo-900 text-center py-4 lg:px-4">
          <div
            className="p-2 bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex"
            role="alert"
          >
            <span className="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">
              Info
            </span>
            <span className="font-semibold mr-2 text-left flex-auto">
              {userMessage}
            </span>
          </div>
        </div>
      )}
      <div className="bg-white relative items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-20 max-w-7xl">
        <div className="w-full max-w-md mx-auto md:max-w-sm md:px-0 md:w-96 sm:px-4">
          <div className="flex flex-col">
            <div>
              <h2 className="text-4xl text-black">Reset password</h2>
            </div>
          </div>
          <form onSubmit={handleSubmit} method="post">
            <div className="mt-4 space-y-6">
              <div className="col-span-full">
                <label className="block mb-3 text-sm font-medium text-gray-600">
                  {" "}
                  Password{" "}
                </label>
                <input
                  type="password"
                  placeholder="******"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.newPassword}
                  name="newPassword"
                  className="block w-full px-6 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                />
                {touched.newPassword && errors.newPassword && (
                  <div className="text-red-500 text-xs italic">
                    {errors.newPassword}
                  </div>
                )}
              </div>
              <div className="col-span-full">
                <label className="block mb-3 text-sm font-medium text-gray-600">
                  {" "}
                  Confirm passord{" "}
                </label>
                <input
                  type="password"
                  placeholder="******"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.cnewPassword}
                  name="cnewPassword"
                  className="block w-full px-6 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                />
                {touched.cnewPassword && errors.cnewPassword && (
                  <div className="text-red-500 text-xs italic">
                    {errors.cnewPassword}
                  </div>
                )}
              </div>

              <div className="col-span-full">
                <button
                  type="submit"
                  disabled={loading ? true : false}
                  className="items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200 bg-black border-2 border-black rounded-full nline-flex hover:bg-transparent hover:border-black hover:text-black focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black"
                >
                  {loading ? "Loading..." : "Submit your request"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
