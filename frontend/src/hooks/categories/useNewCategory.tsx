import { useMutation, useQueryClient } from "@tanstack/react-query";
import { newCategoryService } from "../../services/categories.service";

export const useNewCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: newCategoryService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};
