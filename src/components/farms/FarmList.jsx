import useFetchData from "../../hooks/useFetchData";
import { useNavigate, Link } from "react-router-dom";
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

  if (errorFarms){
    return <div>Error al cargar las fincas...</div>
  }

  return (
    <div>
      {farms.length == 0 && (
        <div className={`w-100 ${styles.formPanel}`}>
          <div className="row">
            <div className="d-flex justify-content-center align-items-center">
              <h5>
                No tienes ninguna finca registrada. ¿Quieres añadir una finca?
              </h5>
            </div>
            <div className="row">
              <div className="d-flex justify-content-center align-items-center">
                <Link to="/farm/add-farm/" className="text-decoration-none">
                  Añadir finca
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
      {loadingFarms ? (
        <div>loading farms...</div>
      ) : (
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
      )}
    </div>
  );
}

export default FarmList;
