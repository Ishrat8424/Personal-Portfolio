import axios from "axios";

const API = "http://localhost:5000/api/experience";

export const addExperience = async (experienceData) => {
  const response = await axios.post(API, experienceData);
  return response.data;
};

export const getExperiences = async () => {
  const response = await axios.get(API);
  return response.data;
};

export const updateExperience = async (id, experienceData) => {
  const response = await axios.put(`${API}/${id}`, experienceData);
  return response.data;
};

export const deleteExperience = async (id) => {
  const response = await axios.delete(`${API}/${id}`);
  return response.data;
};