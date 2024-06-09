import { useState, useEffect } from "react";
import { getSuppliers, getCities } from "../../api/supplierApi";
import DataTable from "react-data-table-component";
import { toast } from "react-hot-toast";
import { LocationMap } from "../Maps";
import Modal from "react-modal";

Modal.setAppElement("#root");

function SupplierList() {
  const [suppliers, setSuppliers] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    // function to fetch the data
    async function fetchData() {
      try {
        const responseSuppliers = await getSuppliers();
        setSuppliers(responseSuppliers.data);
        const responseCities = await getCities();
        setCities(responseCities.data);
      } catch (error) {
        toast.error("Error al cargar los datos " + error.message, {
          duration: 5000,
        });
      }
    }
    // call the function
    fetchData();
  }, []);

  const columns = [
    {
      name: "NOMBRE",
      selector: (row) => row.name,
    },
    {
      name: "DIRECCIÓN",
      selector: (row) => row.location.address,
    },
  ];

  const handleRowClick = (row) => {
    setSelectedSupplier(row);
    setModalIsOpen(true);
  };

  return (
    <div className=" mt-5">
      
      <DataTable
        columns={columns}
        data={suppliers}
        title="Proveedores registrados"
        selectableRowsHighlight
        onRowClicked={handleRowClick}
        pagination
        highlightOnHover
        pointerOnHover
        striped
      />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Selected Supplier"
        style={{
          content: {
            width: "60%",
            height: "60%",
            margin: "auto",
          },
        }}
      >
          <button
              className="btn btn-close"
              onClick={() => setModalIsOpen(false)}
              style={{ position: "absolute", top: "10px", right: "10px" }}
            >
            </button>
        {selectedSupplier && (
          <div className="row">
            <div className="col-md-6">
            <h2>Detalles proveedor seleccionado</h2>
            <p>Nombre: {selectedSupplier.name}</p>
            <p>Dirección: {selectedSupplier.location.address}</p>
            <p>Ciudad: {selectedSupplier.location.city.name}</p>
            </div>
            <div className="col-md-6">
            <h2>Ubicación</h2>
          
            <LocationMap
              lat={selectedSupplier.location.latitude}
              lng={selectedSupplier.location.longitude}
              popupText={selectedSupplier.location.address}
            />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default SupplierList;
