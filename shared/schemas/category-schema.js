import { z } from "zod"

export const categoryResponseSchema = z.object({
    _id: z.string(),
    name: z.string(),
    color: z.string(),
    expenseCount: z.number().int().nonnegative().optional(),
    createdAt: z.string(),
    updatedAt: z.string(),
})
