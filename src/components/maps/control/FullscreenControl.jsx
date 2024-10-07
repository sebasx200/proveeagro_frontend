import L from "leaflet";
import "leaflet-fullscreen/dist/leaflet.fullscreen.css";
import "leaflet-fullscreen";
import MapControl from "./MapControl";

// this is the fullscreen component for the maps
const FullscreenControl = () => {
  const fullscreenControl = L.control.fullscreen(); // the component is initialized

  // passed the component to the MapControl method to be added to the map
  return <MapControl control={fullscreenControl} position={"topleft"} />;
};

export default FullscreenControl;
