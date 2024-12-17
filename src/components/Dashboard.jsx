import { Link, useNavigate } from "react-router-dom";
import { BASE_URL, CLASSES, GET_USERS } from "../paths";
import { useEffect, useState } from "react";
import customFetch from "../Redux/axiosObject";
import Loader from "./Loader";
import formatDateTime from "../formatDate";
const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    customFetch
      .get(`${BASE_URL}${GET_USERS}`)
      .then((res) => {
        setUsers(res.data.data);
      })
      .catch((err) => {});
  }, []);

  const activeUsers = users.filter((user) => user.isActive === true);
  const notActiveUsers = users.filter((user) => user.isActive === false);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = CLASSES;
  };

  return (
    <>
      <header className="flex justify-between items-center mb-8 py-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Welcome, Admin!</h2>
          <Link to={CLASSES} target="_blank" className="text-pink-900 underline italic">
            Go to Classes
          </Link>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Log Out
        </button>
      </header>

      {!users.length && (
        <div className="flex justify-center mt-[120px]">
          <Loader />
        </div>
      )}

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-700">Total Users</h3>
          <p className="text-3xl font-bold mt-2">{users.length}</p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-700">Active Classes</h3>
          <p className="text-3xl font-bold mt-2">{activeUsers.length}</p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-700">
            Pending Sign-Ups
          </h3>
          <p className="text-3xl font-bold mt-2">{notActiveUsers.length}</p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-700">
            Feedback Received
          </h3>
          <p className="text-3xl font-bold mt-2">120</p>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-bold mb-4">Recent Sign-Ups</h3>
        <div className="bg-white shadow rounded-lg p-6">
          <table className="w-full text-gray-600">
            <thead>
              <tr>
                <th className="border-b p-3 text-left">Name</th>
                <th className="border-b p-3 text-left">Email</th>
                <th className="border-b p-3 text-left">Date SignedUp</th>
                <th className="border-b p-3 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {users.map(({ _id, firstName, dateCreated, lastName, email, isActive }) => (
                <tr key={_id}>
                  <td className="p-3 border-b">
                    {firstName} {lastName}
                  </td>
                  <td className="p-3 border-b">{email}</td>
                  <td className="p-3 border-b">{formatDateTime(dateCreated, true)}</td>
                  <td className="p-3 border-b text-green-600">
                    {isActive ? "active" : "pending"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
