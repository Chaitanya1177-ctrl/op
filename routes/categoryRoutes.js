import express from "express";
import {
  createCategoryController,
  getAllCategoriesController,
  getSingleCategoryController,
  getCategoryBySlugController,
  updateCategoryController,
  deleteCategoryController,
} from "../controller/controllerat.js";

const router = express.Router();

// Routes
router.post("/create", createCategoryController);
router.get("/get-all", getAllCategoriesController);
router.get("/get/:id", getSingleCategoryController);
router.get("/slug/:slug", getCategoryBySlugController);
router.put("/update/:id", updateCategoryController);
router.delete("/delete/:id", deleteCategoryController);

export default router;
