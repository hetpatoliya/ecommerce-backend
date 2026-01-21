import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { getWeatherByCity } from "./weather.service";

export const getWeather = asyncHandler(async (req: Request, res: Response) => {
    const city = (req.query.city as string) || "Ahmedabad";
    const data = await getWeatherByCity(city);
    res.json({ success: true, data });
});
