import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import Select from "react-select";
import { skillOptions } from "../../data/skillOptions";
import { toast } from "react-toastify";

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
  const { darkMode } = useOutletContext();

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
      "Are you sure you want to delete this skill?",
    );

    if (!confirmDelete) return;

    try {
      await deleteSkill(id);

      toast.success("Skill Deleted Successfully!");

      fetchSkills();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete Failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateSkill(editingId, skill);

        toast.success("Skill Updated Successfully!");

        setEditingId(null);
      } else {
        await addSkill(skill);

        toast.success("Skill Added Successfully!");
      }

      fetchSkills();

      setSkill({
        name: "",
        category: "",
        percentage: 80,
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed");
    }
  };

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Skills Management</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Select
          options={skillOptions}
          placeholder="Search and Select Skill..."
          value={skillOptions.find((option) => option.value === skill.name)}
          onChange={(selectedOption) =>
            setSkill({
              ...skill,
              name: selectedOption.value,
              category: selectedOption.category,
            })
          }
          isSearchable
          styles={{
            control: (base) => ({
              ...base,
              backgroundColor: darkMode ? "#1f2937" : "#ffffff",
              borderColor: darkMode ? "#374151" : "#d1d5db",
              color: darkMode ? "#ffffff" : "#000000",
              boxShadow: "none",
              "&:hover": {
                borderColor: "#2563eb",
              },
            }),

            menu: (base) => ({
              ...base,
              backgroundColor: darkMode ? "#1f2937" : "#ffffff",
            }),

            option: (base, state) => ({
              ...base,
              backgroundColor: state.isFocused
                ? "#2563eb"
                : darkMode
                  ? "#1f2937"
                  : "#ffffff",
              color: darkMode ? "#ffffff" : "#000000",
              cursor: "pointer",
            }),

            singleValue: (base) => ({
              ...base,
              color: darkMode ? "#ffffff" : "#000000",
            }),

            input: (base) => ({
              ...base,
              color: darkMode ? "#ffffff" : "#000000",
            }),

            placeholder: (base) => ({
              ...base,
              color: darkMode ? "#9ca3af" : "#6b7280",
            }),

            menuList: (base) => ({
              ...base,
              maxHeight: 250,
            }),

            dropdownIndicator: (base) => ({
              ...base,
              color: darkMode ? "#ffffff" : "#000000",
            }),

            indicatorSeparator: (base) => ({
              ...base,
              backgroundColor: darkMode ? "#4b5563" : "#d1d5db",
            }),
          }}
        />

        <input
          type="text"
          value={skill.category}
          className={`w-full border p-3 rounded transition-colors duration-300 ${
            darkMode
              ? "bg-gray-800 text-white border-gray-700"
              : "bg-gray-100 text-black border-gray-300"
          }`}
          readOnly
        />

        <div>
          <div className="flex justify-between mb-2">
            <label className="font-medium">Skill Level</label>

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

      <h2 className="text-2xl font-bold mb-4">All Skills</h2>

      <div className="space-y-4">
        {skills.map((item) => (
          <div
            key={item._id}
            className={`border rounded-lg p-4 shadow-lg transition-all duration-300 ${
              darkMode
                ? "bg-gray-800 border-gray-700 text-white"
                : "bg-white border-gray-300 text-black"
            }`}
          >
            <h3 className="text-xl font-bold">{item.name}</h3>

            <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
              {item.category}
            </p>

            <p className="text-blue-600 font-semibold mt-1">
              {item.percentage}%
            </p>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => handleEdit(item)}
                className="px-4 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white transition-all duration-300 shadow-md"
              >
              Edit
              </button>

              <button
                onClick={() => handleDelete(item._id)}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-all duration-300 shadow-md"
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
