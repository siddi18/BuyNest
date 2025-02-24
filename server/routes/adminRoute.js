import express from "express";
const router = express.Router();
import Product from "../models/productModel.js";

router.get("/", async (req, res) => {
  try {
    const pageSize = 10; // Number of products per page
    const page = Number(req.query.pageNumber) || 1; // Default to page 1

    const count = await Product.countDocuments(); // Total number of products
    const products = await Product.find({})
      .limit(pageSize)
      .skip(pageSize * (page - 1)); // Pagination logic

    res.status(200).json({ products, page, pages: Math.ceil(count / pageSize) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error: Failed to fetch products" });
  }
});


export default router;
