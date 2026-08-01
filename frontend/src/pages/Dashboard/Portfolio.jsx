import { useEffect, useState } from "react";
import { getPortfolio, updatePortfolio } from "../../services/portfolioService";
import {
  uploadImage,
  uploadResume,
} from "../../services/uploadService";
function Portfolio() {
  const [portfolio, setPortfolio] = useState({
  fullName: "",
  title: "",
  heroDescription: "",
  about: "",
  email: "",
  phone: "",
  location: "",
  github: "",
  linkedin: "",
  profileImage: "",
  resume: "",
});
  const [uploading, setUploading] = useState(false);

 const fetchPortfolio = async () => {
  try {
    const data = await getPortfolio();

    if (data) {
      setPortfolio({
        fullName: data.fullName || "",
        title: data.title || "",
        heroDescription: data.heroDescription || "",
        about: data.about || "",
        email: data.email || "",
        phone: data.phone || "",
        location: data.location || "",
        github: data.github || "",
        linkedin: data.linkedin || "",
        profileImage: data.profileImage || "",
        resume: data.resume || "",
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

const handleImageUpload = async (e) => {
  const file = e.target.files[0];

  if (!file) return;

  try {
    setUploading(true);

    const data = await uploadImage(file);

    setPortfolio((prev) => ({
      ...prev,
      profileImage: data.imageUrl,
    }));

    alert("Image Uploaded Successfully!");
  } catch (error) {
    alert(error.response?.data?.message || "Image Upload Failed");
  } finally {
    setUploading(false);
  }
};

const handleResumeUpload = async (e) => {
  const file = e.target.files[0];

  if (!file) return;

  try {
    setUploading(true);

    const data = await uploadResume(file);

    setPortfolio((prev) => ({
      ...prev,
      resume: data.resumeUrl,
    }));

    alert("Resume Uploaded Successfully!");

  } catch (error) {
    alert(error.response?.data?.message || "Resume Upload Failed");
  } finally {
    setUploading(false);
  }
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
      <h1 className="text-3xl font-bold mb-6">Portfolio Management</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={portfolio.fullName}
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
          name="heroDescription"
          placeholder="Short introduction for Hero section"
          value={portfolio.heroDescription}
          onChange={handleChange}
          rows="3"
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


        <div>
          <label className="block mb-2 font-semibold">Profile Image</label>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full border p-3 rounded"
          />

          {uploading && <p className="text-blue-600 mt-2">Uploading...</p>}

          {portfolio.profileImage && (
            <img
              src={portfolio.profileImage}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover mt-4 border"
            />
          )}
        </div>
        <div>
  <label className="block mb-2 font-semibold">
    Resume (PDF)
  </label>

  <input
    type="file"
    accept=".pdf"
    onChange={handleResumeUpload}
    className="w-full border p-3 rounded"
  />

  {uploading && (
    <p className="text-blue-600 mt-2">
      Uploading Resume...
    </p>
  )}

{portfolio.resume && (
  <div className="mt-3">
  <button
  type="button"
  onClick={async () => {
    const response = await fetch(portfolio.resume);
    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "Ishrat_Jahan_Khazi_Resume.pdf";

    document.body.appendChild(link);
    link.click();
    link.remove();

    window.URL.revokeObjectURL(url);
  }}
  className="text-blue-600 hover:underline"
>
  📄 Download Uploaded Resume
</button>
  </div>
)}

</div>
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
