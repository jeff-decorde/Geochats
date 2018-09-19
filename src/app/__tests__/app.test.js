import React from 'React';
import App from '../app.js';
import { setup } from '../../helpers/test-helpers.js';
import markerMock from '../../mocks/marker.js';
import { CATEGORIES } from '../../constants.js';

const initialProps = {
  isMobile: false,
  getChats: jest.fn(),
  isLoading: true,
  chats: [],
  chatsData: []
};

describe('App', () => {
  describe('Data not loaded', () => {
    const { wrapper, props } = setup(initialProps, App);

    it('should render properly', () => {
      expect(wrapper).toMatchSnapshot(wrapper);
    });

    it('should initialize properly', () => {
      expect(props.getChats).toHaveBeenCalled();
      expect(wrapper.state().selectedChat).toEqual(null);
      expect(wrapper.state().isListExpanded).toEqual(props.isMobile);
    });

    it('should display the loader', () => {
      expect(wrapper.find('Loader').length).toEqual(1);
    });
  });

  describe('Data loaded', () => {
    const { wrapper, props } = setup(initialProps, App, {
      isLoading: false,
      chats: [ markerMock, markerMock ],
      chatsData: [ markerMock, markerMock ],
    });

    it('state methods', () => {
      wrapper.instance().selectChat(0);
      wrapper.instance().toggleList();
      expect(wrapper.state().selectedChat).toEqual(0);
      expect(wrapper.state().isListExpanded).toEqual(!props.isMobile);
    });

    const testContent = (cells) => {
      expect(cells.at(1).text().includes(markerMock.radius)).toEqual(true);
      expect(cells.at(2).text().includes(markerMock.maxRadius)).toEqual(true);
      expect(cells.at(3).text().includes(markerMock.coord[0].latitude)).toEqual(true);
      expect(cells.at(3).text().includes(markerMock.coord[0].longitude)).toEqual(true);
    }

    it('renderEntry', () => {
      // The first entry is selected and the list is expanded
      const firstRow = shallow(wrapper.instance().renderEntry(markerMock, 0));
      expect(firstRow.props().className.includes('selected')).toEqual(true);
      const cells = firstRow.find('td');
      expect(cells.length).toEqual(4);
      testContent(cells);
      expect(firstRow.find('img').props().src).toEqual(markerMock.thumbnailUrl)

      // We shrink the list
      wrapper.instance().toggleList();

      // The second one is not selected, the lit is not expanded and we try to click on it
      const secondRow = shallow(wrapper.instance().renderEntry(markerMock, 1));
      expect(secondRow.find('td').length).toEqual(1);

      // We expand the list again
      wrapper.instance().toggleList();

      secondRow.props().onClick();
      expect(wrapper.state().selectedChat).toEqual(1);
      expect(wrapper.state().isListExpanded).toEqual(false);
    });

    it('renderMobileEntry', () => {
      // We extend the list again
      wrapper.instance().toggleList(true);

      // We render the second entry (not selected)
      const row = shallow(wrapper.instance().renderMobileEntry(markerMock, 0));
      const getRowInformation = () => row.find('.entry-information');
      testContent(getRowInformation().find('div'))
      expect(row.find('img').props().src).toEqual(markerMock.thumbnailUrl);
      expect(getRowInformation().props().className.includes('extended')).toEqual(false);

      // We click the map button of the next row
      const secondRow = shallow(wrapper.instance().renderMobileEntry(markerMock, 1));
      secondRow.find('.button-cell').props().onClick();
      expect(wrapper.state().isListExpanded).toEqual(false);
      expect(wrapper.state().selectedChat).toEqual(1);
    });

    it('getMapCenter', () => {
      wrapper.instance().selectChat(null);
      expect(wrapper.instance().getMapCenter()).toEqual(null);
      wrapper.instance().selectChat(0);
      expect(wrapper.instance().getMapCenter()).toEqual({
        lat: markerMock.coord[0].latitude,
        lng: markerMock.coord[0].longitude,
      });
    });

    it('getCategories', () => {
      expect(wrapper.instance().getCategories()).toEqual([]);
      wrapper.instance().toggleList();
      expect(wrapper.instance().getCategories()).toEqual(CATEGORIES);
    });

    it('props should be passed correctly', () => {
      const chatsTable = wrapper.find('.chats-table');
      expect(chatsTable.props().className.includes('expanded')).toEqual(wrapper.state().isListExpanded);

      const tableProps = chatsTable.props().children.props;
      expect(tableProps.isMobile).toEqual(props.isMobile ? true : !wrapper.state().isListExpanded)
      expect(tableProps.renderEntry).toEqual(props.isMobile ? wrapper.instance().renderMobileEntry : wrapper.instance().renderEntry)

      const expandButtonProps = wrapper.find('.expand-button').props();
      expect(expandButtonProps.className.includes('reverse')).toEqual(!wrapper.state().isListExpanded);
      expect(expandButtonProps.onClick).toEqual(wrapper.instance().toggleList);
      expect(expandButtonProps.children).toEqual(wrapper.instance().getCaret());

      const mapProps = wrapper.find('Map').props();
      expect(mapProps.onClickMarker).toEqual(wrapper.instance().selectChat);
      expect(mapProps.markers).toEqual(wrapper.instance().mapChatsToMarkers());
      expect(mapProps.center).toEqual(wrapper.instance().getMapCenter());
    });
  });
});
