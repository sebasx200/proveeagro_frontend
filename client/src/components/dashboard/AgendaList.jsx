import { getFarmsSuppliers } from "../../api/farmApi";
import { useEffect, useState } from "react";

function AgendaList() {
  const [farmSuppliers, setFarmSuppliers] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const responseFarmSuppliers = await getFarmsSuppliers();
        setFarmSuppliers(responseFarmSuppliers.data);
        console.log(responseFarmSuppliers.data);
      } catch (error) {
        console.error("Error al cargar los datos " + error.message);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>Agenda</h1>
      <ul>
        {farmSuppliers.map((farmSupplier) => (
          <li key={farmSupplier.id}>{farmSupplier.farm.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default AgendaList;
