// @flow

import React from 'react';
import classNames from 'classnames';
import './icon.css';

type Props = {
  icon: string
};

const Icon = ({ icon }: Props) =>
  <i className={classNames('icon', 'fa', 'fa-' + icon)} />

export default Icon;
