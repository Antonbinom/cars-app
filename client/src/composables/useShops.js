import axios from "axios";

const API_URL = "http://localhost:5000/api";

export default function useShops() {
  // Создаем новый магазин
  async function createShop(obj) {
    // делаем post запрос на эндпоинт
    await axios.post(`${import.meta.env.VITE_API_URL}/shop`, obj);
  }
  // Получаем все магазины
  async function getAllShops() {
    // делаем get запрос на эндпоинт
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/shop`);
    return data;
  }

  return { createShop, getAllShops };
}
