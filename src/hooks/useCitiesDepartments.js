import { useState, useEffect } from "react";
import useFetchData from "./useFetchData";
import api from "../api/api";

/** This custom hook is used to get the department and cities from the server and filter them by city.department id*/
function useCitiesDepartments(selectedDepartment) {
  const [filteredCities, setFilteredCities] = useState([]);

  const {
    data: departments,
    loading: loadingDept,
    error: errorDept,
  } = useFetchData("/location/department/departments/");

  // this effect loads the data needed to filter the cities depending on the department_id
  useEffect(() => {
    const filterCities = async () => {
      if (selectedDepartment) {
        try {
          const response = await api.get(
            `/location/city/cities?department_id=${selectedDepartment}`
          );
          setFilteredCities(response.data);
        } catch (error) {
          console.error("Error al cargar las ciudades", error);
        }
      } else {
        setFilteredCities([]);
      }
    };
    filterCities();
  }, [selectedDepartment]);

  return { departments, cities: filteredCities };
}

export default useCitiesDepartments;
