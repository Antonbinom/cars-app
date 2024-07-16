import express from "express";
import { create, getAll } from "../controllers/carController.js";
// Создаем роут для машин

const router = express.Router();

router.post("/", create);
router.get("/", getAll);

export default router;
