import { useQuery } from "@tanstack/react-query";
import { getLastWeekReportService } from "../../services/report.service";

export const useLastWeek = () => {
  return useQuery({
    queryKey: ["reports", "last-week"],
    queryFn: getLastWeekReportService,
    retry: false,
  });
};
