import { getData } from "../../js/getData";
import supplierApi from "../../api/supplierApi";
import { useState } from "react";
import React, { Suspense } from "react";
import { FormLabel, SpanMandatory } from "../ui/FormComponents";
import Map from "../mapSupplier";
import "../../styles/supplierForm.css";

const departmentsRequest = getData(
  supplierApi,
  "/location/department/departments/"
);
const citiesRequest = getData(supplierApi, "/location/city/cities/");

function SupplierForm() {
  const departments = departmentsRequest.read();
  const cities = citiesRequest.read();
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const filterCities = () => {
    if (selectedDepartment) {
      return cities.filter((city) => city.department == selectedDepartment);
    }
    return [];
  };

  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <h3>Añadir nuevo proveedor</h3>
          <form>
            <div className="form-group">
              <FormLabel text={"Nombre"} /> <SpanMandatory />
              <input
                type="text"
                className="form-control mb-2"
                id="name"
                required
              />
              <FormLabel text={"Dirección"} /> <SpanMandatory />
              <input
                type="text"
                className="form-control mb-2"
                id="address"
                required
              />
              <FormLabel text={"Latitud"} />
              <input
                type="text"
                className="form-control mb-2"
                id="latitude"
                disabled
              />
              <FormLabel text={"Longitud"} />
              <input
                type="text"
                className="form-control mb-2"
                id="longitude"
                disabled
              />
              <Suspense fallback={<div>Loading...</div>}>
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
                <select className="form-select mb-2" id="city">
                  <option value={null}>Selecciona la ciudad</option>
                  {filterCities().map((city, index) => (
                    <option key={index} value={city.id}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </Suspense>
            </div>
          </form>
        </div>
        <div className="col-md-8">
          <h3>Mapa</h3>
          <Map />
        </div>
      </div>
    </div>
  );
}
export default SupplierForm;
