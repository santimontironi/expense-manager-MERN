import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeExpenseCategoryService } from "../../services/expense.service";

export const useChangeExpenseCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: changeExpenseCategoryService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      queryClient.invalidateQueries({ queryKey: ["reports"] });
    },
  });
};
