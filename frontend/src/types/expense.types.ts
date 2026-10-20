import { createExpenseSchema, expenseSchema, editExpenseSchema } from "../../../shared/schemas/expense-schema";
import { z } from "zod";

export type CreateExpenseCredentials = z.infer<typeof createExpenseSchema>
export type EditExpenseCredentials = z.infer<typeof editExpenseSchema>
export type Expense = z.infer<typeof expenseSchema>