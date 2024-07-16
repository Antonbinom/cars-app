import express from "express";
import carRouter from "../routes/carRouter.js";
import shopRouter from "../routes/shopRouter.js";

const router = express.Router();

router.use("/car", carRouter);
router.use("/shop", shopRouter);

export default router;
