/* eslint-disable no-unused-vars */
import styled from "styled-components";
import Spinner from "../../ui/Spinner";

import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";
import { useCabins } from "../cabins/useCabins";
import Stats from "./Stats";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;


function DashboardLayout() {
  // Recent bookings
  const { bookings, isLoading: isBookingsLoading, numDays } = useRecentBookings();

  // Recent confirm bookings
  const { stays, confirmedStays, isLoading: isStaysLoading } = useRecentStays();

  // Cabins
  const { data, isCabinsLoading } = useCabins();


  // Loading
  if (isBookingsLoading || isStaysLoading || isCabinsLoading) return <Spinner />;
  // Total cabin element
  const { totalElements: cabinCounts } = data;


  return (
    <StyledDashboardLayout>
      <Stats bookings={bookings} confirmStays={confirmedStays} numDays={numDays} cabinCounts={cabinCounts} />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />

      <div
        style={{
          gridColumnStart: 1,
          gridColumnEnd: 5
        }}>
        <SalesChart bookings={bookings} numDays={numDays} />
      </div>

    </StyledDashboardLayout >
  );
}

export default DashboardLayout;
