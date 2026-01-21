import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { mysqlPool } from "../../config/mysql";
import { env } from "../../config/env";
import { ApiError } from "../../utils/apiError";

export async function registerUser(username: string, password: string) {
    const [existing] = await mysqlPool.query("SELECT id FROM users WHERE username=?", [username]);
    const rows = existing as any[];
    if (rows.length > 0) throw new ApiError(409, "Username already exists");

    const hashed = await bcrypt.hash(password, 10);
    const [result] = await mysqlPool.query("INSERT INTO users(username,password) VALUES(?,?)", [username, hashed]);
    const insertRes = result as any;
    return { id: insertRes.insertId, username };
}

export async function loginUser(username: string, password: string) {
    const [result] = await mysqlPool.query("SELECT * FROM users WHERE username=?", [username]);
    const rows = result as any[];
    if (rows.length === 0) throw new ApiError(401, "Invalid credentials");

    const user = rows[0];
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) throw new ApiError(401, "Invalid credentials");

    const jwtSecret = env.JWT_SECRET;
    const jwtExpireIn = env.JWT_EXPIRES_IN;

    if (!jwtSecret || !jwtExpireIn) {
        throw new Error("JWT_SECRET is not defined");
    }


    const token = jwt.sign(
        { id: user.id, username: user.username },
        jwtSecret,
        {
            expiresIn: jwtExpireIn as any,
        }
    );


    return { token, user: { id: user.id, username: user.username } };
}
