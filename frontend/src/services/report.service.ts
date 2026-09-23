import api from "./api";
import { dayReportSchema, monthlyExpensesReportSchema, topExpenseReportSchema, categoryBreakdownReportSchema, categoryLimitStatusSchema } from "../../../shared/schemas/report-schema";

export const getLastWeekReportService = async () => {
    const response = await api.get("/reports/last-week")
    return dayReportSchema.array().parse(response.data)
}

export const getMonthlyExpensesReportService = async () => {
    const response = await api.get("/reports/monthly")
    return monthlyExpensesReportSchema.parse(response.data)
}

export const getTopExpensesReportService = async () => {
    const response = await api.get("/reports/top-expenses")
    return topExpenseReportSchema.array().parse(response.data)
}

export const getCategoryBreakdownReportService = async () => {
    const response = await api.get("/reports/category-breakdown")
    return categoryBreakdownReportSchema.array().parse(response.data)
}

export const getCategoryLimitStatusService = async () => {
    const response = await api.get("/reports/category-limits")
    return categoryLimitStatusSchema.array().parse(response.data)
}
