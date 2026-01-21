import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { registerSchema, loginSchema } from "./auth.validation";
import { loginUser, registerUser } from "./auth.service";

export const register = asyncHandler(async (req: Request, res: Response) => {
    const data = registerSchema.parse(req.body);
    const user = await registerUser(data.username, data.password);
    res.status(201).json({ success: true, data: user });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
    const data = loginSchema.parse(req.body);
    const result = await loginUser(data.username, data.password);
    res.json({ success: true, data: result });
});
