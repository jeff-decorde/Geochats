// @flow

import React from 'react';
import './loader.css';

const Loader = () => (
  <div className='spinner'>
    <i className="fas fa-spinner fa-pulse" />
  </div>
);

Loader.displayName = 'Loader';
export default Loader;
