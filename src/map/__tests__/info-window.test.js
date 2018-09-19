import React from 'react';
import LocationInfoWindow from '../info-window.js';
import markerMock from '../../mocks/marker.js';

describe('LocationInfoWindow', () => {
  const wrapper = shallow(
    <LocationInfoWindow
      marker={{
        data: markerMock
      }}
    />
  );

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot(wrapper);
  });

  it('should pass the right props', () => {
    expect(wrapper.find('InfoWindow').length).toEqual(1);
    const spans = wrapper.find('span');
    expect(spans.at(0).text()).toEqual(markerMock.name);
    expect(spans.at(1).text()).toEqual(`${markerMock.radius}`);
    expect(spans.at(2).text()).toEqual(`${markerMock.maxRadius}`);
    expect(spans.at(3).text()).toEqual(`${markerMock.coord[0].latitude}, ${markerMock.coord[0].longitude}`);
  })
});
