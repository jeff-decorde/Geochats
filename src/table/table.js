// @flow

import { connect } from 'react-redux';
import './table.css';
import React from 'react';

const Table = ({ headers, entries, renderEntry, isMobile }) => (
  <table className="table is-fullwidth is-bordered">
    <thead>
      <tr>
        {!isMobile && headers.map((header) =>
          <th>{header}</th>
        )}
      </tr>
    </thead>
    <tbody>
      {entries.map((entry, index) => renderEntry(entry, index))}
    </tbody>
  </table>
)

const mapDispatchToProps = (state) => ({
  isMobile: state.browser.is.mobile
})

export default connect(mapDispatchToProps, {})(Table);
