/* eslint-disable no-unused-vars */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useChecking() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: (booking) => updateBooking(booking),

    onSuccess: data => {
      toast.success(`Booking #${data.id} successfully ${data.status}`);
      queryClient.invalidateQueries({ active: true });
      // navigate("/");
    },

    onError: () => toast.error("There was an error while checking"),
  });

  return { checkin, isCheckingIn };
}