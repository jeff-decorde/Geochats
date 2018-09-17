import React from 'react';
import './loader.css';

const Loader = () => (
  <div className='spinner'>
    <i className="fa fa-circle-o-notch fa-spin" style={{ fontSize : 24 }} />
  </div>
);

export default Loader;
