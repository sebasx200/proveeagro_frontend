import Accordion from "react-bootstrap/Accordion";
import useFetchData from "../../hooks/useFetchData";
import useDeleteData from "../../hooks/useDeleteData";
import ListGroup from "react-bootstrap/ListGroup";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { toast } from "react-hot-toast";
import RecentActions from "./RecentActions";
import styles from "../../pages/dashboard/Dashboard.module.css";

/** this is the agenda component */
function AgendaList() {
  // custom hook initialization to get the farm suppliers relation
  const {
    data: farmSuppliers,
    loading: loadingData,
    error: errorData,
  } = useFetchData("/farm/farm_suppliers/");

  const {
    loading: loadingDelete,
    error: errorDelete,
    deleteData: removeData,
  } = useDeleteData();

  const navigate = useNavigate();

  // this redirects to the supplier page
  const handleSupplierClick = (supplierId) => {
    navigate(`/supplier/suppliers/${supplierId}`);
  };

  const handleDeleteFarmSupplier = (id) => {
    const deleteConfirmation = window.confirm(
      "¿Eliminar la relación de la agenda?"
    );
    if (deleteConfirmation) {
      removeData(`/farm/farm_suppliers/${id}/`);
      toast.success("El registro fue eliminado correctamente");
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center gap-3">
        {loadingData ? (
          <div>loading agenda...</div>
        ) : (
          <>
            {farmSuppliers.length !== 0 ? (
              <div className={`col-md-6 p-3 ${styles.agendaPanel}`}>
                <h3>Mi Agenda</h3>
                {farmSuppliers.map((farmSupplier, index) => (
                  <Accordion className="mt-3" key={index}>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>{farmSupplier.name}</Accordion.Header>
                      <Accordion.Body>
                        <ListGroup>
                          {farmSupplier.suppliers.map((supplier, index) => (
                            <div
                              key={index}
                              className="d-flex justify-content-between align-items-center"
                            >
                              <ListGroup.Item
                                action
                                variant="success"
                                onClick={() => handleSupplierClick(supplier.id)}
                              >
                                {supplier.name}
                              </ListGroup.Item>
                              <Button
                                variant="danger"
                                onClick={() =>
                                  handleDeleteFarmSupplier(farmSupplier.id)
                                }
                              >
                                {loadingDelete ? "Cargando..." : "Eliminar"}
                              </Button>
                            </div>
                          ))}
                        </ListGroup>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                ))}
              </div>
            ) : (
              <div className={`col-md-6 p-3 ${styles.agendaPanel}`}>
                No se ha añadido nada en la agenda
              </div>
            )}
          </>
        )}
        <div className={`col-md-4 p-3 ${styles.agendaPanel}`}>
          <RecentActions />
        </div>
      </div>
      {errorData && <div>Error cargando la agenda...</div>}
      {errorDelete && <div>Error al eliminar la relación...</div>}
    </>
  );
}

export default AgendaList;
