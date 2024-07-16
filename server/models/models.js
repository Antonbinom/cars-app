import sequelize from "../db.js";
import { DataTypes } from "sequelize";
// Модели для сущностей

export const Shop = sequelize.define("Shop", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export const Car = sequelize.define(
  "Car",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    //  создаем связь с Shop
    shopId: {
      type: DataTypes.INTEGER,
      references: {
        model: Shop,
        key: "id",
      },
      allowNull: false,
    },
  },
  // подключаем модель shop
  {
    include: [{ model: Shop, as: "shop" }],
  }
);
// указываем связь одиной машины к одному магазину по id
Car.belongsTo(Shop, { foreignKey: "shopId" });
