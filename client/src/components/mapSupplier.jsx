import React, { useState } from 'react';
import { MapContainer, TileLayer, useMapEvents, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

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
    <MapContainer center={locationMedellin} zoom={13} style={{ height: "500px", width: "100%" }}>
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

export default Map;

