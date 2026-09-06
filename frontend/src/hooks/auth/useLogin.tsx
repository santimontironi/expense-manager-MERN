import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginService } from "../../services/auth.service";
import { meQueryKey } from "./useMe";

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: meQueryKey });
    },
  });
};
