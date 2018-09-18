/* global google */

import React from 'react'
import {
  GoogleMap,
  Marker,
  Circle,
  withScriptjs,
  withGoogleMap,
  InfoWindow
} from "react-google-maps"

const LocationInfoWindow = (props) => {
  const {
    data: {
      name,
      radius,
      maxRadius,
      coord
    }
  } = props.marker;
  return (
    <InfoWindow>
      <div>
        <div>
          <b>Name : </b>
          <span>{name}</span>
        </div>
        <div>
          <b>Radius : </b>
          <span>{radius}</span>
        </div>
        <div>
          <b>Maximum radius : </b>
          <span>{maxRadius}</span>
        </div>
        <div>
          <b>Coordinates : </b>
          <span>{`${coord[0].latitude}, ${coord[0].longitude}`}</span>
        </div>
      </div>
    </InfoWindow>
  )
}

const DefaultMap = withScriptjs(withGoogleMap((props) => (
  <GoogleMap
    center={props.center || props.markers[0]}
    defaultZoom={12}
  >
    {props.markers.map((marker, index) => [
      <Marker
        icon={{
          url: marker.icon,
          scaledSize: new google.maps.Size(30, 30)
        }}
        onClick={() => props.onClickMarker(index)}
        position={{
          lat: marker.lat,
          lng: marker.lng
        }}
      >
        {marker.isOpen && <LocationInfoWindow marker={marker} />}
      </Marker>,
      marker.isOpen && (
        <Circle
          defaultCenter={{
            lat: marker.lat,
            lng: marker.lng
          }}
          radius={marker.data.radius}
        />
      )
    ])}
  </GoogleMap>
)));

const CustomMap = (props) => (
  <DefaultMap
    {...props}
    googleMapURL='https://maps.googleapis.com/maps/api/js?v=3&key=AIzaSyBcqh31rQqO_GLm423hSusYITRqflNYoBQ'
    loadingElement={<div style={{ height: `100%` }} />}
    containerElement={<div style={{ height: `100%` }} />}
    mapElement={<div style={{ height: `100%` }} />}
  />
);

export default CustomMap
