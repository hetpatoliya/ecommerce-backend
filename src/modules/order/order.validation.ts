import { z } from "zod";

export const orderCreateSchema = z.object({
    productIds: z.array(z.string().min(1)).min(1)
});

export const orderUpdateSchema = z.object({
    productIds: z.array(z.string()).optional(),
    totalAmount: z.number().min(0).optional()
});
