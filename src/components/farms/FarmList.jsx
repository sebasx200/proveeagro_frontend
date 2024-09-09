import useFetchData from "../../hooks/useFetchData";
import { useNavigate } from "react-router-dom";
import styles from "../../pages/farms/Farms.module.css";

function FarmList() {
  // Fetch the farms using the useFetchData hook
  const {
    data: farms,
    loading: loadingFarms,
    error: errorFarms,
  } = useFetchData("/farm/farms/");

  const navigate = useNavigate();

  // Function to handle the click on a card
  const onFarmClick = (id) => {
    navigate(`/farm/farms/${id}/`);
  };

  return (
    <div className="row">
      {farms.map((farm, index) => (
        <div className="col-md-4" key={index}>
          <div
            className={`card justify-content-center align-items-center mb-5 ${styles.cardPanel}`}
            onClick={() => onFarmClick(farm.id)}
          >
            <div className="card-body">
              <img
                src="/img/form-img/logo_proveeagro-bg4.png"
                alt="granja"
                width="200"
              />
              <h4 className="card-title text-center">{farm.name}</h4>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FarmList;
