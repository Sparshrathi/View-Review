import React from "react";
import { withScriptjs, withGoogleMap } from "react-google-maps";
import Map from "./Map";

const WrappedMap = withScriptjs(withGoogleMap(Map));

const MapContent = () => {

  return (
    <div className="map">
      <WrappedMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAlELmqkRobpn26ReMLLTirp7GHsaW8vy0`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `80vh` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
};

export default MapContent;