import { Shop } from "../models/models.js";
import ApiError from "../helpers/ApiError.js";

export async function create(req, res, next) {
  try {
    const { name, number } = req.body;
    // создаем магазин с полями 
    const shop = await Shop.create({
      name,
      number,
    });
    // возвращаем в формате json
    return res.json(shop);
  } catch (error) {
    next(ApiError.badRequest(error.message));
  }
}

export async function getAll(req, res, next) {
  try {
    // получаем все элементы таблицы
    const shops = await Shop.findAll({
      attributes: {
        // исключаем свойства
        exclude: ["createdAt", "updatedAt"],
      },
    });
    return res.json(shops);
  } catch (error) {
    next(ApiError.badRequest(error.message));
  }
}
