import express from "express";
import { getUserOrdersController } from "../controller/orderController.js";

const router = express.Router();

router.get("/user/:userId", getUserOrdersController);

export default router;
