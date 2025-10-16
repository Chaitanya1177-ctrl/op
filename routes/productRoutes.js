















// import express from "express";
// import formidable from "express-formidable";
// import {
//   createProductController,
//   getAllProductsController,
//   getProductByIdController,
//   getProductPhotoController,
//   updateProductController,
//     deleteProductController,
// } from "../controller/controllerProduct.js";

// const router = express.Router();

// // Create Product
// router.post("/create", formidable(), createProductController);

// // Get All Products
// router.get("/all", getAllProductsController);

// // Get Product by ID
// router.get("/:id", getProductByIdController);

// // Get Product Photo by ID
// router.get("/photo/:id", getProductPhotoController);

// // Update Product
// router.put("/update/:id", formidable(), updateProductController);

// router.delete("/delete/:id", deleteProductController);
// export default router;


























import express from "express";
import formidable from "express-formidable";
import {
  createProductController,
  getAllProductsController,
  getProductByIdController,
  getProductPhotoController,
  updateProductController,
  deleteProductController,
  braintreeTokenController,
  braintreePaymentController,
} from "../controller/controllerProduct.js";

const router = express.Router();

// ✅ Create Product
router.post("/create", formidable(), createProductController);

// ✅ Get All Products
router.get("/all", getAllProductsController);

// ✅ Get Product Photo (important: keep before /:id)
router.get("/photo/:id", getProductPhotoController);

// ✅ Get Product by ID
router.get("/:id", getProductByIdController);

// ✅ Update Product
router.put("/update/:id", formidable(), updateProductController);

// ✅ Delete Product
router.delete("/delete/:id", deleteProductController);

// ✅ Braintree Token (for frontend)
router.get("/braintree/token", braintreeTokenController);

// ✅ Braintree Payment (no middleware)
router.post("/braintree/payment", braintreePaymentController);

export default router;
