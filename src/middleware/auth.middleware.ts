import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { ApiError } from "../utils/apiError";

export interface AuthRequest extends Request {
    user?: { id: number; username: string };
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) throw new ApiError(401, "Unauthorized");

    const token = header.split(" ")[1];
    try {
        const payload = jwt.verify(token, env.JWT_SECRET) as any;
        req.user = { id: payload.id, username: payload.username };
        next();
    } catch {
        throw new ApiError(401, "Invalid token");
    }
}
