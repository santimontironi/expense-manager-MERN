import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCategoryService } from "../../services/categories.service";

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCategoryService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });
};