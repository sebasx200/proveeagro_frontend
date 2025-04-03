import { useState, useEffect } from "react";
import useFetchData from "../../hooks/useFetchData";
import Accordion from "react-bootstrap/Accordion";
import ListGroup from "react-bootstrap/ListGroup";
import styles from "../../pages/dashboard/Dashboard.module.css";

function SupplyList() {
  const {
    data: supplies,
    loading: loadingSupplies,
    error: errorSupplies,
  } = useFetchData("/inventory/supply_category/");

  const {
    data: categories,
    loading: loadingCategories,
    error: errorCategories,
  } = useFetchData("/inventory/categories/");

  const [filterSelect, setFilterSelect] = useState(0);
  const [filteredSupplies, setFilteredSupplies] = useState([]);

  useEffect(() => {
    const filtered = supplies.filter((supply) => {
      if (filterSelect === "0") return true; // All supplies
      if (filterSelect != "0") return supply.category.id == filterSelect; // filter supplies by category
      return true;
    });
    setFilteredSupplies(filtered);
  }, [filterSelect, supplies]);

  const handleFilter = (e) => {
    setFilterSelect(e.target.value);
  };

  return (
    <>
      <div className="row justify-content-center gap-3">
        {loadingCategories ? (
          <div>Cargando las categorías</div>
        ) : (
          <select className="form-select w-50" onChange={handleFilter}>
            <option value={"0"}>Seleccionar filtro</option>
            <option value={"0"}>Todos los insumos</option>
            {categories.map((category, index) => (
              <option key={index} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        )}
        {loadingSupplies ? (
          <div>Cargando insumos</div>
        ) : (
          <div className={`col-md-6 p-3 ${styles.agendaPanel}`}>
            <h3>Lista de insumos</h3>
            {filteredSupplies.length !== 0 ? (
              filteredSupplies.map((supply, index) => (
                <Accordion className="mt-3" key={index}>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>{supply.name}</Accordion.Header>
                    <Accordion.Body>
                      <strong>Descripción</strong>
                      <p>{supply.description}</p>
                      <strong>Proveeadores relacionados con este insumo</strong>
                      {supply.suppliers && supply.suppliers.length !== 0 ? (
                        <ListGroup>
                          {supply.suppliers.map((supplier, supplierIndex) => (
                            <div
                              key={supplierIndex}
                              className="d-flex justify-content-between align-items-center"
                            >
                              <ListGroup.Item action variant="success">
                                {supplier.name}
                              </ListGroup.Item>
                            </div>
                          ))}
                        </ListGroup>
                      ) : (
                        <div>
                          Este insumo no tiene ningún proveedor relacionado
                        </div>
                      )}
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              ))
            ) : (
              <div>No se ha seleccionado un filtro</div>
            )}
          </div>
        )}
        {errorSupplies && <div>Error cargando los insumos...</div>}
        {errorCategories && <div>Error cargando las categorías</div>}
      </div>
    </>
  );
}

export default SupplyList;
