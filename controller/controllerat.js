import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";

/* ---------------- CREATE CATEGORY ---------------- */
export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).send({ success: false, message: "Name is required" });

    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory)
      return res.status(200).send({ success: false, message: "Category already exists" });

    const category = new categoryModel({ name, slug: slugify(name) });
    await category.save();

    res.status(201).send({ success: true, message: "Category created successfully", category });
  } catch (error) {
    res.status(500).send({ success: false, message: "Error in category creation", error: error.message });
  }
};

/* ---------------- GET ALL CATEGORIES ---------------- */
export const getAllCategoriesController = async (req, res) => {
  try {
    const categories = await categoryModel.find({});
    res.status(200).send({ success: true, message: "All categories fetched successfully", categories });
  } catch (error) {
    res.status(500).send({ success: false, message: "Error fetching categories", error: error.message });
  }
};

/* ---------------- GET SINGLE CATEGORY BY SLUG ---------------- */
export const getCategoryBySlugController = async (req, res) => {
  try {
    const { slug } = req.params;
    const category = await categoryModel.findOne({ slug });
    if (!category) return res.status(404).send({ success: false, message: "Category not found" });

    res.status(200).send({ success: true, message: "Single category fetched successfully", category });
  } catch (error) {
    res.status(500).send({ success: false, message: "Error fetching category by slug", error: error.message });
  }
};

/* ---------------- GET SINGLE CATEGORY BY ID ---------------- */
export const getSingleCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoryModel.findById(id);
    if (!category) return res.status(404).send({ success: false, message: "Category not found" });

    res.status(200).send({ success: true, message: "Single category fetched successfully", category });
  } catch (error) {
    res.status(500).send({ success: false, message: "Error fetching single category", error: error.message });
  }
};

/* ---------------- UPDATE CATEGORY ---------------- */
export const updateCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(400).send({ success: false, message: "Name is required" });
    }

    // Check if another category already has this name
    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory && existingCategory._id.toString() !== id) {
      return res.status(400).send({
        success: false,
        message: `Category name "${name}" already exists`,
      });
    }

    const category = await categoryModel.findById(id);
    if (!category) return res.status(404).send({ success: false, message: "Category not found" });

    category.name = name;
    category.slug = slugify(name);
    await category.save();

    res.status(200).send({ success: true, message: "Category updated successfully", category });
  } catch (error) {
    console.error("UPDATE CATEGORY ERROR:", error);
    res.status(500).send({ success: false, message: "Error updating category", error: error.message });
  }
};
/* ---------------- DELETE CATEGORY ---------------- */
export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoryModel.findByIdAndDelete(id);
    if (!category) return res.status(404).send({ success: false, message: "Category not found" });

    res.status(200).send({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).send({ success: false, message: "Error deleting category", error: error.message });
  }
};
