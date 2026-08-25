import API from "./api";

export const uploadImage = async (file) => {
  const formData = new FormData();

  formData.append("image", file);

  const response = await API.post(
    "/upload/image",
    formData
  );

  return response.data;
};

export const uploadResume = async (file) => {
  const formData = new FormData();

  formData.append("resume", file);

  const response = await API.post(
    "/upload/resume",
    formData
  );

  return response.data;
};