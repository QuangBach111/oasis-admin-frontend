import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";


export function useBookings() {
  const [searchParams] = useSearchParams();

  // FILTER
  const filterValue = searchParams.get("status");
  const filter = !filterValue || filterValue === "all"
    ? null
    : { field: "bookingStatus", value: filterValue };

  //SORT BY
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  //Pagination
  const pageNo = searchParams.get("page") || 1;

  const {
    data,
    isLoading,
    error
  } = useQuery({
    queryKey: ['bookings', filter, sortBy, pageNo],
    queryFn: () => getBookings({ filter, sortBy, pageNo })
  });

  return { data, isLoading, error };
}