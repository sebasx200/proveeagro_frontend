import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import PropTypes from "prop-types";
import FullscreenControl from "./control/FullscreenControl";
import LocateControl from "./control/LocateControl";

// this is the map component that is used to show a list of locations
const LocationsMap = ({ locations }) => {
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
      {locations.map((location, index) => (
        <Marker
          key={index}
          position={[location.location.latitude, location.location.longitude]}
        >
          <Popup>
            <strong>{location.name}</strong><br />
            Dirección: {location.location.address} <br />
            Ciudad: {location.location.city.name}<br />
            Departamento: {location.location.city.department.name}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

// the ProTypes are added to get the array of locations correctly
LocationsMap.propTypes = {
  locations: PropTypes.array.isRequired,
};

export default LocationsMap;
