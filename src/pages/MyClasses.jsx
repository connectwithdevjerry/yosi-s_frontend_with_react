import { useDispatch, useSelector } from "react-redux";
import { Loader, Navbar } from "../components";
import { getAllClasses } from "../Redux/myClassSlice";
import { useEffect } from "react";
import formatDateTime from "../formatDate";
import customFetch from "../Redux/axiosObject";
import { BASE_URL, CLASSES, REMOVE_ME_FROM_CLASS, USER_ROLE } from "../paths";
import { ToastContainer } from "react-toastify";
import myAlert from "../alert";
import { Link } from "react-router";

const MyClasses = () => {
  const dispatch = useDispatch();
  const { all_classes, loading } = useSelector((state) => state.myClass);
//   const role = useSelector((state) => state.user.myRole);
  const myProfile = useSelector((state) => state.user.myProfile);

  const my_id = myProfile.aud;

  useEffect(() => {
    dispatch(getAllClasses(USER_ROLE));
  }, []);

  const myClasses = all_classes.filter((classs) =>
    classs.students.includes(my_id)
  );

  const handleRemove = (id) => {
    const url = `${BASE_URL}${REMOVE_ME_FROM_CLASS}/${id}`;
    customFetch
      .delete(url)
      .then((response) => {
        if (response?.data?.status) {
          dispatch(getAllClasses(USER_ROLE));
          myAlert(response.data.message, response?.data?.status);
          return;
        }
        myAlert(response.data.message, response?.data?.status);
      })
      .catch((error) => {
        myAlert(error.message, false);
        console.log(error);
      });
  };

  if (loading) return <Loader />;

  return (
    <>
      <Navbar />
      <div className="bg-blue-700 px-2 py-2 text-white my-2 font-bold text-lg">
        <p className="text-center">A list of classes you've signed up for</p>
      </div>
      <section className="container mx-auto px-6 py-12">
        <div className="toast-container">
          <ToastContainer limit={2} />
        </div>
        {myClasses.length === 0 && !loading && (
          <div className="text-center">
            <p>
              You haven't joined any class yet {" "}
              <Link to={CLASSES} className="text-red-600 underline italic">Check classes</Link>
            </p>
          </div>
        )}
        {myClasses.map(
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
                      Instructor: {instructor?.firstName}
                    </span>
                  </p>
                </div>
                <div className="mt-6">
                  <button
                    onClick={() => handleRemove(uniqueRouteId)}
                    className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
                  >
                    Remove Me
                  </button>
                </div>
              </div>
            </div>
          )
        )}
      </section>
    </>
  );
};

export default MyClasses;
