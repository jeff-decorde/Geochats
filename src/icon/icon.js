import React from 'react';
import classNames from 'classnames';
import './icon.css';

const Icon = (props) => {
  const icons = props.icons.map((icon) => 'fa-' + icon);
  return <i className={classNames('icon', 'fa', ...icons)} />
};

export default Icon;
