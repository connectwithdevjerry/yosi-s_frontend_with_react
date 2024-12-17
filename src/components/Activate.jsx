import axios from "axios";
import { Link, useNavigate, useParams } from "react-router";
import { BACK_ACTIVATE, BASE_URL, FORGOT_PASSWORD, SIGNIN } from "../paths";
import { ToastContainer } from "react-toastify";
import myAlert from "../alert";

const Activate = () => {
  const params = useParams();
  const token = params.token;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.get(`${BASE_URL}${BACK_ACTIVATE}/${token}`).then((res) => {
      console.log("data", res?.data);
      if (!res?.data?.status)
        return myAlert("Token Expired or token does not exist!", true);
      myAlert("Your account has been activated!");
      return navigate(SIGNIN);
    });
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="toast-container">
        <ToastContainer limit={2} />
      </div>
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Activate Your Account
          </h1>
          <p className="text-gray-600 mb-6">
            Click the <b>Activate</b> Button below
          </p>
        </div>

        {/* <!-- Form --> */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              for="activation-code"
              className="block text-gray-700 font-medium mb-2"
            >
              Activation Code
            </label>
            <input
              type="text"
              id="activation-code"
              value={token}
              disabled
              placeholder="Enter your activation code"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          >
            Activate
          </button>
        </form>

        {/* <!-- Footer --> */}
        <div className="text-center mt-6">
          <p className="text-red-600 text-sm underline italic">
            <Link to={FORGOT_PASSWORD}>
              Token Expired? It can be fixed by changing password.
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Activate;
