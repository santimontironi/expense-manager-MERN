import api from "./api";
import type { CreateExpenseCredentials } from "../types/expense.types";
import { expenseSchema } from "../../../shared/schemas/expense-schema";

export const createExpenseService = async (expenseData: CreateExpenseCredentials) => {
    const response = await api.post("/expenses", expenseData)
    return expenseSchema.parse(response.data)
}

export const getAllExpensesService = async () => {
    const response = await api.get("/expenses")
    return expenseSchema.array().parse(response.data)
}