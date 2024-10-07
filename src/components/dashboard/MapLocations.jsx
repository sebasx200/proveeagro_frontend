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
  } = useFetchData("location/farm_supplier_locations/");

  const [farmLocations, setFarmLocations] = useState([]);
  const [supplierLocations, setSupplierLocations] = useState([]);
  const [allLocations, setAllLocations] = useState([]);
  const [selection, setSelection] = useState(null);

  // this effect is used to load all the locations from the server and set them according to its type
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

  // when all the data is ready the allLoaction state is fill with all the locations
  useEffect(() => {
    if (farmLocations && supplierLocations) {
      setAllLocations([...supplierLocations, ...farmLocations]);
    }
  }, [farmLocations, supplierLocations]);

  // this effect updates the data that has to be displayed in the map according to the user selection
  useEffect(() => {
    const filtered = allLocations.filter((item) => {
      if (filterSelect === "1") return true; // All locations (default)
      if (filterSelect === "2") return item.type === "supplier"; // all suppliers
      if (filterSelect === "3")
        return item.created_by === user.id && item.type === "supplier"; // suppliers created by current user
      if (filterSelect === "4") return item.type === "farm"; // Farms added by the user
      return true;
    });
    setSelection(filtered);
  }, [filterSelect, allLocations, user]);

  // handles the selection in the filter
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
              <option value={"1"}>Todas las ubicaciones</option>
              <option value={"2"}>Todos los proveedores</option>
              <option value={"3"}>Proveedores añadidos por mí</option>
              <option value={"4"}>Mis granjas</option>
            </select>
          </div>
        </div>
      </div>
      {loadingLocations ? (
        <div>Cargando ubicaciones...</div>
      ) : (
        <>
          {/* the map component is called and the prop data is passed according to the user selection */}
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
