import axios from 'axios';
import { CreateUserModel } from '../models/UserModel';
const baseURL = '/api/users';

const createUser = async (createUserModel: CreateUserModel) => {
  const response = await axios.post(baseURL, createUserModel);
  return response;
};

export default { createUser };
