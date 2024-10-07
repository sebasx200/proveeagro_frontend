import { useState, useEffect } from "react";
import useFetchData from "../../hooks/useFetchData";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser";

function SupplierList() {
  const [searchText, setSearchText] = useState("");
  const [filterSelect, setFilterSelect] = useState(null);
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const { user } = useUser();
  const navigate = useNavigate();

  // Fetch the suppliers using the useFetchData hook
  const {
    data: suppliers,
    loading: loadingSuppliers,
    error: errorSuppliers,
  } = useFetchData("/supplier/suppliers/");

  useEffect(() => {
    const filtered = suppliers.filter((supplier) => {
      if (filterSelect === "1") return true; // All suppliers
      if (filterSelect === "2") return supplier.created_by === user.id; // Added by current user
      if (filterSelect === "3") return supplier.is_added_by_superuser === true; // Suppliers added by superusers
      return true;
    });
    setFilteredSuppliers(filtered);
  }, [filterSelect, suppliers, user]);

  // these are the table columns
  const columns = [
    {
      name: "Nombre",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Dirección",
      selector: (row) => row.location.address,
      sortable: true,
    },

    {
      name: "Correo electrónico",
      selector: (row) => row.email,
      sortable: true,
    },
  ];

  // this handles the click on a table row
  const handleRowClick = (row) => {
    navigate(`/supplier/suppliers/${row.id}/`);
  };

  // this filters the suppliers taking the text in the search box
  const searchedSuppliers = filteredSuppliers.filter((supplier) =>
    supplier.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleFilter = (e) => {
    setFilterSelect(e.target.value);
  };

  return (
    <div>
      <div className="row">
        <div className="col-md-4">
          {/* This is the searching input */}
          <div className="d-flex gap-3 mb-3">
            <input
              className="form-control"
              type="text"
              placeholder="Buscar proveedor"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <select className="form-select" onChange={handleFilter}>
              <option value="">Seleccionar filtro</option>
              <option value={"1"}>Todos los proveedores</option>
              <option value={"2"}>Añadidos por mí</option>
              <option value={"3"}>Proveedores por defecto</option>
            </select>
          </div>
        </div>
      </div>
      {/* Table of suppliers */}
      {loadingSuppliers ? (
        <div>Cargando proveedores...</div>
      ) : (
        <DataTable
          columns={columns}
          data={searchedSuppliers}
          title="Proveedores registrados"
          selectableRowsHighlight
          onRowClicked={handleRowClick}
          pagination
          paginationRowsPerPageOptions={[5, 10, 15, 30, 50, 75, 100]}
          highlightOnHover
          pointerOnHover
          striped
        />
      )}
      {errorSuppliers && <div>Error al cargar los proveedores...</div>}
    </div>
  );
}

export default SupplierList;
