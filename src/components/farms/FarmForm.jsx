import React from "react";
import { useState, useEffect } from "react";
import { getDepartments, getCities } from "../../api/supplierApi";
import { farmApi } from "../../api/farmApi";
import { toast } from "react-hot-toast";
import { Map } from "../Maps";
import { SpanMandatory, FormButton } from "../ui/FormComponents";

import styles from "../../pages/farms/Farms.module.css";
import { set } from "react-hook-form";

function FarmForm() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [city, setCity] = useState("");
  const [departments, setDepartments] = useState([]);
  const [cities, setCities] = useState([]);

  // useEffect to fetch the departments and cities from the API
  useEffect(() => {
    // function to fetch the data
    async function fetchData() {
      try {
        const responseDepartments = await getDepartments();
        setDepartments(responseDepartments.data);
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

  // state to store the selected department
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  // function to filter the cities by department
  const filterCities = () => {
    if (selectedDepartment) {
      // return the cities that match the selected department
      return cities.filter((city) => city.department.id == selectedDepartment);
    }
    // return an empty array if no department is selected
    return [];
  };

  // function to handle the change of the department select
  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value);
  };

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
  farmApi
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
        toast.success(
          "La finca " + name + " ha sido creado correctamente."
        );
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
              <label htmlFor="department">Departamento</label> <SpanMandatory />
              <select
                required
                className="form-select mb-2"
                id="department"
                onChange={handleDepartmentChange}
              >
                <option value={null}>Selecciona el departamento</option>
                {departments?.map((department, index) => (
                  <option key={index} value={department.id}>
                    {department.name}
                  </option>
                ))}
              </select>
              <label htmlFor="city">Ciudad</label> <SpanMandatory />
              <select
                required
                className="form-select mb-2"
                id="city"
                onChange={(e) => setCity(e.target.value)}
                value={city}
              >
                <option value={null}>Selecciona la ciudad</option>
                {filterCities().map((city, index) => (
                  <option key={index} value={city.id}>
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
