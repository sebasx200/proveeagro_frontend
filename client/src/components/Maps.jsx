// these are the map components that are use for the forms and the list of farms and suppliers
import React, { useState } from 'react';
import { MapContainer, TileLayer, useMapEvents, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

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
    <MapContainer center={locationMedellin} zoom={13} style={{ height: "350px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MapEvents />
      {markerPosition && (
        <Marker position={markerPosition}>
          <Popup>
            Dirección exacta del proveedor
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

// LocationMap component to show a map with a marker in a specific location
const LocationMap = ({ lat, lng, popupText }) => {
  return (
    <MapContainer center={[lat, lng]} zoom={13} style={{ height: "400px", width: "400px" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[lat, lng]}>
        <Popup>
          {popupText}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export {Map, LocationMap};

