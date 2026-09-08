import { useQuery } from "@tanstack/react-query";
import { getCategoryByIdService } from "../../services/categories.service";

export const useGetCategoryById = (id: string) => {
  return useQuery({
    queryKey: ["categories", id],
    queryFn: () => getCategoryByIdService(id),
    retry: false,
  });
};
