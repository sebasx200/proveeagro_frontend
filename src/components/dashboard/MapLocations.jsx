import LocationsMap from "../maps/LocationsMap";
import useFetchData from "../../hooks/useFetchData";
import useUser from "../../hooks/useUser";
import { useEffect, useState } from "react";

function MapLocations() {
  const [locations, setLocations] = useState(null);
  const [filterSelect, setFilterSelect] = useState(null);
  const { user } = useUser();

  const {
    data: allLocations,
    loading: loadingLocations,
    error: errorLocations,
  } = useFetchData("location/farms_suppliers_locations/");

  useEffect(() => {
    const filtered = allLocations.filter((object) => {
      if (filterSelect === "1") return object.suppliers; // All suppliers
      if (filterSelect === "2") return object.suppliers.created_by === user.id; // Added by current user
      if (filterSelect === "3")
        return object.suppliers.is_added_by_superuser === true; // Suppliers added by superusers
      return true;
      
    });
    setLocations(filtered);
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
        <>{locations && <LocationsMap locations={locations} />}</>
      )}
      {errorLocations && <p className="text-danger">Error: {errorLocations}</p>}
    </div>
  );
}

export default MapLocations;
