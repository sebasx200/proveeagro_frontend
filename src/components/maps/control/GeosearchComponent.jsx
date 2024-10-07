import "leaflet-geosearch/dist/geosearch.css";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import MapControl from "./MapControl";

// this is the provider for the search
const provider = new OpenStreetMapProvider();

// this is the search bar with some styles
const geoSearchControl = new GeoSearchControl({
  provider: provider,
  style: "bar",
  autoComplete: true,
  autoCompleteDelay: 250,
});

// this is the component to get returned
const GeosearchComponent = () => {
  return <MapControl control={geoSearchControl} position={"topleft"} />;
};

export default GeosearchComponent;
