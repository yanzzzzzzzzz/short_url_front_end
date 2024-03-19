import axios from 'axios';
import { CredentialsModel } from '../models/UserModel';
const baseURL = '/api/login';

const login = async (credentials: CredentialsModel) => {
  const response = await axios.post(baseURL, credentials);
  return response;
};

export default { login };
