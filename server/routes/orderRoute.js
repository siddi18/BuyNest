import express from "express";
import { addOrderItems, getOrderById, getOrders, getUserOrders, updateOrderToDelivered } from "../controllers/orderController.js";
//import { protect } from "../middleware/authMiddleware.js";

const router = express.Router()

router.post('/',  addOrderItems)
router.get('/user-orders', getUserOrders)
router.get('/',  getOrders)
router.get('/:id', getOrderById)
router.patch('/deliver/:id', updateOrderToDelivered)

export default router;