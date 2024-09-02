import { useState } from "react";
import useCitiesDepartments from "../../hooks/useCitiesDepartments";
import { farmApi } from "../../api/farmApi";
import api from "../../api/api";
import { toast } from "react-hot-toast";
import { Map } from "../Maps";

import styles from "../../pages/farms/Farms.module.css";

function FarmForm() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [city, setCity] = useState("");

  const { departments, cities, handleDepartmentChange } =
    useCitiesDepartments();

  // function to handle the click on the map and set the latitude and longitude inputs
  const handleMapClick = (latlng) => {
    setLatitude(latlng.lat);
    setLongitude(latlng.lng);
  };

  const createFarm = (e) => {
    e.preventDefault();
    if (latitude === null || longitude === null) {
      const userConfirmation = window.confirm(
        "No has seleccionado la ubicación en el mapa. ¿Deseas continuar de todas formas?"
      );
      if (userConfirmation) {
        // If user confirms, proceed with creating the farm with null latitude or longitude
        createFarmRequest();
      }
    } else {
      // If both latitude and longitude are not null, proceed with creating the farm
      createFarmRequest();
    }
  };

  // function to create a new farm
  const createFarmRequest = () => {
    api
      .post("/farm/farms/", {
        name,
        location: {
          address,
          latitude,
          longitude,
          city,
        },
      })
      .then((res) => {
        if (res.status === 201) {
          toast.success("La finca " + name + " ha sido creado correctamente.");
          setName("");
          setAddress("");
          setLatitude(null);
          setLongitude(null);
          setCity("");
        } else toast.error("Error al crear la finca " + name);
      })
      .catch((error) => {
        // Handle error
        alert("Error al crear la finca: " + error.message);
      });
  };

  return (
    <div className="container mt-5">
      <div className="row d-flex justify-content-center align-items-center">
        <div className={`col-md-6 pb-3 ${styles.formPanel}`}>
          <h3>Añadir nueva finca</h3>

          <form onSubmit={createFarm}>
            <div className="form-group">
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                className="form-control mb-2"
                id="name"
                onChange={(e) => setName(e.target.value)}
                required
              />
              <label htmlFor="address">Dirección</label>
              <input
                type="text"
                className="form-control mb-2"
                id="address"
                onChange={(e) => setAddress(e.target.value)}
                required
              />
              <h4>Selecciona la ubicación en el mapa</h4>
              <Map onMapClick={handleMapClick} />
              <label htmlFor="department">Departamento</label>
              <select
                className="form-select mb-2"
                id="department"
                name="department"
                onChange={handleDepartmentChange}
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
                className="form-select mb-2"
                id="city"
                name="city"
                onChange={(e) => setCity(e.target.value)}
              >
                <option value="">Selecciona la ciudad</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="d-flex justify-content-center align-items-center mt-3">
              <button type="submit" className="btn btn-success">
                Añadir finca
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FarmForm;
