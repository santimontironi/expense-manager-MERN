import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteExpenseService } from "../../services/expense.service";

export const useDeleteExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteExpenseService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });
};