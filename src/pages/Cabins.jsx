import CabinTable from "../features/cabins/CabinTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Button from "../ui/Button";
import { useState } from "react";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
function Cabins() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter / Sort</p>
      </Row>
      <Row type="vertical">
        <CabinTable />

        <Button
          sizes="large"
          variation={showForm ? 'danger' : 'primary'}
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Close Form" : "Add new cabin"}

        </Button>
        {showForm && <CreateCabinForm type="Add Cabin" />}
      </Row >
    </>
  );
}

export default Cabins;
