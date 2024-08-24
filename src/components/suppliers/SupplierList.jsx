import { useState, useEffect } from "react";
import { getSuppliers, supplierApi, updateSupplier } from "../../api/supplierApi";
import DataTable from "react-data-table-component";
import { toast } from "react-hot-toast";
import { LocationMap } from "../Maps";
import Modal from "react-modal";
import CustomModal from "../CustomModal";
import useCitiesDepartments from "../useCitiesDepartments";

Modal.setAppElement("#root");

function SupplierList() {
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { departments, cities, handleDepartmentChange } =
    useCitiesDepartments();

  useEffect(() => {
    // function to fetch the data
    async function fetchData() {
      try {
        const responseSuppliers = await getSuppliers();
        setSuppliers(responseSuppliers.data);
      } catch (error) {
        toast.error("Error al cargar los datos " + error.message, {
          duration: 5000,
        });
      }
    }
    // call the function
    fetchData();
  }, []);

  const buttonAgenda = {
    name: "MI AGENDA",
    cell: (row) => (
      <button
        onClick={() => handleButtonClick(row)}
        style={{
          backgroundColor: "#208454",
          color: "white",
          border: "none",
          padding: "5px 10px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Agregar
      </button>
    ),
    ignoreRowClick: true,
    button: true,
  };

  const columns = [
    {
      name: "NOMBRE",
      selector: (row) => row.name,
    },
    {
      name: "DIRECCIÓN",
      selector: (row) => row.location.address,
    },

    buttonAgenda,
  ];

  const handleRowClick = (row) => {
    setSelectedSupplier(row);
    setModalIsOpen(true);
  };

  const handleUpdate = async () => {
    try {
      await updateSupplier(selectedSupplier.id, selectedSupplier);
      toast.success("Proveedor actualizado correctamente", {
        duration: 5000,
      });
      setModalIsOpen(false);
    } catch (error) {
      toast.error("Error al actualizar el proveedor " + error.message, {
        duration: 5000,
      });
    }
  };

  // Function to handle the change on the form to edit the farm
  const handleChange = (event) => {
    const { name, value } = event.target;
    setSelectedSupplier((prevSupplier) => {
      if (name in prevSupplier) {
        return { ...prevSupplier, [name]: value };
      } else if (prevSupplier.location && name in prevSupplier.location) {
        return {
          ...prevSupplier,
          location: { ...prevSupplier.location, [name]: value },
        };
      }
      return prevSupplier;
    });
  };

  // Function to handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate(selectedSupplier);
  };

  const handleSupplierDelete = () => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que quieres eliminar el proveedor?"
    );
    if (confirmDelete) {
      deleteRequest();
    }
  };

  const deleteRequest = async () => {
    try {
      await supplierApi.delete(`/supplier/suppliers/${selectedSupplier.id}/`);
      toast.success("Proveedor eliminado correctamente", {
        duration: 5000,
      });
      setModalIsOpen(false);
    } catch (error) {
      toast.error("Error al eliminar el proveedor " + error.message, {
        duration: 5000,
      });
    }
  };

  const [searchText, setSearchText] = useState("");

  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleButtonClick = (row) => {
    alert("Proveedor agregado a la agenda");
  }

  return (
    <div className=" mt-5">
      <div className="row">
        <div className="col-md-3">
          <input
            className="form-control mb-3"
            type="text"
            placeholder="Buscar proveedor"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </div>
      <DataTable
        columns={columns}
        data={filteredSuppliers}
        title="Proveedores registrados"
        selectableRowsHighlight
        onRowClicked={handleRowClick}
        pagination
        paginationRowsPerPageOptions={[5, 10, 15, 30, 50, 75, 100]}
        highlightOnHover
        pointerOnHover
        striped
      />
      <CustomModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        initialData={selectedSupplier}
      >
        {/* Form to edit the farm*/}
        {selectedSupplier && (
          <div className="row">
            <div className="col-md-6">
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-2">
                  <label htmlFor="name">Nombre</label>
                  <input
                    type="text"
                    className="form-control mb-2"
                    id="name"
                    name="name"
                    value={selectedSupplier.name}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="address">Dirección</label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    name="address"
                    value={selectedSupplier.location.address}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="department">Departamento</label>
                  <select
                    className="form-select"
                    onChange={handleDepartmentChange}
                    id="department"
                    name="department"
                  >
                    <option value="">Selecciona el departamento</option>
                    {departments.map((department) => (
                      <option key={department.id} value={department.id}>
                        {department.name}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="city">Ciudad</label>
                  <select
                    className="form-select"
                    id="city"
                    name="city"
                    onChange={handleChange}
                  >
                    <option value="">Selecciona la ciudad</option>
                    {cities.map((city) => (
                      <option key={city.id} value={city.id}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </div>
                <button className="btn btn-primary">Guardar cambios</button>
                <button
                  className="btn btn-danger m-2"
                  onClick={handleSupplierDelete}
                >
                  Eliminar proveedor
                </button>
              </form>
            </div>
            <div className="col-md-6">
              <h2>Ubicación</h2>
              {selectedSupplier.location?.latitude &&
              selectedSupplier.location?.longitude ? (
                <LocationMap
                  lat={selectedSupplier.location.latitude}
                  lng={selectedSupplier.location.longitude}
                  popupText={selectedSupplier.location.address}
                />
              ) : (
                <p>
                  Ubicación no disponible: no se han proporcionado las
                  coordenadas
                </p>
              )}
            </div>
          </div>
        )}
        {/* end of the form */}
      </CustomModal>
    </div>
  );
}

export default SupplierList;
