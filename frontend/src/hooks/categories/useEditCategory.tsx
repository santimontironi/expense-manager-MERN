import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editCategoryService } from "../../services/categories.service";

export const useEditCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editCategoryService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      queryClient.invalidateQueries({ queryKey: ["reports"] });
    },
  });
};
