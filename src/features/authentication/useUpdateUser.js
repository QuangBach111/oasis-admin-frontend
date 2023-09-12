import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser as updateUserApi } from "../../services/apiUser";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateUserApi,
    onSuccess: (user) => {
      console.log('user', user);

      toast.success("Updated successful!");
      queryClient.invalidateQueries("user");
    },
    onError: () => toast.error("Updated Failed! Please try again!")
  });

  return { updateUser, isUpdating };
}