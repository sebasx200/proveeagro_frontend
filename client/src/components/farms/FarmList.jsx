import { useState, useEffect } from "react";
import { addFarm, getFarms } from "../../api/farmApi";
import { toast } from "react-hot-toast";
import { Card, Row, Col } from "react-bootstrap";

function FarmList() {
  const [farms, setFarms] = useState([]);

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

  return (
    <div className="row">
      {farms.map((farm, index) => (
        <div className="col-md-4" key={index}>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{farm.name}</h5>
              <p className="card-text">{farm.location.address}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FarmList;
