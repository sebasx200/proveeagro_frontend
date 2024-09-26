import { useEffect } from "react";
import { useMap } from "react-leaflet";
import PropTypes from 'prop-types';

// this method recieves a leaflet control instance to be added to a map dynamically and a position to be located in the map

const MapControl = ({ control, position }) => {
  // this is the leaflet hook to handle the map behavior
  const map = useMap();

  // the component is added to the map using this effect
  useEffect(() => {
    const controlInstance = control.setPosition(position).addTo(map);

    return () => {
      map.removeControl(controlInstance);
    };
  }, [control, map, position]);

  return null;
};

MapControl.propTypes = {
  control: PropTypes.object.isRequired,
  position: PropTypes.string.isRequired,
};

export default MapControl;

