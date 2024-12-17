import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { BASE_URL, GET_CLASSES_ADMIN, MANAGE_CLASSES } from "../paths";
import Papa from "papaparse";
import myAlert from "../alert";
import { ToastContainer } from "react-toastify";
import customFetch from "../Redux/axiosObject";
import { useEffect, useState } from "react";
import Loader from "./Loader";

const CheckSignups = () => {
  const params = useParams();
  const id = params.id;
  const [signups, setSignups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = `${BASE_URL}${GET_CLASSES_ADMIN}`;
    customFetch.get(url).then((response) => {
      if (response.data.status) {
        setSignups(response.data.data);
        setLoading(false)
        return;
      }
      return myAlert(response.data.message, true);
    });
  }, []);

  const current_class = signups.filter((cclass) => cclass.uniqueRouteId === id);

  const students = current_class[0]?.students;
  const title = current_class[0]?.title;

  const exportToCSV = (data, fileName) => {
    try {
      const csv = Papa.unparse(data); // Convert JSON to CSV
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Error generating CSV:", err);
      myAlert("Error generating CSV", true);
    }
  };

  return (
    <div className="mx-auto bg-white shadow-md rounded-lg p-6">
      <div className="container">
        <ToastContainer limit={2} />
      </div>
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
        {title ? `${title} Class Signups` : "Class List"}
      </h1>
      <div className="mb-4 w-full flex justify-between">
        <div>
          <Link
            to={MANAGE_CLASSES}
            class="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
          >
            BACK
          </Link>
        </div>
        <div>
          <button
            onClick={() => exportToCSV(students, `${id}.csv`)}
            class="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
          >
            Download CSV
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200 mt-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 py-2 px-4 text-left">
                S/N
              </th>
              <th className="border border-gray-300 py-2 px-4 text-left">
                First Name
              </th>
              <th className="border border-gray-300 py-2 px-4 text-left">
                Last Name
              </th>
              <th className="border border-gray-300 py-2 px-4 text-left">
                Email
              </th>
            </tr>
          </thead>
          {loading && (
            <div className="w-full flex justify-center mt-[120px]">
              <Loader />
            </div>
          )}
          {!students?.length && !loading && (
            <div className="w-full flex justify-center mt-[120px]">
              <span className="text-center">No Items Found</span>
            </div>
          )}
          <tbody>
            {students?.map((student, ind) => (
              <tr key={student._id}>
                <td className="border border-gray-300 py-2 px-4">{ind + 1}</td>
                <td className="border border-gray-300 py-2 px-4">
                  {student.firstName}
                </td>
                <td className="border border-gray-300 py-2 px-4">
                  {student.lastName}
                </td>
                <td className="border border-gray-300 py-2 px-4">
                  {student.email}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CheckSignups;
