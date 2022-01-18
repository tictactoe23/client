import axios from "axios";

const PORT = process.env.PORT || "8080";

export const postRequest = async (url, data = {}) => {
  return await axios.post(`http://85.193.81.252:${PORT}/api/v1${url}`, data);
};

export const getRequest = async (url) => {
  return await axios.get(`http://85.193.81.252:${PORT}/api/v1${url}`);
};
