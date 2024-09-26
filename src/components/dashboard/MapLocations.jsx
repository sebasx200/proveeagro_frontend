import LocationsMap from "../maps/LocationsMap";

function MapLocations() {
  const locations = [
    [6.256909205290871, -75.54989855264175], // Coordenada 1
  ];

  return (
    <div>
      <h1>Mapa de Ubicaciones</h1>
      <LocationsMap locations={locations} />
    </div>
  );
}

export default MapLocations;
