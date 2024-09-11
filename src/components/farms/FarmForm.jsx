import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import useCitiesDepartments from "../../hooks/useCitiesDepartments";
import usePostData from "../../hooks/usePostData";
import api from "../../api/api";
import { Map, LocationMap } from "../Maps";
import styles from "../../pages/farms/Farms.module.css";

function FarmForm() {
  const { data, loading, error, postData } = usePostData();
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [loadingMap, setLoadingMap] = useState(true);
  const [selectedFarm, setSelectedFarm] = useState(null);

  // here we setup the form hook to handle the form to create a new farm
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const navigate = useNavigate();
  const params = useParams();

  const { departments, cities } = useCitiesDepartments(selectedDepartment);

  // function to handle the click on the map and set the latitude and longitude inputs
  const handleMapClick = (latlng) => {
    setLatitude(latlng.lat);
    setLongitude(latlng.lng);
  };

  // submit function to send the post request to the server with the new data
  const onSubmit = handleSubmit(async (formData) => {
    if (latitude === null || longitude === null) {
      window.alert("No has seleccionado la ubicación de la granja en el mapa");
      return;
    }

    // this is the final data that will be sent in the post request
    const finalData = {
      ...formData,
      location: {
        ...formData.location,
        latitude: latitude,
        longitude: longitude,
      },
    };

    // if editing here goes the put request
    if (params.id) {
      console.log("editando");
    } else {
      try {
        await postData("/farm/farms/", finalData);  // fix {data} is still null after post
        toast.success("La granja "+ finalData.name+ " fue añadida correctamente");
        navigate("/farm/farms/");
      } catch (err) {
        console.error(err);
      }
    }
  });

  // this effect is used to fill the form if editing
  useEffect(() => {
    async function loadFarm() {
      if (params.id) {
        try {
          const { data } = await api.get(`/farm/farms/${params.id}/`);
          setSelectedFarm(data);
          setSelectedDepartment(data.location.city.department.id);
          setValue("name", data.name);
          setValue("location.address", data.location.address);
          setValue("location.address", data.location.address);
          setValue("department", data.location.city.department.id);
          setValue("location.city", data.location.city.id);
        } catch (err) {
          console.error(err);
        } finally {
          setLoadingMap(false);
        }
      }
    }
    loadFarm();
  }, [params.id, setSelectedFarm, setValue, selectedDepartment]);

  // this handles the change in the department select component
  const handleDepartmentChange = async (e) => {
    setSelectedDepartment(e.target.value);
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row d-flex justify-content-center align-items-center">
        <div className={`col-md-6 pb-3 ${styles.formPanel}`}>
          <h3>Información granja</h3>

          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                className="form-control mb-2"
                id="name"
                {...register("name", { required: "El nombre es obligatorio" })}
              />
              {errors.name && (
                <p className="text-danger">{errors.name.message}</p>
              )}
              <label htmlFor="address">Dirección</label>
              <input
                type="text"
                className="form-control mb-2"
                id="address"
                {...register("location.address", {
                  required: "La dirección es obligatoria",
                })}
              />
              {errors.location?.address && (
                <p className="text-danger">{errors.location.address.message}</p>
              )}
              <h4>Ubicación de la granja en el mapa</h4>
              {/*if editing this is the map*/}
              {params.id ? (
                loadingMap ? (
                  <p>loading ...</p>
                ) : (
                  <LocationMap
                    lat={selectedFarm.location.latitude}
                    lng={selectedFarm.location.longitude}
                    popupText={selectedFarm.location.address}
                  />
                )
              ) : (
                <Map onMapClick={handleMapClick} />
              )}

              <label htmlFor="department">Departamento</label>
              <select
                className="form-select mb-2"
                id="department"
                name="department"
                {...register("department", {
                  required: "El departamento es obligatorio",
                })}
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
                {...register("location.city", {
                  required: "La ciudad es obligatoria",
                })}
              >
                <option value="">Selecciona la ciudad</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </select>
              {errors.location?.city && (
                <p className="text-danger">{errors.location.city.message}</p>
              )}
            </div>
            <div className="d-flex justify-content-center align-items-center mt-3">
              {params.id ? (
                <div>
                  <button
                    className="btn btn-danger"
                    onClick={async (e) => {
                      e.preventDefault();
                      const deleteFarm = window.confirm(
                        "Estás seguro de que quieres eliminar la granja"
                      );
                      if (deleteFarm) {
                        await api.delete(`/farm/farms/${params.id}/`);
                        navigate("/farm/farms/");
                      }
                    }}
                  >
                    Eliminar granja
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Guardar cambios
                  </button>
                </div>
              ) : (
                <div>
                  <button type="submit" className="btn btn-success">
                    {loading ? "Cargando" : "Añadir granja"}
                  </button>
                  {error && <p>Error: {error}</p>}
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FarmForm;
