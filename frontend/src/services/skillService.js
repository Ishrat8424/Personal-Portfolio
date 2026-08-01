import axios from "./api";

const API = "/skills";

export const getSkills = async () => {
  const response = await axios.get(API);
  return response.data;
};

export const addSkill = async (skill) => {
  const response = await axios.post(API, skill);
  return response.data;
};

export const updateSkill = async (id, skill) => {
  const response = await axios.put(`${API}/${id}`, skill);
  return response.data;
};

export const deleteSkill = async (id) => {
  const response = await axios.delete(`${API}/${id}`);
  return response.data;
};