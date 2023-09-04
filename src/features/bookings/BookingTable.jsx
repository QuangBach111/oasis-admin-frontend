/* eslint-disable no-unused-vars */
import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
// import Pagination from "../../ui/Pagination";

function BookingTable() {
  const { data, isLoading } = useBooking();
  console.log('data', data);

  if (isLoading) return <Spinner />;

  if (!data) return <Empty resource='booking' />;

  const {
    content: bookings,
    // totalElements,
    // pageable: { pageNumber },
    // totalPages
  } = data.data;

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={bookings.id} booking={booking} />
          )}
        />
        <Table.Footer>
          {/* <Pagination pageNo={pageNumber} totalPage={totalPages} totalElements={totalElements} /> */}
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
