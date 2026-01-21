import { Request, Response } from "express";
import { Product } from "./product.model";
import { asyncHandler } from "../../utils/asyncHandler";
import { ApiError } from "../../utils/apiError";
import { productCreateSchema, productUpdateSchema } from "./product.validation";

export const createProduct = asyncHandler(async (req: Request, res: Response) => {
    const data = productCreateSchema.parse(req.body);
    const product = await Product.create(data);
    res.status(201).json({ success: true, data: product });
});

export const getProducts = asyncHandler(async (req: Request, res: Response) => {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json({ success: true, data: products });
});

export const getProductById = asyncHandler(async (req: Request, res: Response) => {
    const product = await Product.findById(req.params.id);
    if (!product) throw new ApiError(404, "Product not found");
    res.json({ success: true, data: product });
});

export const updateProduct = asyncHandler(async (req: Request, res: Response) => {
    const data = productUpdateSchema.parse(req.body);
    const product = await Product.findByIdAndUpdate(req.params.id, data, { new: true });
    if (!product) throw new ApiError(404, "Product not found");
    res.json({ success: true, data: product });
});

export const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) throw new ApiError(404, "Product not found");
    res.json({ success: true, message: "Product deleted" });
});
