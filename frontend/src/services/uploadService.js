import axios from "axios";

const API = "http://localhost:5000/api/upload";

export const uploadImage = async (file) => {
  const formData = new FormData();

  formData.append("image", file);

  const response = await axios.post(
    `${API}/image`,
    formData
  );

  return response.data;
};

export const uploadResume = async (file) => {
  const formData = new FormData();

  formData.append("resume", file);

  const response = await axios.post(
    `${API}/resume`,
    formData
  );

  return response.data;
};