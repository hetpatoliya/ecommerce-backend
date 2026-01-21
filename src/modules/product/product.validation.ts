import { z } from "zod";

export const productCreateSchema = z.object({
    name: z.string().min(2),
    price: z.number().min(0),
    description: z.string().min(5)
});

export const productUpdateSchema = productCreateSchema.partial();
