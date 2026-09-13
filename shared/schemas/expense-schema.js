import {z} from "zod"

export const expenseSchema = z.object({
    _id: z.string(),
    amount: z.number().positive(),
    name: z.string(),
    description: z.string().max(100).optional(),
    paymentMethod: z.enum(['transfer', 'cash']),
    categoryId: z.object({
        _id: z.string(),
        name: z.string(),
    }).nullable(),
    categorySnapshot: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
})

export const createExpenseSchema = z.object({
    amount: z.number().positive().min(1, { message: "El importe es requerido" }),
    name: z.string().min(2, { message: "El nombre es requerido" }).max(100),
    description: z.string().max(100).optional(),
    paymentMethod: z.enum(['transfer', 'cash'], { error: "Elegí un método de pago" }),
    categoryId: z.string().min(1, { message: "La categoría es requerida" }),
})