import { useState, useEffect } from "react";
import Select from "react-select";
import { skillOptions } from "../../data/skillOptions";

import {
  addSkill,
  getSkills,
  updateSkill,
  deleteSkill,
} from "../../services/skillService";

function Skills() {
 const [skill, setSkill] = useState({
  name: "",
  category: "",
  percentage: 80,
});
  
  const [skills, setSkills] = useState([]);
  const [editingId, setEditingId] = useState(null);

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

  const handleChange = (e) => {
    setSkill({
      ...skill,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = (item) => {
    setEditingId(item._id);

    setSkill({
      name: item.name,
      category: item.category,
      percentage: item.percentage,
    });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this skill?"
    );

    if (!confirmDelete) return;

    try {
      await deleteSkill(id);

      alert("Skill Deleted Successfully!");

      fetchSkills();
    } catch (error) {
      alert(error.response?.data?.message || "Delete Failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateSkill(editingId, skill);

        alert("Skill Updated Successfully!");

        setEditingId(null);
      } else {
        await addSkill(skill);

        alert("Skill Added Successfully!");
      }

      fetchSkills();

      setSkill({
  name: "",
  category: "",
  percentage: 80,
});
    } catch (error) {
      alert(error.response?.data?.message || "Failed");
    }
  };

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">
        Skills Management
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <Select
  options={skillOptions}
  placeholder="Search and Select Skill..."
  value={skillOptions.find(
    (option) => option.value === skill.name
  )}
  onChange={(selectedOption) =>
    setSkill({
      ...skill,
      name: selectedOption.value,
      category: selectedOption.category,
    })
  }
  isSearchable
/>

        <input
  type="text"
  value={skill.category}
  className="w-full border p-3 rounded bg-gray-100"
  readOnly
/>

<div>
  <div className="flex justify-between mb-2">
    <label className="font-medium">
      Skill Level
    </label>

    <span className="font-semibold text-blue-600">
      {skill.percentage}%
    </span>
  </div>

  <input
    type="range"
    name="percentage"
    min="0"
    max="100"
    step="1"
    value={skill.percentage}
    onChange={handleChange}
    className="w-full accent-blue-600 cursor-pointer"
  />
</div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded"
        >
          {editingId ? "Update Skill" : "Add Skill"}
        </button>

      </form>

      <hr className="my-10" />

      <h2 className="text-2xl font-bold mb-4">
        All Skills
      </h2>

      <div className="space-y-4">
        {skills.map((item) => (
          <div
            key={item._id}
            className="border rounded-lg p-4 shadow"
          >
            <h3 className="text-xl font-bold">
              {item.name}
            </h3>

            <p>{item.category}</p>

            <p>{item.percentage}%</p>

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

export default Skills;