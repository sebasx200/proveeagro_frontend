import { useState, useEffect } from "react";
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
    data,
    loading: loadingData,
    error: errorData,
  } = useFetchData("/farm/farm_suppliers/");

  const [farmSuppliers, setFarmSuppliers] = useState([]);

  useEffect(() => {
    if (data) {
      setFarmSuppliers(data);
    }
  }, [data]);

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

  // this handles the delete request for the farm - supplier relation
  const handleDeleteFarmSupplier = (farmId, supplierId, relationId) => {
    const deleteConfirmation = window.confirm("¿Eliminar esta relación?");

    if (deleteConfirmation) {
      const updatedFarmSuppliers = farmSuppliers.map((farm) => {
        if (farm.id === farmId) {
          return {
            ...farm,
            suppliers: farm.suppliers.filter(
              (supplier) => supplier.id !== supplierId
            ),
          };
        }
        return farm;
      });
      setFarmSuppliers(updatedFarmSuppliers);
      removeData(`/farm/farm_supplier_relation/${relationId}/`);
      toast.success("La relación fue eliminada correctamente");
    }
  };
  return (
    <>
      <div className="d-flex justify-content-center gap-3">
        {loadingData ? (
          <div>cargando agenda...</div>
        ) : (
          <div className={`col-md-6 p-3 ${styles.agendaPanel}`}>
            <h3>Mi Agenda</h3>
            {farmSuppliers.length !== 0 ? (
              farmSuppliers.map((farm, index) => (
                <Accordion className="mt-3" key={index}>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>{farm.name}</Accordion.Header>
                    <Accordion.Body>
                      {farm.suppliers && farm.suppliers.length !== 0 ? (
                        <ListGroup>
                          {farm.suppliers.map((supplier, supplierIndex) => (
                            <div
                              key={supplierIndex}
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
                                  handleDeleteFarmSupplier(
                                    farm.id,
                                    supplier.id,
                                    supplier.relation_id
                                  )
                                }
                              >
                                {loadingDelete ? "Cargando..." : "Eliminar"}
                              </Button>
                            </div>
                          ))}
                        </ListGroup>
                      ) : (
                        <div>
                          No se han añadido proveedores a la agenda de la granja
                        </div>
                      )}
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              ))
            ) : (
              <div>No se han añadido granjas</div>
            )}
          </div>
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
