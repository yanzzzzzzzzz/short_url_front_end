import axios from 'axios';
import { LoginModel } from '../models/UserModel';
const baseURL = '/api/login';

const login = async (credentials: LoginModel) => {
  const response = await axios.post(baseURL, credentials);
  return response;
};

export default { login };
