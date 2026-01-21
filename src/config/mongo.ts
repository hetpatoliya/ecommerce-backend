import mongoose from "mongoose";
import { env } from "./env";

export async function connectMongo() {
    if (!env.MONGO_URI) throw new Error("MONGO_URI missing");
    await mongoose.connect(env.MONGO_URI);
    console.log("✅ MongoDB connected");
}
