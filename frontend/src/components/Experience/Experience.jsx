import { useEffect, useState } from "react";
import API from "../../services/api";

function Experience() {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const res = await API.get("/experience");
      setExperiences(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section
      id="experience"
      className="py-20 bg-gradient-to-b from-gray-100 to-white scroll-mt-24"
    >
      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
          Experience
        </h2>

        <p className="text-center text-gray-500 mb-14">
          My professional journey and learning experiences.
        </p>

        <div className="relative">

          {/* Vertical Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 h-full w-1 bg-blue-500 transform md:-translate-x-1/2"></div>

          {experiences.map((exp, index) => (

            <div
              key={exp._id}
              className={`mb-12 flex items-center w-full ${
                index % 2 === 0
                  ? "md:flex-row"
                  : "md:flex-row-reverse"
              }`}
            >

              {/* Card */}
              <div className="w-full md:w-1/2 px-10">

                <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl hover:-translate-y-1 transition duration-300">

                  <h3 className="text-2xl font-bold text-gray-800">
                    {exp.role}
                  </h3>

                  <p className="text-blue-600 font-semibold mt-1">
                    {exp.company}
                  </p>

                  <span className="inline-block mt-3 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                    {exp.duration}
                  </span>

                  <p className="text-gray-600 mt-4 leading-7">
                    {exp.description}
                  </p>

                </div>

              </div>

              {/* Timeline Dot */}
              <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 bg-blue-600 border-4 border-white rounded-full shadow-lg"></div>

              {/* Empty Space */}
              <div className="hidden md:block w-1/2"></div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default Experience;