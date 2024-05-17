import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { getDepartments, getCities, addSupplier } from "../../api/supplierApi";
import { FormLabel, SpanMandatory, FormButton } from "../ui/FormComponents";
import { toast } from "react-hot-toast";
import { Map } from "../mapSupplier";

import { supplierApi } from "../../api/supplierApi";

function SupplierForm() {
  // states to store the departments and cities
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
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
      return cities.filter((city) => city.department == selectedDepartment);
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

  const createSupplier = (e) => {
    e.preventDefault();
    supplierApi
      .post("/supplier/suppliers/", {
        name,
        location: {
          address,
          latitude,
          longitude,
          city,
        },
      })
      .then((res) => {
        if (res.status === 201) toast.success("El proveedor " + name + " ha sido creado correctamente.");
        else toast.error("Error al crear el proveedor " + name);
      })
      .catch((err) => alert(err));
  };

  return (
    <div className="container mt-5">
      <div className="row bg-body-tertiary">
        <div className="col-md-4">
          <h3>Añadir nuevo proveedor</h3>
          <form onSubmit={createSupplier}>
            <div className="form-group">
              <FormLabel text={"Nombre"} /> <SpanMandatory />
              <input
                type="text"
                className="form-control mb-2"
                id="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />
              <FormLabel text={"Dirección"} /> <SpanMandatory />
              <input
                type="text"
                className="form-control mb-2"
                id="address"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                required
              />
              <FormLabel text={"Latitud"} />
              <input
                type="text"
                className="form-control mb-2"
                id="latitude"
                onChange={(e) => setLatitude(e.target.value)}
                value={latitude}
                disabled
              />
              <FormLabel text={"Longitud"} />
              <input
                type="text"
                className="form-control mb-2"
                id="longitude"
                onChange={(e) => setLongitude(e.target.value)}
                value={longitude}
                disabled
              />
              <FormLabel text={"Departamento"} /> <SpanMandatory />
              <select
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
              <FormLabel text={"Ciudad"} /> <SpanMandatory />
              <select
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
              <div className="container text-center mt-4 mb-2">
                <FormButton
                  type="submit"
                  text={"Añadir proveedor"}
                  className="btn btn-success"
                />
              </div>
            </div>
          </form>
        </div>
        <div className="col-md-8">
          <h3>Mapa</h3>
          <Map onMapClick={handleMapClick} />
        </div>
      </div>
    </div>
  );
}
export default SupplierForm;
