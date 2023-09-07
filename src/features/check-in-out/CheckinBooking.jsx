/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useMoveBack } from "../../hooks/useMoveBack";

import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";

import { useBooking } from "../bookings/useBooking";
import { useChecking } from "./useChecking";
import { useSettings } from "../settings/useSettings";
import { formatCurrency } from "../../utils/helpers";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);

  const { booking, isLoading } = useBooking();
  const moveBack = useMoveBack();

  const { setting, isSetting } = useSettings();
  useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking?.isPaid]);

  const { checkin, isCheckingIn } = useChecking();

  if (isLoading || isSetting) return <Spinner />;

  const {
    id: bookingId,
    guest,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optionalBreakfastPrice = addBreakfast && !hasBreakfast ?
    setting.breakfastPrice * numGuests * numNights : 0;

  function handleCheckin() {
    if (!confirmPaid) return;
    checkin({
      id: bookingId,
      status: "CHECKIN",
      isPaid: confirmPaid,
      hasBreakfast: hasBreakfast ? hasBreakfast : addBreakfast,
      extrasPrice: optionalBreakfastPrice,
      totalPrice: totalPrice + optionalBreakfastPrice
    });
  }

  function onChangeAddBreakfast() {
    setAddBreakfast(!addBreakfast);
    setConfirmPaid(false);
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} extras={optionalBreakfastPrice} />

      {!hasBreakfast &&
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={onChangeAddBreakfast}
            disabled={booking.hasBreakfast || isCheckingIn}
          >
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
          </Checkbox>
        </Box>
      }

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid(!confirmPaid)}
          disabled={booking.isPaid || isCheckingIn}
        >
          I confirm that {guest.fullName} has paid the total amount of{" "}
          {!addBreakfast ? formatCurrency(totalPrice) : `${formatCurrency(totalPrice)} + ${formatCurrency(optionalBreakfastPrice)}`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid}>Check in booking #{bookingId}</Button>
        <Button variation="secondary" onClick={moveBack} disabled={isCheckingIn}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
