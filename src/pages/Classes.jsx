import { Footer, Navbar } from "../components";
import beginner from "../assets/beginner.png";
import modern from "../assets/modern.png";
import dance from "../assets/dance-hero.png";
import { Link } from "react-router-dom";
import { LEARNMORE } from "../paths";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllClasses } from "../Redux/myClassSlice";
import formatDateTime from "../formatDate";

const Classes = () => {
  const dispatch = useDispatch();

  const { all_classes, loading } = useSelector((state) => state.myClass);
  const role = useSelector((state) => state.myClass.myRole);

  useEffect(() => {
    dispatch(getAllClasses(role));
  }, []);

  console.log({ all_classes });

  return (
    <div>
      <Navbar />
      <section className="relative">
        <div className="relative">
          <img
            src={dance}
            alt="Classes Hero"
            className="w-full h-[500px] object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-5xl font-bold text-white">Our Classes</h2>
          </div>
        </div>
      </section>

      {/* <!-- Classes Overview --> */}
      <section className="container mx-auto px-6 py-16">
        <h3 className="text-4xl font-semibold text-center mb-8">
          Explore Our Classes
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* <!-- Class Card 1 --> */}
          {all_classes.map(
            ({
              title,
              description,
              classImage,
              no_of_max_signups,
              dateAndTime,
            }) => (
              <div className="bg-gray-100 rounded-lg shadow-md overflow-hidden">
                <img
                  src={classImage ? classImage : beginner}
                  alt={title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h4 className="text-2xl font-semibold mb-2">{title}</h4>
                  <p className="text-gray-600 mb-4">{description?description:"Come and Learn Dance at our studio"}</p>
                  <p className="text-red-600 mb-4"><span>scheduled for: </span><br />{formatDateTime(dateAndTime?dateAndTime:Date())}</p>
                  <Link
                    to={LEARNMORE}
                    className="text-indigo-600 font-medium hover:underline"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            )
          )}
          {/* <!-- Class Card 2 --> */}
          {/* <div className="bg-gray-100 rounded-lg shadow-md overflow-hidden">
            <img
              src={modern}
              alt="Modern Dance"
              className="w-full h-48 object-cover"
              style={{ opacity: 0.75 }}
            />
            <div className="p-6">
              <h4 className="text-2xl font-semibold mb-2">Modern Dance</h4>
              <p className="text-gray-600 mb-4">
                Express yourself with contemporary movements and creative
                routines.
              </p>
              <Link
                to={LEARNMORE}
                className="text-indigo-600 font-medium hover:underline"
              >
                Learn More
              </Link>
            </div>
          </div>
          <div className="bg-gray-100 rounded-lg shadow-md overflow-hidden">
            <img
              src="advanced.png"
              alt="Advanced Ballet"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h4 className="text-2xl font-semibold mb-2">Advanced Ballet</h4>
              <p className="text-gray-600 mb-4">
                Take your ballet skills to the next level with advanced
                techniques.
              </p>
              <Link
                to={LEARNMORE}
                className="text-indigo-600 font-medium hover:underline"
              >
                Learn More
              </Link>
            </div>
          </div> */}
          <Link
            to={LEARNMORE}
            className="text-indigo-600 font-medium hover:underline"
          >
            Load More {">>>"}
          </Link>
        </div>
      </section>

      {/* <!-- Testimonials Section --> */}
      <section className="bg-gray-50 py-10">
        <div className="container mx-auto px-6">
          <h3 className="text-4xl font-semibold text-center mb-8">
            What Our Students Say
          </h3>
          <div className="flex flex-col md:flex-row gap-8">
            {/* <!-- Testimonial 1 --> */}
            <div className="bg-white shadow-lg p-6 rounded-lg">
              <p className="text-gray-600 italic mb-4">
                "The instructors are so professional and passionate. I’ve
                learned so much!"
              </p>
              <h5 className="text-gray-800 font-semibold">- Anna M.</h5>
            </div>
            {/* <!-- Testimonial 2 --> */}
            <div className="bg-white shadow-lg p-6 rounded-lg">
              <p className="text-gray-600 italic mb-4">
                "A welcoming environment and great classes. Highly recommend!"
              </p>
              <h5 className="text-gray-800 font-semibold">- James L.</h5>
            </div>
            {/* <!-- Testimonial 3 --> */}
            <div className="bg-white shadow-lg p-6 rounded-lg">
              <p className="text-gray-600 italic mb-4">
                "The best place to learn ballet and improve your skills."
              </p>
              <h5 className="text-gray-800 font-semibold">- Emily R.</h5>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Classes;
