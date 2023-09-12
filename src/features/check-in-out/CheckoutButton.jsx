/* eslint-disable react/prop-types */
import Button from "../../ui/Button";
import { useChecking } from "./useChecking";

function CheckoutButton({ bookingId }) {
  const { checkin, isCheckingIn } = useChecking();
  return (
    <Button
      variation="danger"
      size="small"
      onClick={() => checkin({ id: bookingId, status: "CHECKOUT" })}
      disabled={isCheckingIn}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
