// @flow

import { connect } from 'react-redux';
import './table.css';
import { loadMoreChats } from '../actions.js';
import React from 'react';

const Table = ({ headers, entries, renderEntry, isMobile, loadMoreChats }) => (
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
      <tr>
        <td colSpan='4'>
          <button
            class="button is-link"
            onClick={loadMoreChats}
          >
            Load More
          </button>
        </td>
      </tr>
    </tbody>
  </table>
)

const mapDispatchToProps = (state) => ({
  isMobile: state.browser.is.mobile
})

export default connect(mapDispatchToProps, { loadMoreChats })(Table);
