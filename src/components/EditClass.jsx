import { useEffect, useState } from "react";
import {
  BACK_GET_CLASS,
  BACK_UPDATE_CLASS,
  BASE_URL,
  CREATE_CLASS,
  GET_USERS,
  INSTRUCTOR_ROLE,
  MANAGE_CLASSES,
} from "../paths";
import Transfer from "./Transfer";
import { Link, useNavigate, useParams } from "react-router-dom";
import customFetch from "../Redux/axiosObject";
import myAlert from "../alert";
import { ToastContainer } from "react-toastify";
import { useFormik } from "formik";
import {
  CreateClassValidationSchema,
  updateClassValidationSchema,
} from "../formValidation";

const EditClass = () => {
  const params = useParams();
  const navigate = useNavigate();
  const uniqueRouteId = params.id;
  const [myClass, setMyClass] = useState({});
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const url = `${BASE_URL}${BACK_GET_CLASS}/${uniqueRouteId}`;
    customFetch
      .get(url)
      .then((res) => {
        if (res.data.status) {
          setMyClass(res.data.data);
        }
        return myAlert(res.data.message, true);
      })
      .catch((err) => {
        return myAlert(err.message, true);
      });
  }, []);

  useEffect(() => {
    customFetch
      .get(`${BASE_URL}${GET_USERS}`)
      .then((res) => {
        setUsers(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const instructors = users?.filter(
    (user) => user.permissionLev === INSTRUCTOR_ROLE
  );

  const { values, errors, touched, handleBlur, handleSubmit, handleChange } =
    useFormik({
      initialValues: {
        description: myClass.description,
        dateAndTime: myClass.dateAndTime,
        venue: myClass.venue,
        ageMin: myClass.ageMin,
        ageMax: myClass.ageMax,
        style: myClass.style,
        no_of_max_signups: myClass.no_of_max_signups,
        update_no_of_max_signups:
          myClass?.toBeUpdatedByInstructor?.no_of_max_signups,
        update_style: myClass?.toBeUpdatedByInstructor?.style,
        updateDescription: myClass?.toBeUpdatedByInstructor?.description,
        udateDateAndTime: myClass?.toBeUpdatedByInstructor?.dateAndTime,
        updateAgeGroup: myClass?.toBeUpdatedByInstructor?.ageGroup,
        updateVenue: myClass?.toBeUpdatedByInstructor?.venue,
      },
      enableReinitialize: true,
      validationSchema: updateClassValidationSchema,

      onSubmit: (values) => {
        const finalValues = {
          ...values,
          published:
            !values.update_no_of_max_signups &&
            !values.update_style &&
            !values.updateDescription &&
            !values.udateDateAndTime &&
            !values.updateAgeGroup &&
            !values.updateVenue,
        };

        const url = `${BASE_URL}${BACK_UPDATE_CLASS}/${uniqueRouteId}`;

        customFetch
          .put(url, finalValues)
          .then((res) => {
            if (res.data.status) {
              myAlert(res.data.message, false);
              navigate(MANAGE_CLASSES);
            }
            return myAlert(res.data.message, true);
          })
          .catch((err) => {
            console.log(err);
            myAlert("Failed to create class!", true);
          });
      },
    });

  // console.log({ values });

  const decide_save_or_publish =
    !values.update_no_of_max_signups &&
    !values.update_style &&
    !values.updateDescription &&
    !values.udateDateAndTime &&
    !values.updateAgeGroup &&
    !values.updateVenue;

  return (
    <section className="py-8 bg-white overflow-y-scroll">
      <div className="container mx-auto max-w-4xl">
        <div className="toast-container">
          <ToastContainer limit={2} />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Edit Dance Classes
        </h2>
        <div className="mb-4">
          <Link
            to={MANAGE_CLASSES}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            BACK
          </Link>
        </div>
        <form
          className="bg-gray-100 p-8 rounded-lg shadow-md"
          method="POST"
          onSubmit={handleSubmit}
        >
          <div className="mb-6">
            <label
              htmlFor="style"
              className="block text-gray-700 font-bold mb-2"
            >
              Dance Style:
            </label>
            <input
              type="text"
              id="style"
              name="style"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.style}
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Enter Dance Style"
            />
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="update_style"
                id="update_style"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.update_style}
                className="w-4 h-4 text-pink-500 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-gray-700 text-sm">
                Transfer to Instructor
              </span>
            </label>
          </div>
          <div className="mb-6">
            <label
              htmlFor="class-name"
              className="block text-gray-700 font-bold mb-2"
            >
              Age group:
            </label>
            <div className="flex items-center gap-4">
              <input
                type="number"
                min={1}
                id="ageMin"
                name="ageMin"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.ageMin}
                className="w-full p-3 border border-gray-300 rounded-md"
                placeholder="Enter Mininum Age"
              />
              <span className="text-gray-700">to</span>
              <input
                type="number"
                min={2}
                id="ageMax"
                name="ageMax"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.ageMax}
                className="w-full p-3 border border-gray-300 rounded-md"
                placeholder="Enter Maximum Age"
              />
            </div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="updateAgeGroup"
                id="updateAgeGroup"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.updateAgeGroup}
                className="w-4 h-4 text-pink-500 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-gray-700 text-sm">
                Transfer to Instructor
              </span>
            </label>
          </div>
          <div className="mb-6">
            <label
              htmlFor="schedule"
              className="block text-gray-700 font-bold mb-2"
            >
              Schedule:
            </label>
            <input
              type="datetime-local"
              id="dateAndTime"
              name="dateAndTime"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.dateAndTime}
              className="w-full p-3 border border-gray-300 rounded-md"
            />

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="udateDateAndTime"
                name="udateDateAndTime"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.udateDateAndTime}
                className="w-4 h-4 text-pink-500 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-gray-700 text-sm">
                Transfer to Instructor
              </span>
            </label>
          </div>
          <div className="mb-6">
            <label
              htmlFor="schedule"
              className="block text-gray-700 font-bold mb-2"
            >
              Max No of Students:
            </label>
            <input
              type="number"
              id="no_of_max_signups"
              name="no_of_max_signups"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.no_of_max_signups}
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="24"
            />
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="update_no_of_max_signups"
                name="update_no_of_max_signups"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.update_no_of_max_signups}
                className="w-4 h-4 text-pink-500 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-gray-700 text-sm">
                Transfer to Instructor
              </span>
            </label>
          </div>
          <div className="mb-6">
            <label
              htmlFor="schedule"
              className="block text-gray-700 font-bold mb-2"
            >
              Location:
            </label>
            <input
              type="text"
              id="venue"
              name="venue"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.venue}
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Pirouette Studio, 123 Dance Lane, London"
            />
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="updateVenue"
                name="updateVenue"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.updateVenue}
                className="w-4 h-4 text-pink-500 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-gray-700 text-sm">
                Transfer to Instructor
              </span>
            </label>
          </div>
          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-gray-700 font-bold mb-2"
            >
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.description}
              className="w-full p-3 border border-gray-300 rounded-md"
              rows="5"
              placeholder="Enter class description (not more than 100 characters)"
            ></textarea>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="updateDescription"
                name="updateDescription"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.updateDescription}
                className="w-4 h-4 text-pink-500 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-gray-700 text-sm">
                Transfer to Instructor
              </span>
            </label>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-pink-600 text-white py-3 px-6 rounded-md hover:bg-pink-700"
            >
              {decide_save_or_publish ? "publish my form" : "save as draft"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditClass;
