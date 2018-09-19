import React from 'react';

export const setup = (initialProps, Component, propsOverride = {}) => {
  const props = {
    ...initialProps,
    ...propsOverride,
  };
  return {
    props,
    wrapper: shallow(<Component {...props} />)
  };
};
