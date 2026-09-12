import { z } from "zod"

export const dayReportSchema = z.object({
    date: z.string(),
    count: z.number(),
    total: z.number(),
})
