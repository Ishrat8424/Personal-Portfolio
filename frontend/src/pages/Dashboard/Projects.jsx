import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useOutletContext } from "react-router-dom";
import {
  addProject,
  getProjects,
  deleteProject,
  updateProject,
} from "../../services/projectService";
import { uploadImage } from "../../services/uploadService";

function Projects() {
  const { darkMode } = useOutletContext();
  const [project, setProject] = useState({
    title: "",
    description: "",
    technologies: "",
    github: "",
    liveDemo: "",
    image: "",
  });

  const [projects, setProjects] = useState([]);

  const [editingId, setEditingId] = useState(null);
  const [uploading, setUploading] = useState(false);

  const fetchProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?",
    );

    if (!confirmDelete) return;

    try {
      await deleteProject(id);

      toast.success("Project Deleted Successfully!");

      fetchProjects();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete Failed");
    }
  };
  const handleEdit = (item) => {
    setEditingId(item._id);

    setProject({
      title: item.title,
      description: item.description,
      technologies: item.technologies.join(", "),
      github: item.github,
      liveDemo: item.liveDemo,
      image: item.image,
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    try {
      setUploading(true);

      const data = await uploadImage(file);

      setProject((prev) => ({
        ...prev,
        image: data.imageUrl,
      }));

      toast.success("Project Image Uploaded Successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Image Upload Failed");
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    setProject({
      ...project,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const projectData = {
        ...project,
        technologies: project.technologies
          .split(",")
          .map((tech) => tech.trim()),
      };

      if (editingId) {
        await updateProject(editingId, projectData);

        toast.success("Project Updated Successfully!");

        setEditingId(null);
      } else {
        await addProject(projectData);

        toast.success("Project Added Successfully!");
      }

      fetchProjects();

      setProject({
        title: "",
        description: "",
        technologies: "",
        github: "",
        liveDemo: "",
        image: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to Add Project");
    }
  };

  return (
    <div className={`max-w-3xl ${darkMode ? "text-white" : "text-black"}`}>
      <h1 className="text-3xl font-bold mb-6">Add Project</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Project Title"
          value={project.title}
          onChange={handleChange}
          className={`w-full border p-3 rounded ${
            darkMode
              ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              : "bg-white border-gray-300 text-black placeholder-gray-500"
          }`}
          required
        />

        <textarea
          name="description"
          placeholder="Project Description"
          value={project.description}
          onChange={handleChange}
          className={`w-full border p-3 rounded ${
            darkMode
              ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              : "bg-white border-gray-300 text-black placeholder-gray-500"
          }`}
          rows="4"
          required
        />

        <input
          type="text"
          name="technologies"
          placeholder="React, Node.js, Express, MongoDB"
          value={project.technologies}
          onChange={handleChange}
          className={`w-full border p-3 rounded ${
            darkMode
              ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              : "bg-white border-gray-300 text-black placeholder-gray-500"
          }`}
          required
        />

        <input
          type="text"
          name="github"
          placeholder="GitHub URL"
          value={project.github}
          onChange={handleChange}
          className={`w-full border p-3 rounded ${
  darkMode
    ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
    : "bg-white border-gray-300 text-black placeholder-gray-500"
}`}
        />

        <input
          type="text"
          name="liveDemo"
          placeholder="Live Demo URL"
          value={project.liveDemo}
          onChange={handleChange}
          className={`w-full border p-3 rounded ${
            darkMode
              ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              : "bg-white border-gray-300 text-black placeholder-gray-500"
          }`}
        />

        <div>
          <label className="block mb-2 font-semibold">Project Image</label>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className={`w-full border p-3 rounded ${
              darkMode
                ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                : "bg-white border-gray-300 text-black placeholder-gray-500"
            }`}
          />

          {uploading && (
            <p className="text-blue-600 mt-2">Uploading Image...</p>
          )}

          {project.image && (
            <img
              src={project.image}
              alt="Project Preview"
              className="w-56 mt-4 rounded-lg border shadow"
            />
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
        >
          {editingId ? "Update Project" : "Add Project"}
        </button>
      </form>
      <hr className="my-10" />

      <h2 className="text-2xl font-bold mb-4">All Projects</h2>

      <div className="space-y-4">
        {projects.map((item) => (
          <div key={item._id} className="border rounded-lg p-4 shadow">
            <h3 className="text-xl font-bold">{item.title}</h3>
            {item.image && (
              <img
                src={item.image}
                alt={item.title}
                className="w-full max-w-md rounded-lg mt-3 mb-3 border shadow"
              />
            )}

            <p>{item.description}</p>

            <p className="text-blue-600">{item.technologies.join(", ")}</p>

            <div className="flex gap-4 mt-3">
              <a
                href={item.github}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline"
              >
                GitHub
              </a>

              <button
                onClick={() => handleEdit(item)}
                className="text-yellow-600 hover:underline"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(item._id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;
