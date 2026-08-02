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
    <section
      id="skills"
      className="py-20 bg-gray-100"
    >
      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-4">
          My Skills
        </h2>

        <p className="text-center text-gray-500 mb-12">
          Technologies I use to build modern web applications.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {skills.map((skill) => (
            <div
              key={skill._id}
              className="bg-white rounded-xl shadow-md p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Skill Name */}
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">
                  {skill.name}
                </h3>

                <span className="text-blue-600 font-bold text-sm">
                  {skill.percentage}%
                </span>
              </div>

              {/* Category */}
              <p className="text-sm text-gray-500 mb-3">
                {skill.category}
              </p>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                <div
                  className="h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-1000"
                  style={{
                    width: `${skill.percentage}%`,
                  }}
                ></div>
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Skills;