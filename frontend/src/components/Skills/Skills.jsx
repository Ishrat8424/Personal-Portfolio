import { useEffect, useState } from "react";
import { getSkills } from "../../services/skillService";

function Skills() {
  const [skills, setSkills] = useState([]);

  const fetchSkills = async () => {
    try {
      const data = await getSkills();
      setSkills(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  return (
    <section id="skills" className="py-20 bg-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">
          My Skills
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {skills.map((skill) => (
            <div
              key={skill._id}
              className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition"
            >
              <h3 className="text-lg font-bold text-center">
                {skill.name}
              </h3>

              <p className="text-center text-gray-500 mb-3">
                {skill.category}
              </p>

              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${skill.percentage}%` }}
                ></div>
              </div>

              <p className="text-right text-sm mt-2 font-semibold">
                {skill.percentage}%
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;