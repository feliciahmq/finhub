import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

router.get("/products", async (req, res) => {
  try{
    const products = await Product.find(); // get from database, list of products
    res.status(200).json(products); // send to frontend

  } catch (error) {
    res.status(404).json({ message: error.message });
  }
})

export default router;