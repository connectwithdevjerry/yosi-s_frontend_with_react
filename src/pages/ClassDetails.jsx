import { Footer, Navbar } from "../components";
import { Link } from "react-router-dom";
import beginner from "../assets/beginner.png";
import { useEffect, useState } from "react";
import { getAllClasses, getFilteredClasses } from "../Redux/myClassSlice";
import { useDispatch, useSelector } from "react-redux";
import formatDateTime from "../formatDate";
import customFetch from "../Redux/axiosObject";
import { BASE_URL, JOIN_CLASS, USER_ROLE } from "../paths";
import myAlert from "../alert";
import { ToastContainer } from "react-toastify";

const ClassDetails = () => {
  const dispatch = useDispatch();
  let options = [];

  const { all_classes, myFilteredClasses, loading } = useSelector(
    (state) => state.myClass
  );
  const [age, setAge] = useState({ ageMin: "0", ageMax: "0" });

  useEffect(() => {
    dispatch(getFilteredClasses(age));
    dispatch(getAllClasses(USER_ROLE));
  }, [age]);

  const handleJoin = (id) => {
    // Add logic to join the class
    const quota = prompt(
      "Please Enter the Quota Number to Reserve For your Team!"
    );

    if (!quota) return;
    if (!Number(quota)) return myAlert("Quota must be a number", true);

    customFetch
      .put(`${BASE_URL}${JOIN_CLASS}/${id}`, {
        quota: Number(quota),
      })
      .then((response) => {
        if (response.data.status) {
          return myAlert(response.data.message, !response.data.status);
        } else {
          return myAlert(response.data.message, !response.data.status);
        }
      })
      .catch((err) => {
        console.log(err);
        return myAlert(err.message, true);
      });
  };

  const handleFilter = (e) => {
    const val = e.target.value.split("-");

    setAge({ ageMin: Number(val[0]), ageMax: Number(val[1]) });
  };

  return (
    <div>
      <Navbar />
      <section className="container mx-auto px-6 py-16 pt-8">
        <div class="bg-white shadow rounded-lg p-5 mb-6">
          <h2 class="text-xl font-semibold mb-4">Filter by Age Range</h2>
          <div className="toast-container">
            <ToastContainer limit={2} />
          </div>
          <form id="filterForm" class="flex items-center space-x-4">
            <label class="flex items-center space-x-4">
              <p>Select Age Group</p>
              <select
                onChange={handleFilter}
                class="border border-gray-300 rounded p-2 px-4 w-40"
              >
                <option value="0-0">All Age Group</option>

                {all_classes.map((myclass) => {
                  let c = `${myclass.ageMin}-${myclass.ageMax}`;
                  if (options.includes(c)) return;

                  options.push(c);

                  return (
                    <option value={`${myclass.ageMin}-${myclass.ageMax}`}>
                      {myclass.ageMin}-{myclass.ageMax}
                    </option>
                  );
                })}
              </select>
            </label>
          </form>
        </div>

        {myFilteredClasses.map(
          ({
            _id,
            title,
            description,
            classImage,
            no_of_max_signups,
            dateAndTime,
            ageMin,
            ageMax,
            venue,
            style,
            instructor,
            no_of_current_signups,
            uniqueRouteId,
          }) => (
            <div
              key={_id}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
            >
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
                      Instructor: {instructor?.firstName}
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
