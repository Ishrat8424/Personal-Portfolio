import axios from "axios";

const API = axios.create({
  baseURL: "https://personal-portfolio-ie9u.onrender.com/api",
});

export default API;