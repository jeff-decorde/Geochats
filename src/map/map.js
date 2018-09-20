// @flow
/* global google */

import React from 'react'
import LocationInfoWindow from './info-window.js';
import {
  GoogleMap,
  Marker,
  Circle,
  withScriptjs,
  withGoogleMap,
} from "react-google-maps";

import type { MarkerT } from '../types.js';

type Props = {
  center: {
    lat: number,
    lng: number
  },
  markers: Array<MarkerT>,
  onClickMarker: (number) => void,
};

// I decided to export this function since I can't shallow the GoogleMap component in my tests
// So, I chose to test the content of the map instead of the map itself
// The center property is not tested though :/
Marker.displayName = 'Marker';
Circle.displayName = 'Circle';

export const renderMarkers = (markers: Array<MarkerT>, onClickMarker: (number) => void): Array<React.Node> =>
  markers.map((marker: MarkerT, index: number) => [
    <Marker
      key={`marker-${index}`}
      icon={{
        url: marker.icon,
        scaledSize: new google.maps.Size(30, 30)
      }}
      onClick={() => onClickMarker(index)}
      position={{
        lat: marker.lat,
        lng: marker.lng
      }}
    >
      {marker.isOpen && <LocationInfoWindow marker={marker} />}
    </Marker>,
    marker.isOpen && (
      <Circle
        key={`circle-${index}`}
        defaultCenter={{
          lat: marker.lat,
          lng: marker.lng
        }}
        radius={marker.data.radius}
      />
    )
  ]);

const PureMap = ({ center, markers, onClickMarker }: Props) => (
  <GoogleMap
    center={center || markers[0]}
    defaultZoom={12}
  >
    {renderMarkers(markers, onClickMarker)}
  </GoogleMap>
);

export const Map = (props: Props) => {
  const DefaultMap = withScriptjs(withGoogleMap(PureMap));
  DefaultMap.displayName = 'DefaultMap'
  return (<DefaultMap
    {...props}
    googleMapURL='https://maps.googleapis.com/maps/api/js?v=3&key=AIzaSyBcqh31rQqO_GLm423hSusYITRqflNYoBQ'
    loadingElement={<div style={{ height: `100%` }} />}
    containerElement={<div style={{ height: `100%` }} />}
    mapElement={<div style={{ height: `100%` }} />}
  />);
};

Map.displayName = 'Map';
export default Map
