import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import useCitiesDepartments from "../../hooks/useCitiesDepartments";
import usePostData from "../../hooks/usePostData";
import { Map } from "../Maps";
import styles from "../../pages/farms/Farms.module.css";

function FarmForm() {
  const { data, loading, error, postData } = usePostData();
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  // here we setup the form hook to handle the form to create a new farm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const { departments, cities, handleDepartmentChange } =
    useCitiesDepartments();

  // function to handle the click on the map and set the latitude and longitude inputs
  const handleMapClick = (latlng) => {
    setLatitude(latlng.lat);
    setLongitude(latlng.lng);
  };

  // submit function to send the post request to the server with the new data
  const onSubmit = handleSubmit(async (formData) => {
    if (latitude === null || longitude === null){
      window.alert("No has seleccionado la ubicación de la finca en el mapa");
      return
    }
    const finalData = {
      ...formData,
      location: {
        ...formData.location,
        latitude: latitude,
        longitude: longitude
      }
    };

    try {
      await postData("/farm/farms/", finalData); // fix error data does not load
      //toast.success("La granja "+ data.name+ " fue añadida correctamente");
      navigate("/farm/farms/");
      toast.success("Granja añadida correctamente");
    } catch(err) {
      console.error(err);
    }
  });

  return (
    <div className="container mt-5 mb-5">
      <div className="row d-flex justify-content-center align-items-center">
        <div className={`col-md-6 pb-3 ${styles.formPanel}`}>
          <h3>Añadir nueva finca</h3>

          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                className="form-control mb-2"
                id="name"
                {...register('name', { required: 'El nombre es obligatorio' })}
              />
              {errors.name && <p className="text-danger">{errors.name.message}</p>}
              <label htmlFor="address">Dirección</label>
              <input
                type="text"
                className="form-control mb-2"
                id="address"
                {...register('location.address', { required: 'La dirección es obligatoria' })}
              />
              {errors.location?.address && <p>{errors.location.address.message}</p>}

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
                {...register('location.city', { required: 'La ciudad es obligatoria' })}
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
                {loading ? 'Cargando' : 'Añadir finca'}
              </button> 
            </div>
            {error && <p>Error: {error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default FarmForm;