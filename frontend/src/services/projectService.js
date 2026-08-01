import API from "./api";

export const getProjects = async () => {
  const response = await API.get("/projects");
  return response.data;
};

export const addProject = async (projectData) => {
  const token = localStorage.getItem("token");

  const response = await API.post("/projects", projectData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const updateProject = async (id, projectData) => {
  const token = localStorage.getItem("token");

  const response = await API.put(`/projects/${id}`, projectData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const deleteProject = async (id) => {
  const token = localStorage.getItem("token");

  const response = await API.delete(`/projects/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

