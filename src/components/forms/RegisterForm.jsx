import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import useCitiesDepartments from "../../hooks/useCitiesDepartments";
import usePostData from "../../hooks/usePostData";
import useFetchData from "../../hooks/useFetchData";
import usePutData from "../../hooks/usePutData";
import useDeleteData from "../../hooks/useDeleteData";
import api from "../../api/api";
import { Map, LocationMap } from "../Maps";
import { SpanMandatory, FormButton } from "../ui/FormComponents";
import styles from "../../pages/farms/Farms.module.css";
import FarmSupplierModal from "../modals/FarmSupplierModal";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import useUser from "../../hooks/useUser";
import PropTypes from "prop-types";

/** This is the form for adding and editing farms and suppliers */
function RegisterForm({ type }) {
  const { user } = useUser();
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [loadingMap, setLoadingMap] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  // this is the state to pass the endpoint to the fetch hook
  const [endpoint, setEndpoint] = useState(null);
  // this state works for the selected farms in the modal
  const [selectedFarms, setselectedFarms] = useState([]);
  const [currentUser, setCurrentUser] = useState(false);

  // custom hook for post new data initialization
  const {
    data: sentData,
    loading: loadingData,
    error: errorData,
    postData,
  } = usePostData();

  // custom hook to post the farms and supplier for the agenda
  const {
    data: sentFarmSupplier,
    loading: loadingFarmSupplier,
    error: errorFarmSupplier,
    postData: postFarmSupplier,
  } = usePostData();

  // custom hook to fetch the farms for the modal initialization
  const {
    data: farms,
    loading: loadingFarms,
    error: errorFarms,
  } = useFetchData(endpoint);

  const {
    data: updatedData,
    loading: loadingUpdate,
    error: errorUpdate,
    putData: udpateItem,
  } = usePutData();

  const {
    loading: loadingDelete,
    error: errorDelete,
    deleteData: removeData,
  } = useDeleteData();

  // this is the state to handle the farm_supplier modal
  const [show, setShow] = useState(false);

  // this handles the closing of the modal
  const handleClose = () => setShow(false);
  // this handles the opening of the modal and set the endpoint to the fetch hook
  const handleShow = (e) => {
    e.preventDefault();
    setEndpoint("/farm/farms/");
    setShow(true);
  };

  // this function handles the selected farms to work with them
  const handleSelectedFarms = (farm) => {
    // Si el item ya está seleccionado, lo quitamos; si no, lo añadimos
    if (selectedFarms.includes(farm)) {
      setselectedFarms(selectedFarms.filter((i) => i !== farm));
    } else {
      setselectedFarms([...selectedFarms, farm]);
    }
  };

  // this handles the button to accept the selected farms by the moment
  const handleAddToAgenda = () => {
    const dataToAgenda = { farm: null, supplier: null };

    if (selectedFarms.length !== 0) {
      for (const farm of selectedFarms) {
        dataToAgenda.farm = farm.id;
        dataToAgenda.supplier = selectedItem.id;
        postFarmSupplier("/farm/farm_suppliers/", dataToAgenda);
      }
    } else {
      window.alert("No ha seleccionado ninguna granja");
    }
  };

  // setup form hook
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();
  const navigate = useNavigate();
  const params = useParams();
  const { departments, cities } = useCitiesDepartments(selectedDepartment);

  // function to handle map click
  const handleMapClick = (latlng) => {
    setLatitude(latlng.lat);
    setLongitude(latlng.lng);
  };

  const handleMarkerRemove = () => {
    setLatitude(selectedItem.location.latitude);
    setLongitude(selectedItem.location.longitude);
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
      try {
        const confirmUpdate = window.confirm("¿Quieres actualizar los datos?");
        if (confirmUpdate) {
          udpateItem(`/${type}/${type}s/${params.id}/`, finalData);
        }
      } catch (err) {
        console.error(err.message);
      }
    } else {
      try {
        postData(`/${type}/${type}s/`, finalData);
      } catch (err) {
        console.error(err.message);
      }
    }
  });

  // Effect to show a toast when post data is sent or to show a toast when a supplier is releated with farms
  useEffect(() => {
    if (sentData) {
      toast.success(sentData.name + " se registró correctamente");
      navigate(`/${type}/${type}s/`);
    }

    if (sentFarmSupplier) {
      toast.success("El proveedor fue agendado correctamente");
      setShow(false);
    }

    if (updatedData) {
      toast.success(updatedData.name + " se actualizó correctamente");
    }
  }, [sentData, params.id, sentFarmSupplier, updatedData, navigate, type]);

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
          setLatitude(data.location.latitude);
          setLongitude(data.location.longitude);
          setCurrentUser(user);
        } catch (err) {
          console.error(err);
        } finally {
          setLoadingMap(false);
        }
      }
    }
    loadItem();
  }, [params.id, setValue, type, user]);

  // Handles department change
  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value);
  };

  // Handles city change
  const handleCityChange = (e) => {
    setValue("location.city", e.target.value);
  };

  // this handles the delete of the item in the form
  const handleDeleteItem = (e, itemId) => {
    e.preventDefault();
    const deleteConfirmation = window.confirm("¿Eliminar registro?");
    if (deleteConfirmation) {
      removeData(`/${type}/${type}s/${itemId}/`);
      toast.success("El registro fue eliminado correctamente");
      navigate(`/${type}/${type}s/`);
    }
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
              {errors.department && (
                <p className="text-danger">{errors.department.message}</p>
              )}
              <label htmlFor="city">Ciudad</label>
              <SpanMandatory />
              <select
                className="form-select mb-2"
                id="city"
                value={watch("location.city")}
                onChange={handleCityChange}
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
                {errorData && <p>Error: {errorData}</p>}
                {errorUpdate && <p>Error: {errorUpdate}</p>}
                {errorDelete && <p>Error: {errorDelete}</p>}
                <div className="row gap-3">
                  {params.id ? (
                    <>
                      {currentUser &&
                        (currentUser.id === selectedItem.created_by ||
                          currentUser.is_superuser) && (
                          <FormButton
                            type="submit"
                            text={
                              loadingUpdate ? "Cargando" : "Guardar cambios"
                            }
                            className={"btn btn-primary"}
                          />
                        )}
                      {currentUser &&
                        (currentUser.id === selectedItem.created_by ||
                          currentUser.is_superuser) && (
                          <FormButton
                            type="submit"
                            text={loadingDelete ? "Cargando" : "Eliminar"}
                            className={"btn btn-danger"}
                            onClick={(e) => handleDeleteItem(e, params.id)}
                          />
                        )}
                      {type === "supplier" && (
                        <FormButton
                          text={"Añadir a la agenda"}
                          className={"btn btn-success"}
                          onClick={handleShow}
                        />
                      )}
                    </>
                  ) : (
                    <FormButton
                      type={"submit"}
                      className={"btn btn-success"}
                      text={loadingData ? "Cargando" : "Añadir"}
                    />
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
        {/* This is the farm_supplier modal */}
        <FarmSupplierModal
          show={show}
          handleClose={handleClose}
          title={"Selecciona las granjas para agendar el proveedor"}
          propsBody={
            <>
              <ListGroup>
                {loadingFarms ? (
                  <div>loading farms...</div>
                ) : (
                  <>
                    {farms.map((farm, index) => (
                      <ListGroup.Item
                        action
                        variant="success"
                        active={selectedFarms.includes(farm)}
                        onClick={() => handleSelectedFarms(farm)}
                        key={index}
                      >
                        {farm.name}
                      </ListGroup.Item>
                    ))}
                  </>
                )}
              </ListGroup>
              {/* if there is any error getting the farms from the hook */}
              {errorFarms && <div>Error obteniendo las granjas</div>}
            </>
          }
          propsFooter={
            <>
              <Button variant="success" onClick={handleAddToAgenda}>
                {loadingFarmSupplier ? "Cargando..." : "Añadir a la aganda"}
              </Button>
              <Button variant="secondary" onClick={handleClose}>
                Cerrar
              </Button>
              {errorFarmSupplier && (
                <p className="text-danger">Error: {errorFarmSupplier}</p>
              )}
            </>
          }
        />
        {/* This are the maps to see the location using lat and lng */}
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
                onMapClick={handleMapClick}
                onMarkerRemove={handleMarkerRemove}
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

// the type is set to be a string
RegisterForm.propTypes = {
  type: PropTypes.string.isRequired,
};

export default RegisterForm;