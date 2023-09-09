import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { doLogout } from "../../services/apiAuthentication";

export function useLogout() {
  const navigate = useNavigate();

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: () => {
      localStorage.removeItem("token");
      doLogout();
      navigate("/login");
    }
  });
  return { logout, isLoading };

}