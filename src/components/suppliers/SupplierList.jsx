import { useState } from "react";
import useFetchData from "../../hooks/useFetchData";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";

function SupplierList() {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  // Fetch the suppliers using the useFetchData hook
  const {
    data: suppliers,
    loading: loadingSuppliers,
    error: errorSuppliers,
  } = useFetchData("/supplier/suppliers/");

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
  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.name.toLowerCase().includes(searchText.toLowerCase())
  );

  if (errorSuppliers) {
    return <div>Error al cargar los proveedores...</div>;
  }

  return (
    <div>
      <div className="row">
        <div className="col-md-3">
          {/* This is the searching input */}
          <input
            className="form-control mb-3"
            type="text"
            placeholder="Buscar proveedor"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </div>
      {/* Table of suppliers */}
      {loadingSuppliers ? (
        <div>loading suppliers...</div>
      ) : (
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
      )}
    </div>
  );
}

export default SupplierList;
