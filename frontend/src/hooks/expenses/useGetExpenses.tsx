import { useQuery } from "@tanstack/react-query";
import { getExpensesService } from "../../services/expenses.service";

export const useGetExpenses = () => {
  return useQuery({
    queryKey: ["expenses"],
    queryFn: getExpensesService,
    retry: false,
  });
};
