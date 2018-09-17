import React from 'react'
import { GoogleMap, Marker, withScriptjs, withGoogleMap } from "react-google-maps"

const DefaultMap = withScriptjs(withGoogleMap((props) => (
  <GoogleMap
    defaultZoom={8}
    defaultCenter={props.markers[0]}
  >
    {props.markers.map((marker) => <Marker {...marker} />)}
  </GoogleMap>
)));

const CustomMap = (props) => (
  <DefaultMap
    {...props}
    googleMapURL='https://maps.googleapis.com/maps/api/js?v=3'
    loadingElement={<div style={{ height: `100%` }} />}
    containerElement={<div style={{ height: `100%` }} />}
    mapElement={<div style={{ height: `100%` }} />}
  />
);

export default CustomMap
