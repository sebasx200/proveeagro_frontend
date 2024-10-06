import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import PropTypes from "prop-types";
import FullscreenControl from "./control/FullscreenControl";
import LocateControl from "./control/LocateControl";

// this is the map component that is used to show a list of locations
const LocationsMap = ({ data }) => {
  const locationMedellin = [6.25184, -75.56359]; // medellin is the default city

  return (
    <MapContainer
      center={locationMedellin}
      zoom={13}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <FullscreenControl />
      <LocateControl />
      {data ? (
        <>
          {data.map((item, index) => (
            <Marker
              key={index}
              position={[item.location.latitude, item.location.longitude]}
            >
              <Popup>
                <strong>{item.name}</strong>
                <br />
                Dirección: {item.location.address} <br />
                Ciudad: {item.location.city.name}
                <br />
                Departamento: {item.location.city.department.name}
              </Popup>
            </Marker>
          ))}
        </>
      ) : (
        <div>No se proporcianaron ubicaciones en el mapa</div>
      )}
    </MapContainer>
  );
};

// the ProTypes are added to get the array of locations correctly
LocationsMap.propTypes = {
  data: PropTypes.array.isRequired,
};

export default LocationsMap;
