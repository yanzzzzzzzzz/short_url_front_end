import axios from 'axios';
import { UpdateUserModel } from '../models/UserModel'
const baseURL = '/api/users';

const getUser = async () => {
  const response = await axios.get(baseURL);
  return response;
};

const updateUser = async (userInfo: UpdateUserModel) => {
  const response = await axios.patch(baseURL, userInfo);
  return response;
}

export default { getUser, updateUser };
