import api from "./api";
import { dayReportSchema } from "../../../shared/schemas/report-schema";

export const getLastWeekReportService = async () => {
    const response = await api.get("/reports/last-week")
    return dayReportSchema.array().parse(response.data)
}
