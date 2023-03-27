import axios from "axios";
const apiClient = axios.create({
  baseURL: "/api",
});
const getHello = () => {
  const req = apiClient.get("");
  return req.then((response) => response.data);
};

const getShortenUrl = (url) => {
  const req = apiClient.post("/shorten", { url: url });
  return req.then((response) => response.data);
};

export default {
  getHello,
  getShortenUrl,
};
