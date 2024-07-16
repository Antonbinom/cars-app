import express from "express";
import { create, getAll } from "../controllers/shopController.js";
// Создаем роут для магазинов
const router = express.Router();

router.post("/", create);
router.get("/", getAll);

export default router;
