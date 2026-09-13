import { z } from "zod"
import { expenseSchema } from "./expense-schema.js"

export const categorySchema = z.object({
    _id: z.string(),
    name: z.string(),
    color: z.string(),
    spendingLimit: z.number().positive(),
    expenseCount: z.number().int().nonnegative().optional(),
    createdAt: z.string(),
    updatedAt: z.string(),
})

export const createCategorySchema = z.object({
    name: z.string().min(2).max(100),
    color: z.string().min(7, { message: "El color debe tener 7 caracteres" }).max(7, { message: "El color debe tener 7 caracteres" }),
    spendingLimit: z.number().positive({ message: "El límite de gasto debe ser mayor a 0" })
})

export const editCategorySchema = createCategorySchema

export const categoryDetailSchema = z.object({
    category: categorySchema,
    expenses: z.array(expenseSchema.omit({ categoryId: true })),
})
