import { z } from "zod"

export const dayReportSchema = z.object({
    date: z.string(),
    count: z.number(),
    total: z.number(),
})

export const categoryLimitStatusSchema = z.object({
    categoryId: z.string(),
    name: z.string(),
    spendingLimit: z.number(),
    monthSpent: z.number(),
    overLimit: z.boolean(),
})
