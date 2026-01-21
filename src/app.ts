import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import authRoutes from "./modules/auth/auth.routes";
import productRoutes from "./modules/product/product.routes";
import orderRoutes from "./modules/order/order.routes";
import weatherRoutes from "./modules/weather/weather.routes";
import { errorMiddleware } from "./middleware/error.middleware";

export function createApp() {
    const app = express();

    app.use(cors({ origin: true, credentials: true }));
    app.use(helmet());
    app.use(express.json());

    app.use(
        rateLimit({
            windowMs: 10 * 60 * 1000,
            limit: 100
        })
    );

    app.get("/", (req, res) => res.json({ success: true, message: "API running" }));

    app.use("/api/auth", authRoutes);
    app.use("/api/products", productRoutes);
    app.use("/api/orders", orderRoutes);
    app.use("/api/weather", weatherRoutes);

    app.use(errorMiddleware);

    return app;
}
