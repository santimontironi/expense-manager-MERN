import { useQuery } from "@tanstack/react-query";
import { getTopExpensesReportService } from "../../services/report.service";

export const useTopExpenses = () => {
  return useQuery({
    queryKey: ["reports", "top-expenses"],
    queryFn: getTopExpensesReportService,
    retry: false,
  });
};
