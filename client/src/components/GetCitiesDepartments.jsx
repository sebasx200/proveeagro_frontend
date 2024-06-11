import { useState, useEffect } from "react";
import { getDepartments, getCities } from "../api/supplierApi";

function GetCitiesDepartments() {
  const [departments, setDepartments] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const responseDepartments = await getDepartments();
        setDepartments(responseDepartments.data);
        const responseCities = await getCities();
        setCities(responseCities.data);
      } catch (error) {
        console.error("Error al cargar los datos " + error.message);
      }
    }
    fetchData();
  }, []);

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
    <div>
      <div>
        <label>Departamento</label>
        <select
          className="form-select mb-2"
          name="department"
          value={selectedDepartment}
          onChange={handleDepartmentChange}
        >
          <option value="">Seleccione un departamento</option>
          {departments.map((department) => (
            <option key={department.id} value={department.id}>
              {department.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Ciudad</label>
        <select name="city" className="form-select mb-2">
          <option value="">Seleccione una ciudad</option>
          {filterCities().map((city) => (
            <option key={city.id} value={city.id}>
              {city.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default GetCitiesDepartments;
