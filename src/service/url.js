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

const getAllUrl = async () => {
  const response = apiClient.get('/');
  return response;
};

const deleteUrl = async (url) => {
  const response = apiClient.delete(`/${url}`);
  return response;
};

export default {
  createShortUrl,
  getAllUrl,
  setToken,
  deleteUrl,
};
