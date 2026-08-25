import API from "./api";

export const getPortfolio = async () => {
  const response = await API.get("/portfolio");
  return response.data;
};

export const updatePortfolio = async (portfolio) => {
  const response = await API.put("/portfolio", portfolio);
  return response.data;
};