import { z } from "zod"
import { expenseSchema } from "./expense-schema.js"

export const categorySchema = z.object({
    _id: z.string(),
    name: z.string(),
    color: z.string(),
    expenseCount: z.number().int().nonnegative().optional(),
    createdAt: z.string(),
    updatedAt: z.string(),
})

export const createCategorySchema = z.object({
    name: z.string().min(2).max(100),
    color: z.string()
})

export const categoryDetailSchema = z.object({
    category: categorySchema,
    expenses: z.array(expenseSchema.omit({ categoryId: true })),
})
