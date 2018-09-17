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
    isListExpanded: false
  };

  componentWillMount() {
    this.props.getChats();
  }

  renderEntry = (entry) => {
    const {
      name,
      thumbnailUrl,
      radius,
      maxRadius,
      coord = [{}],
    } = entry;
    return (
      <tr className='entry'>
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

  render() {
    const {
      chats,
      isLoading,
      error
    } = this.props;
    const { isListExpanded } = this.state;
    const categories = isListExpanded
      ? ['Radius', 'Maximum Radius', 'Coordinates']
      : [];
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
                markers={this.props.chats.map((chat) => ({
                  lat: chat.coord[0].latitude,
                  lng: chat.coord[0].longitude
                }))}
              />
            </div>
          ]
        }
      </div>
    );
  }
}

export default App;
