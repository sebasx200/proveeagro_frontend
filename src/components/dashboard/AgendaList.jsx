import Accordion from "react-bootstrap/Accordion";
import useFetchData from "../../hooks/useFetchData";
import ListGroup from "react-bootstrap/ListGroup";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

/** this is the agenda component */
function AgendaList() {
  // custom hook initialization to get the farm suppliers relation
  const {
    data: farmSuppliers,
    loading: loadingData,
    error: errorData,
  } = useFetchData("/farm/farm_suppliers/");

  const navigate = useNavigate();

  // this redirects to the supplier page
  const handleSupplierClick = (supplierId) => {
    navigate(`/supplier/suppliers/${supplierId}`);
  };

  if (errorData) {
    console.log(errorData);
    return <div>error loading the agenda...</div>;
  }

  return (
    <div className="row p-3">
      <h3>Mi Agenda</h3>
      {loadingData ? (
        <div>loading agenda...</div>
      ) : (
        <>
          {farmSuppliers.length !== 0 ? (
            <div className="col-md-12">
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
                            <Button variant="danger">Eliminar</Button>
                          </div>
                        ))}
                      </ListGroup>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              ))}
            </div>
          ) : (
            <div>No has añadido nada a tu agenda</div>
          )}
        </>
      )}
    </div>
  );
}

export default AgendaList;
