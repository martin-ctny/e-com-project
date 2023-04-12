import axios from "axios";

const API_URL = "http://localhost:8000/api/products";

const getProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const getOneProduct = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const createProduct = async (data) => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const updateProduct = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const ProductsService = {
  getProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};

export default ProductsService;
