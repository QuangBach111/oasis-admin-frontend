import { useMutation } from "@tanstack/react-query";
import { doLogin } from "../../services/apiAuthentication";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => doLogin({ email, password }),
    onSuccess: (data) => {
      console.log('data', data);
      // store data in localStorage
      localStorage.setItem("token", data);
      navigate("/dashboard");
      toast.success("Welcome!");
    },
    onError: (err) => toast(err.message)
  });

  return { login, isLoading };
}