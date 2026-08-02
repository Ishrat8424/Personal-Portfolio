import { useEffect, useState } from "react";
import { getProjects } from "../../services/projectService";

function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProjects();
  }, []);

  return (
  <section
    id="projects"
    className="py-20 bg-gray-50"
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6">

      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
        My Projects
      </h2>

      <p className="text-center text-gray-500 mb-12">
        Some of the projects I have built using modern web technologies.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

        {projects.map((project) => (
          <div
            key={project._id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col"
          >

            {/* Project Image */}
            <img
              src={
                project.image ||
                "https://via.placeholder.com/600x350"
              }
              alt={project.title}
              className="w-full h-56 object-cover"
            />

            {/* Card Content */}
            <div className="p-6 flex flex-col flex-grow">

              <h3 className="text-2xl font-bold mb-3">
                {project.title}
              </h3>

              <p className="text-gray-600 flex-grow">
                {project.description}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mt-5">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Buttons */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3">

                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center bg-gray-900 text-white py-2 rounded-lg hover:bg-black transition"
                  >
                    GitHub
                  </a>
                )}

                {project.liveDemo && (
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Live Demo
                  </a>
                )}

              </div>

            </div>

          </div>
        ))}

      </div>

    </div>
  </section>
);
}

export default Projects;