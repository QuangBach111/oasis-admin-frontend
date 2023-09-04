import CreateCabinForm from "./CreateCabinForm";
import Button from '../../ui/Button';
import Modal from "../../ui/Modal";

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add new cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm type="Create New Cabin" />
        </Modal.Window>
      </Modal>
    </div>
  );
}

// function AddCabin() {
//   const [isOpenModal, setIsOpenModal] = useState(false);
//   useEffect(() => {
//     document.addEventListener('keydown', keyDownHandler);
//   });

//   function keyDownHandler(e) {
//     if (e.key === 'Escape') {
//       setIsOpenModal(false);
//     }
//   }

//   return (
//     <div>
//       <Button
//         sizes="large"
//         name="addBtn"
//         onClick={() => setIsOpenModal(true)}
//       >
//         Add new cabin
//       </Button>
//       {isOpenModal && (
//         <Modal onClose={() => setIsOpenModal(false)}>
//           <CreateCabinForm onCloseModal={() => setIsOpenModal(false)} type="Add Cabin" />
//         </Modal>
//       )}
//     </div>
//   );
// }

export default AddCabin;
