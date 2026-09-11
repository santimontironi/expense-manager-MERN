import { useQuery } from "@tanstack/react-query";
import { getAllExpensesService } from "../../services/expense.service";

export const useGetExpenses = () => {
  return useQuery({
    queryKey: ["expenses"],
    queryFn: getAllExpensesService,
    retry: false,
  });
};
