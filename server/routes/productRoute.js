import express from "express";
const router = express.Router()
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct, createProductReview } from "../controllers/productController.js";
import { protect } from "../middleware/authMiddleware.js";
import Product from "../models/productModel.js";

router.get('/', getProducts)
router.get('/:id', getProductById)
router.post('/', protect, createProduct)
router.put('/:id', protect, updateProduct)
router.delete('/:id', deleteProduct)
router.post('/:id/review', protect, createProductReview)


router.get("/category/:categoryName", async (req, res) => {
    try {
      const categoryName = req.params.categoryName;
      const products = await Product.find({ category: categoryName });
  
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Server Error", error });
    }
  });




export default router;
