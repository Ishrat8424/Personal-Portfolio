import axios from "axios";

const API = "http://localhost:5000/api/portfolio";

export const getPortfolio = async () => {
  const response = await axios.get(API);
  return response.data;
};

export const updatePortfolio = async (portfolio) => {
  const response = await axios.put(API, portfolio);
  return response.data;
};