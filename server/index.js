import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import sequelize from "./db.js";
import router from "./routes/index.js";
import errorHandler from "./middleware/ErrorHandlingMiddleware.js";

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", router); //подключили роутер
app.use(errorHandler); //middleware с ошибкой регестрируем в самом конце

async function start() {
  try {
    await sequelize.authenticate(); //подключение к БД
    await sequelize.sync(); // сверяем состояние БД с нашей схемой данных

    app.listen(PORT, () =>
      console.log(`This server has been started on http://localhost:${PORT}`)
    );
  } catch (error) {
    console.log(error);
  }
}
start();
