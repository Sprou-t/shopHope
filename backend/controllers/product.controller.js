import Product from "../models/product.model.js";
import mongoose from "mongoose";
import axios from 'axios'

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: "server Error" });
  }
};

export const getUrlImage = async(req,res) => {
  try {
    const fetchImagePromises = req.body.images.map(async (image) => {
      const response = await axios.get(image, {
        responseType: 'arraybuffer',
      });
      const imageBuffer = Buffer.from(response.data, 'binary');
      const base64Image = imageBuffer.toString('base64');
      const imageType = response.headers['content-type'];
      return `data:${imageType};base64,${base64Image}`;
    });

    const images = await Promise.all(fetchImagePromises);
    res.json({ images });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error fetching images' });
  }
}

export const createProduct = async (req, res) => {
  const product = req.body; // user will send a post request and the info would be in the body

  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }
  // create a new Product data obj using the model
  const newProduct = new Product(product);

  try {
    await newProduct.save(); // save the new obj into mongodb
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("error in create product:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;

  const product = req.body; // user would hv a way of inputing which obj they wanna update

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Product id" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedProduct = await Product.findByIdAndDelete(id);
  
      if (!deletedProduct) {
        // findbyID would return null if Product not found
        return res
          .status(404)
          .json({ success: false, message: "Product not found" });
      }
  
      // Product was successfully deleted
      res.status(200).json({ success: true, message: "Product deleted" });
    } catch (error) {
      // If there was a server or validation error
      res.status(500).json({ success: false, message: "Server Error" });
    }
  };