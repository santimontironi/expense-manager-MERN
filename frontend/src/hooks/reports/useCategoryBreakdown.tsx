import { useQuery } from "@tanstack/react-query";
import { getCategoryBreakdownReportService } from "../../services/report.service";

export const useCategoryBreakdown = () => {
  return useQuery({
    queryKey: ["reports", "category-breakdown"],
    queryFn: getCategoryBreakdownReportService,
    retry: false,
  });
};
