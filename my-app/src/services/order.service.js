import axios from "axios";

const API_URL = "http://localhost:8000/api/order";

const getOrders = async () => {
  try {
    const response = await axios.get(API_URL);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const getOneOrder = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const createOrder = async (data) => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
const updateOrder = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const createOrderItems = async (data) => {
  try {
    const response = await axios.post(
      `http://localhost:8000/api/orderItem`,
      data
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const updateOrderItems = async (id, data) => {
  try {
    const response = await axios.put(
      `http://localhost:8000/api/orderItem/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const OrdersService = {
  getOrders,
  getOneOrder,
  createOrder,
  updateOrder,
  createOrderItems,
  updateOrderItems,
};

export default OrdersService;
