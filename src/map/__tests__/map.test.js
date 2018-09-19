import markerMock from '../../mocks/marker.js';
import { Map, renderMarkers } from '../map.js';
import React from 'react';
import {
  withScriptjs,
  withGoogleMap
} from 'react-google-maps';

// Mock Google Maps Size class
window.google = {
  maps: {
    Size: class Size { }
  }
}

describe('Map', () => {
  const onClick = jest.fn();
  const center = {
    lat: markerMock.coord[0].latitude,
    lng: markerMock.coord[0].longitude,
  };
  const formattedMarker = {
    icon: 'icon',
    data: markerMock,
    ...center
  }
  const markers = [ formattedMarker, { ...formattedMarker, isOpen: true }, formattedMarker ];
  const wrapper = shallow(
    <Map
      center={center}
      markers={markers}
    />
  );

  it('should pas the right props', () => {
    const defaultMapComponent = wrapper.find('DefaultMap');
    expect(defaultMapComponent.length).toEqual(1);
    expect(defaultMapComponent.props().center).toEqual(center);
    expect(defaultMapComponent.props().markers).toEqual(markers);
  });

  describe('renderMarkers', () => {
    const markerComponents = renderMarkers(markers, onClick);
    const [firstMarker, secondMarker] = markerComponents;

    it('Right number of markers', () => {
      expect(markerComponents.length).toEqual(markers.length);
    })

    it('Marker not open', () => {
      const firstMarkerProps = firstMarker[0].props;
      expect(firstMarker[0].type.displayName).toEqual('Marker');
      expect(firstMarkerProps.children).toBeUndefined();
      expect(firstMarkerProps.icon.url).toEqual(formattedMarker.icon)
      expect(firstMarkerProps.position).toEqual(center)
      firstMarkerProps.onClick();
      expect(onClick).toHaveBeenCalled();
      expect(firstMarker[1]).toBeUndefined();
    });

    it('Marker open', () => {
      const circleProps = secondMarker[1].props;
      expect(secondMarker[0].props.children.type.displayName).toEqual('LocationInfoWindow');
      expect(secondMarker[1].type.displayName).toEqual('Circle');
      expect(circleProps.defaultCenter).toEqual(center);
      expect(circleProps.radius).toEqual(formattedMarker.data.radius);
    })
  })
});
