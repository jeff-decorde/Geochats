import React from 'react';
import Menu from '../menu/menu.js';
import Table from '../table/table.js';
import Loader from '../loader/loader.js';
import Icon from '../icon/icon.js';
import classNames from 'classnames';
import Map from '../map/map.js';
import './app.css';

class App extends React.Component {
  state = {
    selectedChat: null,
    isListExpanded: false
  };

  componentWillMount() {
    this.props.getChats();
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
        className={classNames('entry', this.state.selectedChat === index && 'selected')}
        onClick={() => this.setState({ selectedChat: index })}
      >
        <td>
          <img
            className='entry-thumbnail'
            src={thumbnailUrl}
            width={30}
            height={30}
          />
          <div className='entry-name'>{name}</div>
        </td>
        {this.state.isListExpanded && [
          <td>{radius}</td>,
          <td>{maxRadius}</td>,
          <td>{`${coord[0].latitude}, ${coord[0].longitude}`}</td>
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

  render() {
    const {
      chats,
      isLoading,
      error
    } = this.props;
    const {
      isListExpanded,
      selectedChat
    } = this.state;

    const categories = isListExpanded
      ? ['Radius', 'Maximum Radius', 'Coordinates']
      : [];

    const selectedMarker = chats[selectedChat];
    const mapCenter = selectedChat
      ? {
        lat: selectedMarker.coord[0].latitude,
        lng: selectedMarker.coord[0].longitude
      }
      : null;

    return (
      <div className="App">
        <Menu />
        {isLoading
          ? <Loader />
          : [
            <div className={classNames('chats-table', isListExpanded && 'expanded')}>
              <Table
                headers={['Name', ...categories]}
                entries={this.props.chats}
                renderEntry={this.renderEntry}
              />
              <div
                className={classNames('expand-button', isListExpanded && 'right')}
                onClick={() => this.setState({ isListExpanded: !isListExpanded })}
              >
                <Icon icons={[`caret-${isListExpanded ? 'left' : 'right'}`]} />
              </div>
            </div>,
            <div className='chats-map'>
              <Map
                onClickMarker={(index) => this.setState({ selectedChat: index })}
                center={mapCenter}
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
