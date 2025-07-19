import {Product} from "../models/products.models.js";
import ApiResponse from "../utils/apiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
export const getAllProducts = async (req, res) => {
  try {
    const product = await Product.find();
    res.status(201).json(new ApiResponse(200,product,"Got all the Products successfully"));
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(201).json(new ApiResponse(200,product,"Get Product by Id successfully"));
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product is not in the database" });
    }

    res.status(201).json(new ApiResponse(200,updatedProduct,"Product uploaded successfully"));
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Product is not in the database" });
    }
    res.status(201).json(new ApiResponse(200,"Product dxeleted Successfully 🎃"));
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addProducts = async (req, res) => {
  try {

    const localFilePath = req.file?.path;

    if (!localFilePath) {
      return res.status(400).json({ message: "Image file is required" });
    }

    const uploadResult = await uploadOnCloudinary(localFilePath);

    if (!uploadResult?.secure_url) {
      return res.status(500).json({ message: "Cloudinary upload failed" });
    }

    const {
      name,
      description,
      rating,
      price,
      quantity,
      category,
    } = req.body;

    const product = await Product.create({
      name,
      image: uploadResult.secure_url,
      description,
      rating,
      price,
      quantity,
      category,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
