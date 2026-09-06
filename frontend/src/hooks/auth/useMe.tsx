import { useQuery } from "@tanstack/react-query";
import { meService } from "../../services/auth.service";

export const meQueryKey = ["me"];

export const useMe = () => {
  return useQuery({
    queryKey: meQueryKey,
    queryFn: meService,
    retry: false,
  });
};
