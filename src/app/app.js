// @flow

import React from 'react';
import Menu from '../components/menu/menu.js';
import Table from '../components/table/table.js';
import Loader from '../components/loader/loader.js';
import Icon from '../components/icon/icon.js';
import classNames from 'classnames';
import Map from '../components/map/map.js';
import { CATEGORIES } from '../constants.js';
import './app.css';

import type { Chat } from '../types.js'

type Props = {
  getChats: () => void,
  chats: Array<Chat>,
  isMobile: boolean,
  isLoading: boolean,
}

type State = {
  selectedChat: ?number,
  isListExpanded: boolean
}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedChat: null,
      isListExpanded: props.isMobile,
    };
  }

  componentWillMount() {
    this.props.getChats();
  }

  toggleList = () => {
    this.setState({
      isListExpanded: !this.state.isListExpanded
    });
  }

  selectChat = (index: ?number) => {
    this.setState({
      selectedChat: index
    });
  }

  getDirection = () => {
    const { isListExpanded } = this.state;
    if (this.props.isMobile) {
      return isListExpanded ? 'up' : 'down';
    } else {
      return isListExpanded ? 'left' : 'right';
    }
  }

  renderMobileEntry = (entry: Chat, index: number) => {
    const {
      name,
      thumbnailUrl,
      radius,
      maxRadius,
      coord = [{}],
    } = entry;
    return (
      <tr
        className='entry'
        key={`entry-${index}`}
      >
        <td
          className='entry-cell'
          onClick={(e) => {
            this.selectChat(index);
          }}
        >
          <div>
            <img
              className='entry-thumbnail'
              alt='City'
              src={thumbnailUrl}
              width={30}
              height={30}
            />
            <div className='entry-name'>{name}</div>
            <div
              className='button-cell'
              onClick={(e) => {
                this.toggleList();
              }}
            >
              <Icon icon='map-marker' />
            </div>
          </div>
          <div className={classNames('entry-information', index === this.state.selectedChat && 'extended')}>
            <div>{`Radius : ${radius}`}</div>
            <div>{`Maximum : ${maxRadius}`}</div>
            <div>{`Coordinates : ${coord[0].latitude}, ${coord[0].longitude}`}</div>
          </div>
        </td>
      </tr>
    );
  }

  renderEntry = (entry: Chat, index: number) => {
    const {
      name,
      thumbnailUrl,
      radius,
      maxRadius,
      coord = [{}],
    } = entry;
    return (
      <tr
        key={`entry-${index}`}
        className={classNames('entry', this.state.selectedChat === index && 'selected')}
        onClick={() => {
          this.selectChat(index)
          this.setState({
            isListExpanded: false
          });
        }}
      >
        <td className='entry-cell'>
          <img
            className='entry-thumbnail'
            alt='City'
            src={thumbnailUrl}
            width={30}
            height={30}
          />
          <div className='entry-name'>{name}</div>
        </td>
        {this.state.isListExpanded && [
          <td key={`entry-radius-${index}`} className='entry-cell'>{radius}</td>,
          <td key={`entry-max-radius-${index}`} className='entry-cell'>{maxRadius}</td>,
          <td key={`entry-coords-${index}`} className='entry-cell'>{`${coord[0].latitude}, ${coord[0].longitude}`}</td>
        ]}
      </tr>
    );
  }

  mapChatsToMarkers = () => {
    const { chats } = this.props;
    return chats.map((chat: Chat, index: number) => ({
      lat: chat.coord[0].latitude,
      lng: chat.coord[0].longitude,
      icon: chat.thumbnailUrl,
      data: chat,
      isOpen: index === this.state.selectedChat
    }));
  }

  getMapCenter = () => {
    const { selectedChat } = this.state;
    const { chats } = this.props;
    const selectedMarker = chats[selectedChat];
    return selectedChat === null
      ? null
      : {
        lat: selectedMarker.coord[0].latitude,
        lng: selectedMarker.coord[0].longitude
      };
  }

  getCategories = () => {
    return this.state.isListExpanded
      ? CATEGORIES
      : [];
  }

  render() {
    const {
      chats,
      isLoading,
      isMobile,
    } = this.props;
    const { isListExpanded } = this.state;

    return (
      <div className="App">
        <Menu />
        {isLoading
          ? <Loader />
          : [
            <div
              key='chats-table'
              className={classNames('chats-table', isListExpanded && 'expanded')}
            >
              <Table
                headers={['Name', ...this.getCategories()]}
                entries={chats}
                isMobile={isMobile ? true : !isListExpanded}
                renderEntry={isMobile ? this.renderMobileEntry : this.renderEntry}
              />
            </div>,
            <div
              key='expand-button'
              className={classNames('expand-button', !isListExpanded && 'reverse')}
              onClick={this.toggleList}
            >
              <Icon icon={`caret-${this.getDirection()}`} />
            </div>,
            <div
              className='chats-map'
              key='chats-map'
            >
              <Map
                onClickMarker={this.selectChat}
                center={this.getMapCenter()}
                markers={this.mapChatsToMarkers()}
              />
            </div>
          ]
        }
      </div>
    );
  }
}

export default App;
