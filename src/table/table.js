// @flow

import { connect } from 'react-redux';
import './table.css';
import { loadMoreChats } from '../actions.js';
import React from 'react';

const Table = ({ headers, entries, renderEntry, isMobile, loadMoreChats, chatsData }) => (
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
      {chatsData.length !== entries.length && (
        <tr>
          <td colSpan='4'>
            <button
              className="button is-link"
              onClick={loadMoreChats}
            >
              Load More
            </button>
          </td>
        </tr>
      )}
    </tbody>
  </table>
)

const mapDispatchToProps = (state) => ({
  isMobile: state.browser.is.mobile,
  chatsData: state.chats.chatsData
})

export default connect(mapDispatchToProps, { loadMoreChats })(Table);
