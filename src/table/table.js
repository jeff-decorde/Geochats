// @flow

import './table.css';
import React from 'react';

const Table = ({ headers, entries, renderEntry }) => (
  <table className="table is-fullwidth is-bordered">
    <thead>
      <tr>
        {headers.map((header) =>
          <th>{header}</th>
        )}
      </tr>
    </thead>
    <tbody>
      {entries.map((entry, index) => renderEntry(entry, index))}
    </tbody>
  </table>
)

export default Table;
