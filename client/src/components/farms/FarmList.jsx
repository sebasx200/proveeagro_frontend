import { useState, useEffect } from "react";
import { getFarms, farmApi } from "../../api/farmApi";
import { toast } from "react-hot-toast";
import CustomModal from "../CustomModal";

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

  // Function to handle the change on the form to edit the farm
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedFarm({ ...selectedFarm, [name]: value });
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
        api={farmApi}
        endpoint={`/farms/${selectedFarm._id}`}
        initialData={selectedFarm}
        onUpdate={(updatedFarm) => {
          const updatedFarms = farms.map((farm) =>
            farm._id === updatedFarm._id ? updatedFarm : farm
          );
          setFarms(updatedFarms);
        }}
      >
        {/* Form to edit the farm*/}
        {selectedFarm && (
          <div>
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
        </div>
        <div className="form-group">
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
        </div>
        <div className="form-group">
          <label htmlFor="city">Ciudad</label>
          <input
            type="text"
            className="form-control mb-2"
            id="city"
            name="city"
            value={selectedFarm.location.city}
            onChange={handleChange}
            required
          />
          
        </div>
        </div>
        )}
        {/* end of the form */}
        
      </CustomModal>
    </div>
  );
}

export default FarmList;
