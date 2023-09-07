/* eslint-disable no-unused-vars */

import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";

import { useCabins } from "./useCabins";
import Pagination from "../../ui/Pagination";

function CabinTable() {
  const { data, isLoading } = useCabins();
  console.log('data', data);

  if (isLoading) return <Spinner />;

  if (!data) return <Empty resource='cabin'></Empty>;

  const {
    content: cabins,
    totalElements,
    pageable: { pageNumber, pageSize },
    totalPages
  } = data;





  return (
    <Menus>
      <Table columns="1fr 1.8fr 2.2fr 1fr 1fr 0.5fr">
        <Table.Header role="row">
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={cabins}
          render={(cabin) => (<CabinRow cabin={cabin} key={cabin.id} />)}
        />
      </Table>
      <Table.Footer>
        <Pagination
          totalElements={totalElements}
          pageNumber={pageNumber}
          pageSize={pageSize}
          totalPages={totalPages}
        />
      </Table.Footer>
    </Menus>
  );
}

export default CabinTable

