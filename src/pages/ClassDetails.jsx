import { Footer, Navbar } from "../components";
import { Link } from "react-router-dom";
import beginner from "../assets/beginner.png";
import { useEffect } from "react";
import { getAllClasses } from "../Redux/myClassSlice";
import { useDispatch, useSelector } from "react-redux";
import formatDateTime from "../formatDate";
import customFetch from "../Redux/axiosObject";
import { BASE_URL, JOIN_CLASS } from "../paths";
import myAlert from "../alert";
import { ToastContainer } from "react-toastify";

const ClassDetails = () => {
  const dispatch = useDispatch();

  const { all_classes, loading } = useSelector((state) => state.myClass);
  const role = useSelector((state) => state.myClass.myRole);

  useEffect(() => {
    dispatch(getAllClasses(role));
  }, []);

  const handleJoin = (id) => {
    // Add logic to join the class
    customFetch
      .put(`${BASE_URL}${JOIN_CLASS}/${id}`)
      .then((res) => {
        myAlert(res.data.message, !res.data.status);
      })
      .catch((err) => {
        console.log(err);
        myAlert(err.message, true);
      });
  };

  return (
    <div>
      <Navbar />
      <section className="container mx-auto px-6 py-16 pt-8">
        <ToastContainer limit={2} />
        {all_classes.map(
          ({
            title,
            description,
            classImage,
            no_of_max_signups,
            dateAndTime,
            ageMin,
            ageMax,
            venue,
            style,
            no_of_current_signups,
            uniqueRouteId,
          }) => (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div>
                <img
                  src={classImage ? classImage : beginner}
                  alt="Dance Class"
                  className="w-full h-[400px] object-cover rounded-lg shadow-md"
                />
              </div>
              <div>
                <h2 className="text-4xl font-bold mb-4">{title}</h2>
                <p className="text-gray-600 mb-6">
                  {description
                    ? description
                    : "Come and Learn Dance at our studio"}
                </p>
                <div className="space-y-4">
                  <p>
                    <span className="font-semibold text-gray-800">Style:</span>{" "}
                    {style ? style : "Ballet"}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-800">
                      Age Group:
                    </span>{" "}
                    {ageMin ? ageMin : 6} - {ageMax ? ageMax : 12} years
                  </p>
                  <p>
                    <span className="font-semibold text-gray-800">
                      Location:
                    </span>{" "}
                    {venue ? venue : "Pirouette Studio, 123 Dance Lane, London"}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-800">Time:</span>{" "}
                    {formatDateTime(dateAndTime ? dateAndTime : Date())}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-800">
                      Number of People:{" "}
                      {no_of_max_signups ? no_of_max_signups : 0}
                    </span>
                  </p>
                  <p>
                    <span className="font-semibold text-gray-800">
                      Slots Left:
                    </span>
                    <span className="text-red-500">
                      {" "}
                      {no_of_max_signups - no_of_current_signups} Slots
                      Remaining
                    </span>
                  </p>
                </div>
                <div className="mt-6">
                  <button
                    onClick={() => handleJoin(uniqueRouteId)}
                    className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
                  >
                    Join Now
                  </button>
                </div>
              </div>
            </div>
          )
        )}
      </section>
      <Footer />
    </div>
  );
};

export default ClassDetails;
