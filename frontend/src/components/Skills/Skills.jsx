import { useEffect, useState } from "react";
import { getSkills } from "../../services/skillService";
import {
  SiAngular,
  SiBootstrap,
  SiC,
  SiCplusplus,
  SiCss,
  SiDocker,
  SiExpress,
  SiFigma,
  SiFirebase,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiKubernetes,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPostman,
  SiPython,
  SiReact,
  SiSharp,
  SiTailwindcss,
  SiTypescript,
  SiVuedotjs,
} from "react-icons/si";
import { FaAws, FaChartBar, FaCode, FaJava, FaMicrosoft } from "react-icons/fa";

const skillIcons = {
  HTML: SiHtml5,
  CSS: SiCss,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  React: SiReact,
  "Next.js": SiNextdotjs,
  "Vue.js": SiVuedotjs,
  Angular: SiAngular,
  "Tailwind CSS": SiTailwindcss,
  Bootstrap: SiBootstrap,
  "Node.js": SiNodedotjs,
  "Express.js": SiExpress,
  MongoDB: SiMongodb,
  MySQL: SiMysql,
  PostgreSQL: SiPostgresql,
  Python: SiPython,
  Java: FaJava,
  C: SiC,
  "C++": SiCplusplus,
  "C#": SiSharp,
  Git: SiGit,
  GitHub: SiGithub,
  Postman: SiPostman,
  Docker: SiDocker,
  Kubernetes: SiKubernetes,
  AWS: FaAws,
  Azure: FaMicrosoft,
  Firebase: SiFirebase,
  "Power BI": FaChartBar,
  Figma: SiFigma,
};

const skillColors = {
  HTML: "#e34f26",
  CSS: "#1572b6",
  JavaScript: "#f7df1e",
  TypeScript: "#3178c6",
  React: "#61dafb",
  "Next.js": "#111827",
  "Vue.js": "#42b883",
  Angular: "#dd0031",
  "Tailwind CSS": "#06b6d4",
  Bootstrap: "#7952b3",
  "Node.js": "#339933",
  "Express.js": "#111827",
  MongoDB: "#47a248",
  MySQL: "#4479a1",
  PostgreSQL: "#4169e1",
  Python: "#3776ab",
  Java: "#ed8b00",
  C: "#00599c",
  "C++": "#00599c",
  "C#": "#68217a",
  Git: "#f05032",
  GitHub: "#181717",
  Postman: "#ff6c37",
  Docker: "#2496ed",
  Kubernetes: "#326ce5",
  AWS: "#ff9900",
  Azure: "#0078d4",
  Firebase: "#ffca28",
  "Power BI": "#f2c811",
  Excel: "#217346",
  Figma: "#f24e1e",
};


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
              className="skill-card bg-white rounded-xl shadow-md p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              style={{ animationDelay: `${(skills.indexOf(skill) % 8) * 90}ms` }}
            >
              {(() => {
                const SkillIcon = skillIcons[skill.name] || FaCode;

                return (
                  <div className="flex items-center justify-center w-14 h-14 mb-5 rounded-xl bg-gray-50">
                    <SkillIcon
                      size={30}
                      color={skillColors[skill.name] || "#2563eb"}
                      aria-hidden="true"
                    />
                  </div>
                );
              })()}

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
                  className="skill-progress h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-1000"
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