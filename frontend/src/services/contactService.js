import API from "./api";

// Send message from portfolio
export const sendMessage = async (data) => {
  const response = await API.post("/contact", data);
  return response.data;
};

// Dashboard - Get all contacts
export const getContacts = async () => {
  const response = await API.get("/contact");
  return response.data;
};

// Dashboard - Delete contact
export const deleteContact = async (id) => {
  const response = await API.delete(`/contact/${id}`);
  return response.data;
};

// Dashboard - Mark message as read
export const markAsRead = async (id) => {
  const response = await API.patch(`/contact/${id}/read`);
  return response.data;
};