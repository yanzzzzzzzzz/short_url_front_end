import axios from 'axios';
import { useUserStore } from '../stores/UserStore';
import { ShortUrl, ShortUrlModel, ShortUrlPageMode } from '../models/UrlModel';
const API_BASE_URL = '/api/url';

const apiClient = axios.create({
  baseURL: API_BASE_URL
});

apiClient.interceptors.request.use(
  (config) => {
    const userStore = useUserStore();
    if (userStore.user.token) {
      config.headers.Authorization = `Bearer ${userStore.user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const createShortUrl = async (url: string, customShortUrl: string): Promise<ShortUrlModel> => {
  const response = await apiClient.post('/', { url, customShortUrl });
  return response.data;
};

const getAllUrl = async (searchKeyword?: string): Promise<ShortUrlPageMode> => {
  const response = await apiClient.get('/', {
    params: { searchKeyword }
  });
  return response.data;
};

const deleteUrl = async (url) => {
  const response = await apiClient.delete(`/${url}`);
  return response;
};

const updateUrl = async (shortUrl: string, newShortUrl: string | undefined, newTitle: string | undefined): Promise<ShortUrl> => {
  return (await apiClient.patch(`/${shortUrl}`, { newShortUrl, newTitle })).data;
}

export default {
  createShortUrl,
  getAllUrl,
  deleteUrl,
  updateUrl
};
