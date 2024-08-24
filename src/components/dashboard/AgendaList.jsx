import { getFarmsSuppliers } from "../../api/farmApi";
import { useEffect, useState } from "react";

import styles from "../../pages/dashboard/Dashboard.module.css"

function AgendaList() {
  const [farmSuppliers, setFarmSuppliers] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const responseFarmSuppliers = await getFarmsSuppliers();
        setFarmSuppliers(responseFarmSuppliers.data);
      } catch (error) {
        console.error("Error al cargar los datos " + error.message);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="container p-5">
      <div className="row">
        <div className={`col-md-6 pb-3 ${styles.infoPanel}`}>
          <h3>Agenda</h3>
          <ul>
            {farmSuppliers.map((farmSupplier) => (
              <li key={farmSupplier.id}>
                <ul>
                  <li>Finca: {farmSupplier.farm.name}</li>
                  <li>Proveedor: {farmSupplier.supplier.name}</li>
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AgendaList;
