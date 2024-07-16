import { Car, Shop } from "../models/models.js";
import ApiError from "../helpers/ApiError.js";

export async function create(req, res, next) {
  try {
    const { brand, model, price, shopId } = req.body;
    // создаем авто с полями
    const car = await Car.create({
      brand,
      model,
      price,
      shopId,
    });

    return res.json(car);
    // возвращаем в формате json
  } catch (error) {
    next(ApiError.badRequest(error.message));
  }
}

export async function getAll(req, res, next) {
  try {
    // получаем все элементы таблицы
    const cars = await Car.findAll({
      include: [
        // добавляем свойства из привязанного магазина
        {
          model: Shop,
          as: "Shop",
          attributes: ["name", "number"],
        },
      ],
      attributes: {
        // исключаем
        exclude: ["createdAt", "updatedAt", "userId"],
      },
      raw: true,
    });

    return res.json(cars);
  } catch (error) {
    next(ApiError.badRequest(error.message));
  }
}
