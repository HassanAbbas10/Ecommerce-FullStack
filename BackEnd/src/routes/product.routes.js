import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import express from "express";
import {
  addProducts,
  deleteProductById,
  getAllProducts,
  getProductById,
  updateProductById,
} from "../controllers/product.controllers.js";
const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/add-product", upload.single("image"), addProducts);
router.delete("/:id", deleteProductById);
router.put("/:id", updateProductById);

export default router
