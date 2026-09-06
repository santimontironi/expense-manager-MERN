import { z } from "zod"

export const categorySchema = z.object({
    _id: z.string(),
    name: z.string(),
    color: z.string(),
    expenseCount: z.number().int().nonnegative().optional(),
    createdAt: z.string(),
    updatedAt: z.string(),
})
