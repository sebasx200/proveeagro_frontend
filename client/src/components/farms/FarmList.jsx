import { useState, useEffect } from "react";
import { getFarms, farmApi, updateFarm } from "../../api/farmApi";
import { toast } from "react-hot-toast";
import CustomModal from "../CustomModal";
import useCitiesDepartments from "../useCitiesDepartments";
import { LocationMap } from "../Maps";

import styles from "../../pages/farms/Farms.module.css";

function FarmList() {
  const [farms, setFarms] = useState([]);
  const [selectedFarm, setSelectedFarm] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { departments, cities, handleDepartmentChange } =
    useCitiesDepartments();

  // Fetch the data
  useEffect(() => {
    async function fetchData() {
      try {
        const responseFarms = await getFarms();
        setFarms(responseFarms.data);
      } catch (error) {
        toast.error("Error al cargar los datos " + error.message, {
          duration: 5000,
        });
      }
    }
    fetchData();
  }, []);

  // Function to handle the click on a card
  const onCardClick = (card) => {
    setSelectedFarm(card);
    setModalIsOpen(true);
  };

  const handleUpdate = async () => {
    try {
      await updateFarm(selectedFarm.id, selectedFarm);
      toast.success("Finca actualizada correctamente", {
        duration: 5000,
      });
      setModalIsOpen(false);
    } catch (error) {
      toast.error("Error al actualizar la finca " + error.message, {
        duration: 5000,
      });
    }
  };

  // Function to handle the change on the form to edit the farm
  const handleChange = (event) => {
    const { name, value } = event.target;
    setSelectedFarm((prevFarm) => {
      if (name in prevFarm) {
        return { ...prevFarm, [name]: value };
      } else if (prevFarm.location && name in prevFarm.location) {
        return {
          ...prevFarm,
          location: { ...prevFarm.location, [name]: value },
        };
      }
      return prevFarm;
    });
  };

  // Function to handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate(selectedFarm);
  };

  return (
    <div className="row">
      {farms.map((farm, index) => (
        <div className="col-md-4" key={index}>
          <div
            className={`card justify-content-center align-items-center mb-5 ${styles.cardPanel}`}
            onClick={() => onCardClick(farm)}
          >
            <div className="card-body">
              <img
                src="/img/form-img/logo_proveeagro-bg4.png"
                alt="finca"
                width="200"
              />
              <h4 className="card-title text-center">{farm.name}</h4>
            </div>
          </div>
        </div>
      ))}
      <CustomModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        initialData={selectedFarm}
      >
        {/* Form to edit the farm*/}
        {selectedFarm && (
          <div className="row">
            <div className="col-md-6">
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-2">
                  <label htmlFor="name">Nombre</label>
                  <input
                    type="text"
                    className="form-control mb-2"
                    id="name"
                    name="name"
                    value={selectedFarm.name}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="address">Dirección</label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    name="address"
                    value={selectedFarm.location.address}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="department">Departamento</label>
                  <select
                    className="form-select"
                    onChange={handleDepartmentChange}
                    id="department"
                    name="department"
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
                    className="form-select"
                    id="city"
                    name="city"
                    onChange={handleChange}
                  >
                    <option value="">Selecciona la ciudad</option>
                    {cities.map((city) => (
                      <option key={city.id} value={city.id}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </div>
                <button className="btn btn-primary">Guardar cambios</button>
              </form>
            </div>
            <div className="col-md-6">
              <h2>Ubicación</h2>
              {selectedFarm.location?.latitude &&
              selectedFarm.location?.longitude ? (
                <LocationMap
                  lat={selectedFarm.location.latitude}
                  lng={selectedFarm.location.longitude}
                  popupText={selectedFarm.location.address}
                />
              ) : (
                <p>
                  Ubicación no disponible: no se han proporcionado las
                  coordenadas
                </p>
              )}
            </div>
          </div>
        )}
        {/* end of the form */}
      </CustomModal>
    </div>
  );
}

export default FarmList;
