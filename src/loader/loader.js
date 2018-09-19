import React from 'react';
import './loader.css';

const Loader = () => (
  <div className='spinner'>
    <i className="fa fa-circle-o-notch fa-spin" />
  </div>
);

Loader.displayName = 'Loader';
export default Loader;
