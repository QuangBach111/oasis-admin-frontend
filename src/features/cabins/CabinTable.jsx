/* eslint-disable no-unused-vars */
import { useSearchParams } from "react-router-dom";

import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";

import { useCabins } from "./useCabins";

function CabinTable() {
  const { data, isLoading } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  if (!data) return <Empty resource='cabin'></Empty>;

  const {
    content: cabins,
    totalElements,
    pageable: { pageNumber },
    totalPages
  } = data;

  // 1. Filter
  const filterValue = searchParams.get("discount") || "all";

  // Filter cabins list - will display on screen
  let filteredCabins;
  if (filterValue === "all") filteredCabins = cabins;

  if (filterValue === "no-discount") {
    filteredCabins = cabins.filter(cabin => cabin.discount === 0);
  }

  if (filterValue === "with-discount") {
    filteredCabins = cabins.filter(cabin => cabin.discount > 0);
  }

  // 2. SORT
  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filteredCabins.sort((a, b) => a[field] - b[field] * modifier);

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
          data={sortedCabins}
          render={(cabin) => (<CabinRow cabin={cabin} key={cabin.id} />)}
        />
      </Table>
      <p>{`${pageNumber}  ${totalElements}  ${totalPages}`}</p>
    </Menus>
  );
}

export default CabinTable

