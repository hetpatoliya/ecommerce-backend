import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware";
import { createOrder, deleteOrder, getMyOrders, getOrderById, updateOrder } from "./order.controller";

const router = Router();
router.use(authMiddleware);

router.post("/", createOrder);
router.get("/", getMyOrders);
router.get("/:id", getOrderById);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);

export default router;
