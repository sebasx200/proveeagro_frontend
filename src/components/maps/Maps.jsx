// these are the map components that are use for the forms and the list of farms and suppliers
import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  Marker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import PropTypes from "prop-types";

// Map component to show a map and handle the click event to get the coordinates
const Map = ({ onMapClick }) => {
  const locationMedellin = [6.25184, -75.56359];
  const [markerPosition, setMarkerPosition] = useState(null);

  const MapEvents = () => {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        setMarkerPosition([lat, lng]);
        onMapClick(e.latlng);
      },
    });
    return null;
  };

  return (
    <MapContainer
      center={locationMedellin}
      zoom={13}
      style={{ height: "350px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MapEvents />
      {markerPosition && (
        <Marker position={markerPosition}>
          <Popup>Dirección exacta del proveedor</Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

// LocationMap component to show a map with a marker in a specific location
const LocationMap = ({ lat, lng, popupText, onMapClick, onMarkerRemove }) => {
  const [markerPosition, setMarkerPosition] = useState(null);

  const MapEvents = () => {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        setMarkerPosition([lat, lng]);
        onMapClick(e.latlng);
      },
    });
    return null;
  };

  const handleMarkerClick = () => {
    setMarkerPosition(null);
    onMarkerRemove();
  };

  return (
    <MapContainer
      center={[lat, lng]}
      zoom={13}
      style={{ height: "350px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <MapEvents />
      {markerPosition && (
        <Marker position={markerPosition} eventHandlers={{click: handleMarkerClick}}>
          <Popup>Dirección exacta del proveedor</Popup>
        </Marker>
      )}
      <Marker position={[lat, lng]}>
        <Popup>{popupText}</Popup>
      </Marker>
    </MapContainer>
  );
};

export { Map, LocationMap };

LocationMap.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  popupText: PropTypes.string.isRequired,
  onMapClick: PropTypes.func.isRequired,
  onMarkerRemove: PropTypes.func.isRequired,
};

Map.propTypes = {
  onMapClick: PropTypes.func.isRequired,
};