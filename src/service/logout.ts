import axios from 'axios';
const baseURL = '/api/logout';

const logout = async () => {
  const response = await axios.post(baseURL);
  return response;
};

export default { logout };
