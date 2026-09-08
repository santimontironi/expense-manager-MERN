import { createExpenseSchema, expenseSchema } from "../../../shared/schemas/expense-schema";
import { z } from "zod";

export type CreateExpenseCredentials = z.infer<typeof createExpenseSchema>
export type Expense = z.infer<typeof expenseSchema>