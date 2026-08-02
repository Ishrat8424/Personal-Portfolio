import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  addExperience,
  getExperiences,
  updateExperience,
  deleteExperience,
} from "../../services/experienceService";

function Experience() {
  const [experience, setExperience] = useState({
    company: "",
    jobTitle: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const [experiences, setExperiences] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const fetchExperiences = async () => {
    try {
      const data = await getExperiences();
      setExperiences(data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch experiences");
    }
  };
const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this experience?"
  );

  if (!confirmDelete) return;

  try {
    await deleteExperience(id);

    toast.success("Experience Deleted Successfully!");

    fetchExperiences();
  } catch (error) {
    toast.error(error.response?.data?.message || "Delete Failed");
  }
};

const handleEdit = (item) => {
  setEditingId(item._id);

  setExperience({
    company: item.company,
    jobTitle: item.jobTitle,
    startDate: item.startDate
      ? item.startDate.substring(0, 10)
      : "",
    endDate: item.endDate
      ? item.endDate.substring(0, 10)
      : "",
    description: item.description,
  });
};
  useEffect(() => {
    fetchExperiences();
  }, []);

  const handleChange = (e) => {
    setExperience({
      ...experience,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (editingId) {
      await updateExperience(editingId, experience);

      toast.success("Experience Updated Successfully!");

      setEditingId(null);
    } else {
      await addExperience(experience);

      toast.success("Experience Added Successfully!");
    }

    fetchExperiences();

    setExperience({
      company: "",
      jobTitle: "",
      startDate: "",
      endDate: "",
      description: "",
    });
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed");
  }
};

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">
        Experience
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="company"
          placeholder="Company"
          value={experience.company}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />

        <input
          type="text"
          name="jobTitle"
          placeholder="Job Title"
          value={experience.jobTitle}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />

        <input
          type="date"
          name="startDate"
          value={experience.startDate}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />

        <input
          type="date"
          name="endDate"
          value={experience.endDate}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={experience.description}
          onChange={handleChange}
          rows="4"
          className="w-full border p-3 rounded"
          required
        />

        <button
  type="submit"
  className="bg-blue-600 text-white px-6 py-3 rounded"
>
  {editingId ? "Update Experience" : "Add Experience"}
</button>

      </form>

      <hr className="my-10" />

      <h2 className="text-2xl font-bold mb-4">
        All Experiences
      </h2>

      <div className="space-y-4">
        {experiences.map((item) => (
          <div
            key={item._id}
            className="border rounded-lg p-4 shadow"
          >
            <h3 className="text-xl font-bold">
              {item.jobTitle}
            </h3>

            <p>{item.company}</p>

            <p>
              {item.startDate} - {item.endDate}
            </p>

            <p>{item.description}</p>

<div className="flex gap-4 mt-3">
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

export default Experience;