import Loader from '../loader.js';
import React from 'react';

describe('Loader', () => {
  const wrapper = shallow(<Loader />);

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot(wrapper);
  });
});
