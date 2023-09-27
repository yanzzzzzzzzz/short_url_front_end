import axios from 'axios';

const API_BASE_URL = '/api/url';

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

apiClient.interceptors.request.use(
  (config) => {
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const createShortUrl = async (url) => {
  const response = await apiClient.post('/', { url });
  return response.data;
};

const getAllUrl = async () => {
  const response = await apiClient.get('/');
  return response;
};

const deleteUrl = async (url) => {
  const response = await apiClient.delete(`/${url}`);
  return response;
};

export default {
  createShortUrl,
  getAllUrl,
  setToken,
  deleteUrl,
};
