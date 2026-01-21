import { Router } from "express";
import { getWeather } from "./weather.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

const router = Router();
router.use(authMiddleware);

router.get("/", getWeather);
export default router;
