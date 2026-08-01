import { useEffect, useState } from "react";
import {
  getPortfolio,
  updatePortfolio,
} from "../../services/portfolioService";

function Portfolio() {
  const [portfolio, setPortfolio] = useState({
    name: "",
    title: "",
    about: "",
    email: "",
    phone: "",
    github: "",
    linkedin: "",
  });

  const fetchPortfolio = async () => {
    try {
      const data = await getPortfolio();

      if (data) {
        setPortfolio({
          name: data.name || "",
          title: data.title || "",
          about: data.about || "",
          email: data.email || "",
          phone: data.phone || "",
          github: data.github || "",
          linkedin: data.linkedin || "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const handleChange = (e) => {
    setPortfolio({
      ...portfolio,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updatePortfolio(portfolio);

      alert("Portfolio Updated Successfully!");
    } catch (error) {
      alert(error.response?.data?.message || "Update Failed");
    }
  };

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">
        Portfolio Management
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={portfolio.name}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={portfolio.title}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <textarea
          name="about"
          placeholder="About"
          rows="5"
          value={portfolio.about}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={portfolio.email}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={portfolio.phone}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="github"
          placeholder="GitHub URL"
          value={portfolio.github}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="linkedin"
          placeholder="LinkedIn URL"
          value={portfolio.linkedin}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
        >
          Update Portfolio
        </button>

      </form>
    </div>
  );
}

export default Portfolio;