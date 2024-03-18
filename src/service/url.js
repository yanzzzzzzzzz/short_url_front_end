import axios from 'axios';
import store from '../store';

const API_BASE_URL = '/api/url';

const apiClient = axios.create({
  baseURL: API_BASE_URL
});

apiClient.interceptors.request.use(
  (config) => {
    if (store.state.user.token) {
      config.headers.Authorization = `Bearer ${store.state.user.token}`;
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
  deleteUrl
};
