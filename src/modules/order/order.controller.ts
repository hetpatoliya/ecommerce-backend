import { Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { AuthRequest } from "../../middleware/auth.middleware";
import { Order } from "./order.model";
import { Product } from "../product/product.model";
import { ApiError } from "../../utils/apiError";
import { orderCreateSchema, orderUpdateSchema } from "./order.validation";

export const createOrder = asyncHandler(async (req: AuthRequest, res: Response) => {
    const body = orderCreateSchema.parse(req.body);
    const products = await Product.find({ _id: { $in: body.productIds } });

    if (products.length !== body.productIds.length) {
        throw new ApiError(400, "Some products invalid");
    }

    const total = products.reduce((sum: any, p: any) => sum + p.price, 0);

    const order = await Order.create({
        userId: req.user!.id,
        productIds: body.productIds,
        totalAmount: total
    });

    res.status(201).json({ success: true, data: order });
});

export const getOrderById = asyncHandler(async (req: AuthRequest, res: Response) => {
    const order = await Order.findById(req.params.id).populate("productIds");
    if (!order) throw new ApiError(404, "Order not found");
    res.json({ success: true, data: order });
});

export const updateOrder = asyncHandler(async (req: AuthRequest, res: Response) => {
    const data = orderUpdateSchema.parse(req.body);
    const updated = await Order.findByIdAndUpdate(req.params.id, data, { new: true });
    if (!updated) throw new ApiError(404, "Order not found");
    res.json({ success: true, data: updated });
});

export const deleteOrder = asyncHandler(async (req: AuthRequest, res: Response) => {
    const deleted = await Order.findByIdAndDelete(req.params.id);
    if (!deleted) throw new ApiError(404, "Order not found");
    res.json({ success: true, message: "Order deleted" });
});

export const getMyOrders = asyncHandler(async (req: AuthRequest, res: Response) => {
    const orders = await Order.find({ userId: req.user!.id })
        .populate("productIds")
        .sort({ createdAt: -1 });

    res.json({ success: true, data: orders });
});
