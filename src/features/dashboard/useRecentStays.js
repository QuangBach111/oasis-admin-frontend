import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStayAfterDate } from "../../services/apiBookings";

export function useRecentStays() {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));


  const queryDate = subDays(new Date(), numDays).toISOString();

  const { data: stays, isLoading } = useQuery({
    queryFn: () => getStayAfterDate(queryDate),
    queryKey: ['bookings', `last-${numDays}`]
  });

  const confirmedStays = stays?.filter(
    (stay) => stay.status === "CHECKIN" || stay.status === "CHECKOUT"
  );
  return { isLoading, stays, confirmedStays };
}