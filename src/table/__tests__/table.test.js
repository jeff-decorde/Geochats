import React from 'react';
import { Table } from '../table.js';

const loadMoreChats = jest.fn();
const initialProps = {
  headers: ['header'],
  entries: ['entry', 'entry'],
  renderEntry: (entry, index) => (<tr key={`entry-${index}`} />),
  isMobile: true,
  loadMoreChats,
  chatsData: ['entry', 'entry', 'entry', 'entry']
};

const setup = (propsOverride = {}) => {
  const props = {
    ...initialProps,
    ...propsOverride
  };
  return {
    props,
    wrapper: shallow(<Table {...props} />)
  };
};

describe('Table', () => {
  describe('Mobile table and load more button enabled', () => {
    const { wrapper, props } = setup();

    it('No headers', () => {
      expect(wrapper.find('th').length).toEqual(0);
    });

    it('Entries and load button', () => {
      const rows = wrapper.find('tbody').find('tr');
      expect(rows.length).toEqual(props.entries.length + 1);
      rows.last().find('button').props().onClick()
      expect(props.loadMoreChats).toHaveBeenCalled();
    })
  });

  describe('Desktop table no load button', () => {
    const { wrapper, props } = setup({
      isMobile: false,
      entries: initialProps.chatsData
    });

    it('should render properly', () => {
      expect(wrapper).toMatchSnapshot(wrapper);
    });

    it('Headers, entries', () => {
      expect(wrapper.find('th').length).toEqual(props.headers.length);
      expect(wrapper.find('tbody').find('tr').length).toEqual(props.chatsData.length);
    });
  });
});
