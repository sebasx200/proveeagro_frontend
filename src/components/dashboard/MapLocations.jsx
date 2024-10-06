import LocationsMap from "../maps/LocationsMap";
import useFetchData from "../../hooks/useFetchData";
import useUser from "../../hooks/useUser";
import { useEffect, useState } from "react";

function MapLocations() {
  const [filterSelect, setFilterSelect] = useState(null);
  const { user } = useUser();

  const {
    data: farmSuppliers,
    loading: loadingLocations,
    error: errorLocations,
  } = useFetchData("location/farms_suppliers_locations/");

  const [farmLocations, setFarmLocations] = useState([]);
  const [supplierLocations, setSupplierLocations] = useState([]);
  const [allLocations, setAllLocations] = useState([]);
  const [selection, setSelection] = useState(null);

  useEffect(() => {
    if (farmSuppliers) {
      const farms = [];
      const suppliers = [];

      for (const item of farmSuppliers) {
        if (item.farms) {
          farms.push(...item.farms);
        }
        if (item.suppliers) {
          suppliers.push(...item.suppliers);
        }
      }
      setFarmLocations(farms);
      setSupplierLocations(suppliers);
    }
  }, [farmSuppliers]);

  useEffect(() => {
    if (farmLocations && supplierLocations) {
      setAllLocations([...supplierLocations, ...farmLocations]);
    }
  }, [farmLocations, supplierLocations]);

  useEffect(() => {
    const filtered = allLocations.filter((item) => {
      if (filterSelect === "1") return true; // All suppliers
      if (filterSelect === "2") return item.created_by === user.id; // Added by current user
      if (filterSelect === "3") return item.is_added_by_superuser === true; // Suppliers added by superusers
      return true;
    });
    setSelection(filtered);
  }, [filterSelect, allLocations, user]);

  const handleFilter = (e) => {
    setFilterSelect(e.target.value);
  };

  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          {/* This is the searching input */}
          <div className="d-flex gap-3 mb-3">
            <h5>Mapa de ubicaciones</h5>
            <select className="form-select" onChange={handleFilter}>
              <option value="">Seleccionar filtro</option>
              <option value={"1"}>Todos los proveedores</option>
              <option value={"2"}>
                Proveedores añadidos por mí Añadidos por mí
              </option>
              <option value={"3"}>Mis fincas</option>
            </select>
          </div>
        </div>
      </div>
      {loadingLocations ? (
        <div>Cargando ubicaciones...</div>
      ) : (
        <>
          {selection ? (
            <LocationsMap data={selection} />
          ) : (
            <div>No se proporcianaron ubicaciones en el mapa</div>
          )}
        </>
      )}
      {errorLocations && <p className="text-danger">Error: {errorLocations}</p>}
    </div>
  );
}

export default MapLocations;
