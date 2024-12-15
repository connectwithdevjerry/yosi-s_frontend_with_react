import { CREATE_CLASS, MANAGE_CLASSES } from "../paths";
import Transfer from "./Transfer";
import { Link } from "react-router-dom";

const EditClass = () => {
  return (
    <section className="py-8 bg-white overflow-y-scroll">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Edit Dance Classes
        </h2>
        <div className="mb-4">
          <Link
            to={MANAGE_CLASSES}
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            BACK
          </Link>
        </div>
        <form
          className="bg-gray-100 p-8 rounded-lg shadow-md"
          method="POST"
          action="/create-class"
        >
          <div className="mb-6">
            <label
              for="class-name"
              className="block text-gray-700 font-bold mb-2"
            >
              Class Name*:
            </label>
            <input
              type="text"
              id="class-name"
              name="class_name"
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Enter class name"
            />
          </div>
          <div className="mb-6">
            <label
              for="instructor"
              className="block text-gray-700 font-bold mb-2"
            >
              Class Image:
            </label>
            <input
              type="file"
              id="instructor"
              name="instructor"
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Enter instructor name"
            />
            <Transfer />
          </div>
          <div className="mb-6">
            <label
              for="schedule"
              className="block text-gray-700 font-bold mb-2"
            >
              Schedule:
            </label>
            <input
              type="datetime-local"
              id="schedule"
              name="schedule"
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Enter schedule (e.g., Mon & Wed 5-7 PM)"
            />

            <Transfer />
          </div>
          <div className="mb-6">
            <label
              for="schedule"
              className="block text-gray-700 font-bold mb-2"
            >
              No of Students:
            </label>
            <input
              type="number"
              id="schedule"
              name="schedule"
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="24"
            />
            <Transfer />
          </div>
          <div className="mb-6">
            <label
              for="schedule"
              className="block text-gray-700 font-bold mb-2"
            >
              Location:
            </label>
            <input
              type="text"
              id="schedule"
              name="schedule"
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Pirouette Studio, 123 Dance Lane, London"
            />
            <Transfer />
          </div>
          <div className="mb-6">
            <label
              for="description"
              className="block text-gray-700 font-bold mb-2"
            >
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              className="w-full p-3 border border-gray-300 rounded-md"
              rows="5"
              placeholder="Enter class description (not more than 100 characters)"
            ></textarea>
            <Transfer />
          </div>
          <div className="mb-6">
            <label for="level" className="block text-gray-700 font-bold mb-2">
              Instructor Name:
            </label>
            <select
              id="level"
              name="level"
              className="w-full p-3 border border-gray-300 rounded-md"
            >
              <option value="beginner">Adedeji</option>
              <option value="intermediate">Obaloluwa</option>
              <option value="advanced">David</option>
            </select>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-pink-600 text-white py-3 px-6 rounded-md hover:bg-pink-700"
            >
              Update Class
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditClass;
