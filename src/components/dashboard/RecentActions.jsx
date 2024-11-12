import { useEffect, useState } from "react";
import useFetchData from "../../hooks/useFetchData";
import ListGroup from "react-bootstrap/ListGroup";

const RecentActions = () => {
  const { data, loading, error } = useFetchData("/dashboard/action_history/");
  const [recentFarms, setRecentFarms] = useState(null);
  const [recentSuppliers, setRecentSuppliers] = useState(null);
  const [recenteFarmsSuppliers, setRecentFarmsSuppliers] = useState(null);

  // this effect is used to load all the locations from the server and set them according to its type
  useEffect(() => {
    if (data) {
      const farms = [];
      const suppliers = [];
      const farms_suppliers = [];

      for (const item of data) {
        if (item.farms) {
          farms.push(...item.farms);
        }
        if (item.suppliers) {
          suppliers.push(...item.suppliers);
        }
        if (item.farms_suppliers) {
          farms_suppliers.push(...item.farms_suppliers);
        }
      }
      setRecentFarms(farms);
      setRecentSuppliers(suppliers);
      setRecentFarmsSuppliers(farms_suppliers);
    }
  }, [data]);

  const renderAction = (item) => {
    let action = "";
    switch (item.history_type) {
      case "+":
        action = "Se añadió";
        break;
      case "~":
        action = "Se modificó";
        break;
      case "-":
        action = "Se eliminó";
        break;
      default:
        action = "Acción desconocida";
    }
    return `${action}`;
  };

  return (
    <>
      <h3>Acciones recientes</h3>
      {loading ? (
        <div>Cargando acciones recientes</div>
      ) : (
        <>
          {data ? (
            <>
              <div className="row p-3">
                <h5>Granjas</h5>
                {recentFarms ? (
                  <>
                    <ListGroup>
                      {recentFarms.map((farm, index) => (
                        <ListGroup.Item
                          key={index}
                          variant={
                            (farm.history_type === "+" && "success") ||
                            (farm.history_type === "~" && "secondary") ||
                            (farm.history_type === "-" && "danger")
                          }
                        >
                          {renderAction(farm)} la granja {farm.name}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </>
                ) : (
                  <div>No hay acciones recientes en las granjas</div>
                )}
              </div>
              <div className="row p-3">
                <h5>Proveedores</h5>
                {recentSuppliers ? (
                  <>
                    <ListGroup>
                      {recentSuppliers.map((supplier, index) => (
                        <ListGroup.Item
                          key={index}
                          variant={
                            (supplier.history_type === "+" && "success") ||
                            (supplier.history_type === "~" && "secondary") ||
                            (supplier.history_type === "-" && "danger")
                          }
                        >
                          {renderAction(supplier)} el proveedor {supplier.name}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </>
                ) : (
                  <div>No hay acciones recientes en los proveedores</div>
                )}
              </div>
              <div className="row p-3">
                <h5>Agenda</h5>
                {recenteFarmsSuppliers ? (
                  <>
                    <ListGroup>
                      {recenteFarmsSuppliers.map((farmSupplier, index) => (
                        <ListGroup.Item
                          key={index}
                          className="list-group-item"
                          variant={
                            (farmSupplier.history_type === "+" && "success") ||
                            (farmSupplier.history_type === "-" && "danger")
                          }
                        >
                          El proveedor {farmSupplier.supplier_name}{" "}
                          {renderAction(farmSupplier)} a la agenda de la granja{" "}
                          {farmSupplier.farm_name}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </>
                ) : (
                  <div>
                    No hay acciones recientes en las granjas-proveedores
                  </div>
                )}
              </div>
            </>
          ) : (
            <div>No hay datos disponibles</div>
          )}
          {error && <div>Error al cargar las acciones recientes</div>}
        </>
      )}
    </>
  );
};

export default RecentActions;
