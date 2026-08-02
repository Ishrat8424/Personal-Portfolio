import axios from "axios";

const API = "http://localhost:5000/api/contact";

// Send message from portfolio
export const sendMessage = async (data) => {
  const response = await axios.post(API, data);
  return response.data;
};

// Dashboard - Get all contacts
export const getContacts = async () => {
  const response = await axios.get(API);
  return response.data;
};

// Dashboard - Delete contact
export const deleteContact = async (id) => {
  const response = await axios.delete(`${API}/${id}`);
  return response.data;
};

// Dashboard - Mark message as read
export const markAsRead = async (id) => {
  const response = await axios.patch(`${API}/${id}/read`);
  return response.data;
};