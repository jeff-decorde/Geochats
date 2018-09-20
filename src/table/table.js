// @flow

import { connect } from 'react-redux';
import './table.css';
import { loadMoreChats } from '../actions.js';
import React from 'react';

type Props = {
  headers: Array<string>,
  entries: Array<Object>,
  renderEntry: (Object, number) => Array<React$Element<*>>,
  isMobile: boolean,
  loadMoreChats: () => void,
  chatsData: Array<Object>,
}

export const Table = ({ headers, entries, renderEntry, isMobile, loadMoreChats, chatsData }: Props) => (
  <table className="table is-fullwidth is-bordered">
    {!isMobile && <thead>
      <tr>
        {headers.map((header, index) =>
          <th key={`header-${index}`}>{header}</th>
        )}
      </tr>
    </thead>}
    <tbody>
      {entries.map(renderEntry)}
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
  chatsData: state.chats.chatsData
})

export default connect(mapDispatchToProps, { loadMoreChats })(Table);
