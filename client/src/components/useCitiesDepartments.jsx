import { useState, useEffect } from "react";
import { getDepartments, getCities } from "../api/supplierApi";

function useCitiesDepartments() {
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
      return cities.filter((city) => city.department.id == selectedDepartment);
    }
    return [];
  };

  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value);
  };

  return {
    departments,
    cities: filterCities(),
    handleDepartmentChange,
  };
}

export default useCitiesDepartments;
