import { useQuery } from "@tanstack/react-query";
import { getMonthlyExpensesReportService } from "../../services/report.service";

export const useMonthlyExpenses = () => {
  return useQuery({
    queryKey: ["reports", "monthly"],
    queryFn: getMonthlyExpensesReportService,
    retry: false,
  });
};
