import { useState, useEffect } from "react";
import { addFarm, getFarms } from "../../api/farmApi";
import { toast } from "react-hot-toast";
import Modal from "react-modal";
import { LocationMap } from "../Maps";

import styles from "../../pages/farms/Farms.module.css";

function FarmList() {
  const [farms, setFarms] = useState([]);
  const [selectedFarm, setSelectedFarm] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

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

  const onCardClick = (card) => {
    setSelectedFarm(card);
    setModalIsOpen(true);
  };

  return (
    <div className="row">
      {farms.map((farm, index) => (
        <div className="col-md-4" key={index}>
          <div
            className={`card justify-content-center align-items-center ${styles.cardPanel}`}
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
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Selected Supplier"
        style={{
          content: {
            width: "60%",
            height: "60%",
            margin: "auto",
            
          },
        }}
      >
        <button
          className="btn btn-close"
          onClick={() => setModalIsOpen(false)}
          style={{ position: "absolute", top: "10px", right: "10px" }}
        ></button>

        {selectedFarm && (
          <div className="row">
            <div className="col-md-6">
              <h3>{selectedFarm.name}</h3>
              <p>{selectedFarm.location.address}</p>
              <p>Ciudad: {selectedFarm.location.city.name}</p>
            </div>
            <div className="col-md-6">
              <h4>Ubicación</h4>
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
      </Modal>
    </div>
  );
}

export default FarmList;
