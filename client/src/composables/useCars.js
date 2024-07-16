import axios from "axios";

const API_URL = "http://localhost:5000/api";

export default function useCars() {
  // Создаем новый авто
  async function createCar(obj) {
    // делаем post запрос на эндпоинт
    try {
      return await axios.post(`${import.meta.env.VITE_API_URL}/car`, obj);
    } catch (error) {
      console.log(error.message);
    }
  }
  // Получаем все машины
  async function getAllCars() {
    // делаем get запрос на эндпоинт
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/car`);
      return data;
    } catch (error) {
      console.log(error.message);
      return [];
    }
  }

  return { createCar, getAllCars };
}
