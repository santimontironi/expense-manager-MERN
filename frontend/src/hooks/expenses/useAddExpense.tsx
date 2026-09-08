import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createExpenseService } from "../../services/expenses.service";

export const useAddExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createExpenseService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });
};
