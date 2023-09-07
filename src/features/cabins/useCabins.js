import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";
import { useSearchParams } from "react-router-dom";

export function useCabins() {
  const [searchParams] = useSearchParams();

  // SORT BY
  const sortBy = searchParams.get("sortBy") || "";

  // FILTER
  const filter = searchParams.get("discount") || "all";

  // PAGINITION
  const pageNo = searchParams.get("page") || 1;

  const {
    data,
    isLoading,
    error
  }
    = useQuery({
      queryKey: ['cabins', sortBy, filter, pageNo],
      queryFn: () => getCabins({ sortBy, filter, pageNo }),
    });


  return { data, isLoading, error };
}