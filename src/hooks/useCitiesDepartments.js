import { useState } from "react";
import useFetchData from "./useFetchData";

/** This custom hook is used to get the department and cities from the server and filter them by city.department id*/
function useCitiesDepartments() {
  const [selectedDepartment, setSelectedDepartment] = useState("");

  const { data: departments, loading: loadingDept, error: errorDept } = useFetchData("/location/department/departments/");
  const { data: cities, loading: loadingCities, error: errorCities } = useFetchData("/location/city/cities/");

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
