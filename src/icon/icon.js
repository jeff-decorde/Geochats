import React from 'react';
import classNames from 'classnames';
import './icon.css';

const Icon = ({ icon }) =>
  <i className={classNames('icon', 'fa', 'fa-' + icon)} />

export default Icon;
