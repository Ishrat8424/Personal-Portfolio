import axios from "axios";

const API = "http://localhost:5000/api/contact";

export const getContacts = async () => {
  const response = await axios.get(API);
  return response.data;
};

export const deleteContact = async (id) => {
  const response = await axios.delete(`${API}/${id}`);
  return response.data;
};