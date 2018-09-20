import React from 'react';
import { InfoWindow } from 'react-google-maps';

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
};

LocationInfoWindow.displayName = 'LocationInfoWindow';
export default LocationInfoWindow;
