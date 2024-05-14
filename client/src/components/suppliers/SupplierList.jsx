import { useState, useEffect } from "react";
import supplierApi from "../../api/supplierApi";

function SupplierList() {
  const [suppliers, setSuppliers] = useState([]);

  const getSuppliers = () => {
    supplierApi
      .get("/supplier/suppliers")
      .then((res) => res.data)
      .then((data) => {
        setSuppliers(data);
        console.log(data);
      })
      .catch((error) => alert("Error al cargar los proveedores"));
  };

  useEffect(() => {
    getSuppliers();
  }, []);

  return (
    <div>
      <h2>Suppliers</h2>
    </div>
  );
}

export default SupplierList;