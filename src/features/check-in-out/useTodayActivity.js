import { useQuery } from "@tanstack/react-query";
import { getStayAfterDate } from "../../services/apiBookings";
import { getToday } from "../../utils/helpers";

export function useTodayActivity() {
  const today = getToday({ end: false });
  const { data: todayBooking, isLoading } = useQuery({
    queryFn: () => getStayAfterDate(today),
    queryKey: ["today-activity"]
  });

  return { todayBooking, isLoading };
}