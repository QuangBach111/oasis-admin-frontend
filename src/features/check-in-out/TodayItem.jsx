/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import styled from "styled-components";
import Tag from "../../ui/Tag";
import Button from "../../ui/Button";
import ButtonCheckout from "./CheckoutButton";
import { Link } from "react-router-dom";
const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;


function TodayItem({ booking }) {
  const { id, status, guest, numNights } = booking;

  return (
    <StyledTodayItem>
      {status === "UNCONFIRMED" && <Tag type="green">Arriving</Tag>}
      {status === "CHECKIN" && <Tag type="blue">Departing</Tag>}

      <div>{guest?.fullName}</div>
      <div>{numNights} nights</div>

      {status === "UNCONFIRMED" && <Button size="small" variation="primary" as={Link} to={`/checkin/${id}`}>Check in</Button>}
      {status === "CHECKIN" && <ButtonCheckout bookingId={id}>Check out</ButtonCheckout>}
    </StyledTodayItem>
  );
}

export default TodayItem;
