import axios from "axios";

const API_URL = "http://localhost:8000/api/auth";
const API_USER = "http://localhost:8000/api/user";

const register = (email, password, Adresse, PhoneNumber, Ville, CodePostal) => {
  return axios.post(`http://localhost:8000/api/user`, {
    email,
    password,
    Adresse,
    PhoneNumber,
    Ville,
    CodePostal,
  });
};

const login = async (email, password) => {
  const response = await axios
    .post(`${API_URL}/login`, {
      email,
      password,
    })
    .then((response) => {
      if (response.data.access_token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
  return response;
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
