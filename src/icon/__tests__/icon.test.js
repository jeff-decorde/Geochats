import Icon from '../icon.js';
import React from 'react';

describe('Icon', () => {
  const wrapper = shallow(<Icon icon='right' />);

  it('should render properly', () => {
    expect(toJson(wrapper)).toMatchSnapshot(wrapper);
  })

  it('should pass props correctly', () => {
    expect(wrapper.find('i').props().className).toEqual('icon fa fa-right');
  })
});
