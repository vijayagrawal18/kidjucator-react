import React, { Component } from 'react';
import '../styles/App.css';
import {database} from '../DataStore';
import AppLayout from './AppLayout';
import ListPanel from './ListPanel';

class Play extends Component {
  constructor(){
    super();
    this.dbItemKey = "my-items";

    this.state = {
      selectedItem: { id: "" },
      allItems: {},
    };

    this.fetchItems();
  };

  fetchItems = () => {
    database.fetch(this.dbItemKey, { context: this }
    ).then(allItems => this.setState({allItems})
    ).catch(error => console.log(error))
  }

  setSelectedItem = selectedItemId => {
    const selectedItem = this.state.allItems[selectedItemId] || {};
    this.setState({ selectedItem })
  };

  componentDidUpdate(){
    this.playAudio();
  }

  playAudio = () => {
    const audioUrl = this.state.selectedItem.audioUrl;
    if(audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
    }
  }

  renderSidePanel = () => {
    return <ListPanel selectedItemId={this.state.selectedItem.id} setSelectedItem={this.setSelectedItem} items={this.state.allItems}/>
  }

  renderMainArea = () => {
    var mainArea = "Let's play. Please tap an item to play sound";

    const imageUrl = this.state.selectedItem.imageUrl;
    if(imageUrl){
      mainArea = <img onClick={this.playAudio} src={imageUrl} alt={this.state.selectedItem.name}></img>;
    }

    return mainArea;
  }

  render() {
    return (
        <AppLayout sidePanel={this.renderSidePanel} mainArea={this.renderMainArea} />
    );
  }
}

export default Play;
