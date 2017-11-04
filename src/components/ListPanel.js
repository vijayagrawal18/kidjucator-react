import React from 'react';
import * as R from 'ramda';
import PropTypes from 'prop-types';

import '../styles/ListPanel.css';

class ListPanel extends React.Component {

  getCss = itemId => {
    const selected = (itemId === this.props.selectedItemId) ? 'selected' : '';
    return `item ${selected} ${itemId}`;
  }

  renderItems = () => {
    const itemArray = R.toPairs(this.props.items);
    return (
      <ul className="items">
        { itemArray.map(item => {
            const key = item[0], detail = item[1];
            return (<li onClick={() => this.props.setSelectedItem(key)} key={key} id={key} className={this.getCss(key)}>
                      <img alt={detail.name} src={detail.imageUrl}/>
                   </li>
            )})
        }
      </ul>
    );
  }

  render() {
    return (
      <div className="list-panel">
        {this.renderItems()}
      </div>
    );
  }
}

ListPanel.propTypes = {
  setSelectedItem: PropTypes.func.isRequired,
  selectedItemId: PropTypes.string.isRequired
}

export default ListPanel;
