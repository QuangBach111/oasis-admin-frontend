/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { formatCurrency } from "../../utils/helpers";
import Stat from "./Stat";
import { HiOutlineBanknotes, HiOutlineBriefcase, HiOutlineCalendarDays, HiOutlineChartBar } from "react-icons/hi2";
function Stats({ bookings, confirmStays, numDays, cabinCounts }) {
  // 1.
  const numOfBooking = bookings?.length;

  // 2.
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

  // 3. 
  const checkin = confirmStays.length;

  // 4.
  const occupation = confirmStays.reduce((acc, cur) => acc + cur.numNights, 0) / (cabinCounts * numDays);

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numOfBooking}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkin}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupation * 100) + '%'}
      />
    </>
  );
}

export default Stats;
