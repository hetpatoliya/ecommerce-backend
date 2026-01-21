import { createApp } from "./app";
import { env } from "./config/env";
import { connectMongo } from "./config/mongo";
import { initMySQL } from "./config/mysql";

async function bootstrap() {
    await connectMongo();
    await initMySQL();

    const app = createApp();
    app.listen(Number(env.PORT), () => console.log(`✅ Server running on http://localhost:${env.PORT}`));
}

bootstrap().catch((err) => {
    console.error("❌ Bootstrap error:", err);
    process.exit(1);
});
