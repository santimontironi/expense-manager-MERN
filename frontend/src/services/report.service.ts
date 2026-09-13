import api from "./api";
import { dayReportSchema, categoryLimitStatusSchema } from "../../../shared/schemas/report-schema";

export const getLastWeekReportService = async () => {
    const response = await api.get("/reports/last-week")
    return dayReportSchema.array().parse(response.data)
}

export const getCategoryLimitStatusService = async () => {
    const response = await api.get("/reports/category-limits")
    return categoryLimitStatusSchema.array().parse(response.data)
}
