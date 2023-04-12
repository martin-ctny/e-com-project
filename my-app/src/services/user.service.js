const axios = require("axios");
const API_URL = "http://localhost:8000/api/user";

const getOneUser = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const updateUserInfo = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
const UserService = {
  getOneUser,
  updateUserInfo,
};

export default UserService;
