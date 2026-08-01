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
    <section id="experience" className="py-20 bg-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-10">
          Experience
        </h2>

        <div className="space-y-6">
          {experiences.map((exp) => (
            <div
              key={exp._id}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <h3 className="text-2xl font-semibold">
                {exp.role}
              </h3>

              <p className="text-blue-600 font-medium">
                {exp.company}
              </p>

              <p className="text-gray-500 mb-3">
                {exp.duration}
              </p>

              <p className="text-gray-700">
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;