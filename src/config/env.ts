import dotenv from "dotenv";
dotenv.config();

export const env = {
    PORT: process.env.PORT || "5000",
    MONGO_URI: process.env.MONGO_URI || "",
    MYSQL_HOST: process.env.MYSQL_HOST || "localhost",
    MYSQL_USER: process.env.MYSQL_USER || "root",
    MYSQL_PASSWORD: process.env.MYSQL_PASSWORD || "",
    MYSQL_DB: process.env.MYSQL_DB || "",
    JWT_SECRET: process.env.JWT_SECRET || "secret",
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d",
    OPENWEATHER_API_KEY: process.env.OPENWEATHER_API_KEY || ""
};
