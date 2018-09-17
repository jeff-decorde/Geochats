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
      {entries.map((entry) => renderEntry(entry))}
    </tbody>
  </table>
)

export default Table;
