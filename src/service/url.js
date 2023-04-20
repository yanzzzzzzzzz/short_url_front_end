import axios from "axios";
const apiClient = axios.create({
  baseURL: "/api/url",
});
const getHello = () => {
  const req = apiClient.get("");
  return req.then((response) => response.data);
};

const getShortenUrl = (url) => {
  const response = apiClient.post("/", { url: url });
  return response.then((response) => response.data);
};

const getAllUrl = () => {
  const response = apiClient.get("/");
  return response;
};

export default {
  getHello,
  getShortenUrl,
  getAllUrl,
};
