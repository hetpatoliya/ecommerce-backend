import axios from "axios";
import { env } from "../../config/env";
import { ApiError } from "../../utils/apiError";

export async function getWeatherByCity(city: string) {
    if (!env.OPENWEATHER_API_KEY) throw new ApiError(500, "OpenWeather API key missing");

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        city
    )}&appid=${env.OPENWEATHER_API_KEY}&units=metric`;

    const resp = await axios.get(url);
    return resp.data;
}
