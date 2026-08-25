import API from "./api";

export const addExperience = async (experienceData) => {
  const response = await API.post("/experience", experienceData);
  return response.data;
};

export const getExperiences = async () => {
  const response = await API.get("/experience");
  return response.data;
};

export const updateExperience = async (id, experienceData) => {
  const response = await API.put(`/experience/${id}`, experienceData);
  return response.data;
};

export const deleteExperience = async (id) => {
  const response = await API.delete(`/experience/${id}`);
  return response.data;
};