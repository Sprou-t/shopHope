import express from "express";
import Product from "../models/product.model.js";
import mongoose from "mongoose";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getUrlImage,
} from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", createProduct);
router.post("/load-url-images", getUrlImage);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
