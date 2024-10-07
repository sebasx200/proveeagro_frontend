import L from "leaflet"; // Import L from leaflet to start using the plugin
import "leaflet.locatecontrol"; // Import plugin
import "leaflet.locatecontrol/dist/L.Control.Locate.min.css"; // Import styles
import MapControl from './MapControl';

// this is the locate control to find the user current location

const LocateControl = () => {

  // these are the styles and behavior
  const locateControl = L.control.locate({
    flyTo: true,
    strings: {
      title: 'Mostrar mi ubicación',
    },
  });
  
  // passed the component to the MapControl method to be added to the map
  return <MapControl control={locateControl} position={"topleft"} />;
};

export default LocateControl;