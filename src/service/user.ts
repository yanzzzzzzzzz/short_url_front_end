import axios from 'axios';
import { UserInfoModel } from '../models/UserModel'
const baseURL = '/api/users';

const getUser = async (): Promise<UserInfoModel> => {
  const response = await axios.get(baseURL);
  return response.data;
};

const updateUser = async (userInfo: UserInfoModel) => {
  const response = await axios.patch(baseURL, userInfo);
  return response;
}

export default { getUser, updateUser };
