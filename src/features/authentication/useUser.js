import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiUser";

export function useUser() {
  const { isLoading, data: user, error } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  return { user, isLoading, error };
}