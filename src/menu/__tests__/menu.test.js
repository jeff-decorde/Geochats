import React from 'react';
import Menu from '../menu.js';

describe('Menu', () => {
  const wrapper = shallow(<Menu />);
  
  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot(wrapper);
  })
})
