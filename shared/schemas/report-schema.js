import { z } from "zod"

export const dayReportSchema = z.object({
    date: z.string(),
    count: z.number(),
    total: z.number(),
})

export const topExpenseReportSchema = z.object({
    id: z.string(),
    name: z.string(),
    amount: z.number(),
    date: z.string(),
    category: z.string(),
    currentCategory: z.string().nullable(),
})

export const monthReportSchema = z.object({
    month: z.string(),
    count: z.number(),
})

export const monthlyExpensesReportSchema = z.object({
    months: monthReportSchema.array(),
    currentMonthCount: z.number(),
})

export const categoryBreakdownReportSchema = z.object({
    categoryId: z.string(),
    name: z.string(),
    color: z.string(),
    deleted: z.boolean(),
    amount: z.number(),
    count: z.number(),
})

export const categoryLimitStatusSchema = z.object({
    categoryId: z.string(),
    name: z.string(),
    spendingLimit: z.number(),
    monthSpent: z.number(),
    overLimit: z.boolean(),
})
