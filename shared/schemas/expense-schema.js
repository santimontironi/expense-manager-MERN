import {z} from "zod"

export const expenseSchema = z.object({
    _id: z.string(),
    amount: z.number().positive(),
    description: z.string().max(100).optional(),
    paymentMethod: z.enum(['transfer', 'cash']),
    categoryId: z.object({
        _id: z.string(),
        name: z.string(),
    }),
    categorySnapshot: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
})

export const createExpenseSchema = z.object({
    amount: z.number().positive(),
    description: z.string().max(100).optional(),
    paymentMethod: z.enum(['transfer', 'cash']),
    categoryId: z.string(),
})