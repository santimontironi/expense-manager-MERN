import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editExpenseService } from "../../services/expense.service";

export const useEditExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editExpenseService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["reports"] });
    },
  });
};
