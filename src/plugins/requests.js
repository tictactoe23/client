import axios from "axios";

const PORT = process.env.PORT || "8080";

export const postRequest = async (url, data = {}) => {
  return await axios.post(`http://localhost:${PORT}/api/v1${url}`, data);
};

export const getRequest = async (url) => {
  return await axios.get(`http://localhost:${PORT}/api/v1${url}`);
};
