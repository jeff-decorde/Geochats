import React from 'react';
import Menu from '../menu/menu.js';
import Table from '../table/table.js';
import Loader from '../loader/loader.js';
import Icon from '../icon/icon.js';
import classNames from 'classnames';
import Map from '../map/map.js';
import { CATEGORIES } from '../constants.js';
import './app.css';

class App extends React.Component {
  constructor(props) {
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

  selectChat = (index) => {
    this.setState({
      selectedChat: index
    });
  }

  getCaret = () => {
    const { isListExpanded } = this.state;
    let direction;
    if (this.props.isMobile) {
      direction =  isListExpanded ? 'up' : 'down';
    } else {
      direction = isListExpanded ? 'left' : 'right';
    }
    return <Icon icon={`caret-${direction}`} />
  }

  renderMobileEntry = (entry, index) => {
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

  renderEntry = (entry, index) => {
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
    return chats.map((chat, index) => ({
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
              {this.getCaret()}
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
