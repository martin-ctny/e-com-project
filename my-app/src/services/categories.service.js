import axios from "axios";

const API_URL = "http://localhost:8000/api/category";

const getCategories = async () => {
  try {
    const response = await axios.get(API_URL);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const getOneCategory = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const createCategory = async (data) => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const updateCategory = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const deleteCategory = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const CategoriesService = {
  getCategories,
  getOneCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};

export default CategoriesService;
