
















































































import fs from "fs";
import slugify from "slugify";
import productModel from "../models/productModel.js";
import braintree from "braintree";
import dotenv from "dotenv";

dotenv.config();

/* -------------------------------------------------------------------------- */
/* ✅ Create Product Controller */
/* -------------------------------------------------------------------------- */
export const createProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } = req.fields;
    const { photo } = req.files;

    // Validation
    if (!name || !description || !price || !category || !quantity) {
      return res.status(400).send({ error: "All fields are required" });
    }

    const product = new productModel({
      ...req.fields,
      slug: slugify(name),
    });

    // Handle photo upload
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    await product.save();
    res.status(201).send({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in creating product",
      error,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* ✅ Get All Products */
/* -------------------------------------------------------------------------- */
export const getAllProductsController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .select("-photo")
      .limit(50)
      .sort({ createdAt: -1 })
      .populate("category");

    res.status(200).send({
      success: true,
      countTotal: products.length,
      products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in getting products",
      error,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* ✅ Get Product by ID */
/* -------------------------------------------------------------------------- */
export const getProductByIdController = async (req, res) => {
  try {
    const product = await productModel
      .findById(req.params.id)
      .select("-photo")
      .populate("category");

    if (!product) {
      return res.status(404).send({ success: false, message: "Product not found" });
    }

    res.status(200).send({ success: true, product });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while getting product",
      error,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* ✅ Get Product Photo */
/* -------------------------------------------------------------------------- */
export const getProductPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id).select("photo");
    if (product.photo.data) {
      res.set("Content-Type", product.photo.contentType);
      return res.send(product.photo.data);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: "Error while getting photo", error });
  }
};

/* -------------------------------------------------------------------------- */
/* ✅ Update Product */
/* -------------------------------------------------------------------------- */
export const updateProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } = req.fields;
    const { photo } = req.files;

    const product = await productModel.findByIdAndUpdate(
      req.params.id,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );

    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    await product.save();
    res.status(200).send({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while updating product",
      error,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* ✅ Delete Product */
/* -------------------------------------------------------------------------- */
export const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.id).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* ✅ Braintree Payment Integration */
/* -------------------------------------------------------------------------- */

// ✅ Braintree Gateway Setup
const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox, // use .Production in live
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

// ✅ Generate Braintree Token
export const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, (err, response) => {
      if (err) {
        return res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.error(error);
  }
};
export const braintreePaymentController = async (req, res) => {
  try {
    const { nonce, cart } = req.body;

    // Calculate total amount
    let total = 0;
    cart.forEach((item) => {
      total += item.price * (item.quantity || 1);
    });

    // Make the transaction
    gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: { submitForSettlement: true },
      },
      (error, result) => {
        if (error) {
          console.error("❌ Braintree transaction error:", error);
          return res.status(500).send({ success: false, message: "Payment failed", error });
        }

        if (result && result.success) {
          return res.status(200).send({
            success: true,
            message: "Payment successful",
            transactionId: result.transaction.id,
            totalAmount: result.transaction.amount,
          });
        } else {
          return res.status(400).send({
            success: false,
            message: "Transaction failed",
            error: result,
          });
        }
      }
    );
  } catch (error) {
    console.error("❌ Payment Controller Error:", error);
    res.status(500).send({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};










