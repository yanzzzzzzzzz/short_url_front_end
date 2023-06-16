import axios from 'axios';

let token = null;
const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};
const apiClient = axios.create({
  baseURL: '/api/url',
});

const createShortUrl = async (url) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await apiClient.post('/', { url: url }, config);
  return response.data;
};

const getAllUrl = () => {
  const response = apiClient.get('/');
  return response;
};

export default {
  createShortUrl,
  getAllUrl,
  setToken,
};
