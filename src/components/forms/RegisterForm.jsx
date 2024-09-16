import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import useCitiesDepartments from "../../hooks/useCitiesDepartments";
import usePostData from "../../hooks/usePostData";
import api from "../../api/api";
import { Map, LocationMap } from "../Maps";
import { SpanMandatory, FormButton } from "../ui/FormComponents";
import styles from "../../pages/farms/Farms.module.css";

function RegisterForm({ type }) {
  const { data, loading, error, postData } = usePostData();
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [loadingMap, setLoadingMap] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);

  // setup form hook
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const navigate = useNavigate();
  const params = useParams();
  const { departments, cities } = useCitiesDepartments(selectedDepartment);

  // function to handle map click
  const handleMapClick = (latlng) => {
    setLatitude(latlng.lat);
    setLongitude(latlng.lng);
  };

  // submit function
  const onSubmit = handleSubmit((formData) => {
    if (latitude === null || longitude === null) {
      window.alert("No has seleccionado la ubicación en el mapa");
      return;
    }

    const finalData = {
      ...formData,
      location: {
        ...formData.location,
        latitude: latitude,
        longitude: longitude,
      },
    };

    if (params.id) {
      console.log(`Editando ${type}`);
    } else {
      try {
        postData(`/${type}/${type}s/`, finalData);
      } catch (err) {
        console.error(err.message);
      }
    }
  });

  // Effect to show a toast when post data is sent
  useEffect(() => {
    if (data) {
      toast.success(
        `${type.charAt(0).toUpperCase() + type.slice(1)} ${data.name} ${
          type === "farm"
            ? "fue añadida correctamente"
            : "fue añadido correctamente"
        }`
      );
      navigate(`/${type}/${type}s/`);
    }
  }, [data, navigate, type]);

  // Effect to load item if editing
  useEffect(() => {
    async function loadItem() {
      if (params.id) {
        try {
          const { data } = await api.get(`/${type}/${type}s/${params.id}/`);
          setSelectedItem(data);
          setSelectedDepartment(data.location.city.department.id);
          setValue("name", data.name);
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
    loadItem();
  }, [params.id, setValue, selectedDepartment, type]);

  // Handles department change
  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value);
  };

  return (
    <div className="container mt-5">
      <div className={`row p-3 ${styles.formPanel}`}>
        <div className="col-md-4">
          {type === "farm" ? (
            <h3>{params.id ? "Editar granja" : "Añadir nueva granja"}</h3>
          ) : (
            <h3>{params.id ? "Editar proveedor" : "Añadir nuevo proveedor"}</h3>
          )}
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nombre</label>
              <SpanMandatory />
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
              <SpanMandatory />
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

              <label htmlFor="department">Departamento</label>
              <SpanMandatory />
              <select
                className="form-select mb-2"
                id="department"
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
              <SpanMandatory />
              <select
                className="form-select mb-2"
                id="city"
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

              <div className="container text-center mt-4 mb-2">
                <FormButton
                  type="submit"
                  text={params.id ? "Guardar cambios" : "Añadir"}
                  className={`btn ${params.id ? "btn-primary" : "btn-success"}`}
                />
                {error && <p>Error: {error}</p>}
              </div>
            </div>
          </form>
        </div>

        <div className="col-md-7">
          <h3>Mapa</h3>
          {params.id ? (
            loadingMap ? (
              <p>Cargando ...</p>
            ) : (
              <LocationMap
                lat={selectedItem.location.latitude}
                lng={selectedItem.location.longitude}
                popupText={selectedItem.location.address}
              />
            )
          ) : (
            <Map onMapClick={handleMapClick} />
          )}
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
