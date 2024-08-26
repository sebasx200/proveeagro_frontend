import useFetchData from "../../hooks/useFetchData";
import api from "../../api/api";

// this is the agenda component
function AgendaList() {

  const { data, loading, error } = useFetchData(api, "farm/farm_suppliers/");
  
  return (
    <div className="container">
      <h1>Agenda</h1>
      
    </div>
  );
}

export default AgendaList;
