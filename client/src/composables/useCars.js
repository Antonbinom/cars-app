import axios from "axios";

const API_URL = "http://localhost:5000/api";

export default function useCars() {
  // Создаем новый авто
  async function createCar(obj) {
    // делаем post запрос на эндпоинт
    return await axios.post(`${import.meta.env.VITE_API_URL}/car`, obj);
  }
  // Получаем все машины
  async function getAllCars() {
    // делаем get запрос на эндпоинт
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/car`);
    return data;
  }

  return { createCar, getAllCars };
}
