import { useState, useEffect } from "react";
import { getFarms, farmApi, updateFarm } from "../../api/farmApi";
import { toast } from "react-hot-toast";
import CustomModal from "../CustomModal";
import GetCitiesDepartments from "../GetCitiesDepartments";

import styles from "../../pages/farms/Farms.module.css";

function FarmList() {
  const [farms, setFarms] = useState([]);
  const [selectedFarm, setSelectedFarm] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

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
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFarm = { ...selectedFarm, [name]: value };
    setSelectedFarm(updatedFarm);
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
          <form onSubmit={handleSubmit}>
            <div className="form-group">
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
                className="form-control mb-2"
                id="address"
                name="address"
                value={selectedFarm.location.address}
                onChange={handleChange}
                required
              />
              <GetCitiesDepartments />
            </div>
            <button className="btn btn-success">Guardar cambios</button>
          </form>
        )}
        {/* end of the form */}
      </CustomModal>
    </div>
  );
}

export default FarmList;
