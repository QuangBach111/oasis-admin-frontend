import { useMutation } from "@tanstack/react-query";
import { doRegister } from "../../services/apiAuthentication";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: doRegister,
    onSuccess: () => {
      toast.success("Account successfully created!");
    },
    onError: (err) => toast.error(err.message)
  });

  return { signup, isLoading };
}