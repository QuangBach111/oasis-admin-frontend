/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import { format, isToday } from "date-fns";

import styled from "styled-components";

import Table from "../../ui/Table";
import Tag from "../../ui/Tag";
import Menus from "../../ui/Menus";
import { HiArrowDownOnSquare, HiArrowUpOnSquare, HiEye, HiMiniArchiveBoxXMark, HiTrash } from "react-icons/hi2";

import { useChecking } from "../check-in-out/useChecking";
import { formatCurrency, createDate } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteBooking } from "./useDeleteBooking";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({
  booking: {
    id: bookingId,
    createdAt,
    startDate,
    endDate,
    numNights,
    numGuests,
    totalPrice,
    status,
    guest: { fullName: guestName, email },
    cabin: { name: cabinName },
  },
}) {
  const navigate = useNavigate();

  const statusToTagName = {
    UNCONFIRMED: "blue",
    CHECKIN: "green",
    CHECKOUT: "silver",
  };
  const { deleteBooking, isDeletingBooking } = useDeleteBooking();
  const { isCheckingIn, checkin } = useChecking();

  function handleCheckout() {
    checkin({
      id: bookingId,
      status: "CHECKOUT"
    });
  }

  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(createDate(startDate))
            ? "Today"
            : formatDistanceFromNow(createDate(startDate))}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(createDate(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(createDate(endDate), "MMM dd yyyy")}
        </span>
      </Stacked >

      <Tag type={statusToTagName[status]}> {status}</Tag >

      <Amount>{formatCurrency(totalPrice)}</Amount>
      <div>

        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={bookingId} />
            <Menus.List id={bookingId}>
              <Menus.Button icon={<HiEye />} onClick={() => navigate(`/bookings/${bookingId}`)}>
                See Details
              </Menus.Button>
              {status === "UNCONFIRMED" &&
                <Menus.Button icon={<HiArrowDownOnSquare />} onClick={() => navigate(`/checkin/${bookingId}`)}>
                  Check in
                </Menus.Button>
              }
              {status === "CHECKIN" &&
                <Menus.Button icon={<HiArrowUpOnSquare />} onClick={() => handleCheckout()}>
                  Check out
                </Menus.Button>
              }
              <Modal.Open opens="delete booking">
                <Menus.Button icon={<HiTrash />} >
                  Delete
                </Menus.Button>
              </Modal.Open>

            </Menus.List>
            <Modal.Window name={"delete booking"}>
              <ConfirmDelete
                resourceName={`Booking ${bookingId}`}
                disabled={isDeletingBooking}
                onConfirm={() => deleteBooking(bookingId)}
              />
            </Modal.Window>

          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row >
  );
}

export default BookingRow;
