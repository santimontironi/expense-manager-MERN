import { useQuery } from "@tanstack/react-query";
import { getCategoryLimitStatusService } from "../../services/report.service";

export const useCategoryLimitStatus = () => {
  return useQuery({
    queryKey: ["reports", "category-limits"],
    queryFn: getCategoryLimitStatusService,
    retry: false,
  });
};
