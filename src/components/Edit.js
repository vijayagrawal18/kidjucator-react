import React, { Component } from 'react';
import * as R from 'ramda';
import '../styles/App.css';
import {database, login, logout, currentUser} from '../DataStore';
import AppLayout from './AppLayout';
import ListPanel from './ListPanel';
import ItemForm from './ItemForm';
import { sampleItems } from '../samples/items';
import * as NotificationSystem from 'react-notification-system';

class Edit extends Component {
  constructor(){
    super();

    this._notificationSystem = null;
    this._newItem = { id: "new" };

    this.dbItemKey = "my-items";
    currentUser(console.log);

    this.state = {
      uid: null,
      owner: null,
      allItems: {},
      selectedItemId: this._newItem.id,
    };
  };

  componentWillMount(){
    this.ref = database.syncState(this.dbItemKey, {context: this, state: 'allItems'})
  }

  componentWillUnmount(){
    database.removeBinding(this.ref);
  }

  componentDidMount() {
    this._notificationSystem = this.refs.notificationSystem;
    currentUser(user => {
      if(user){
        this.setState({uid: user.uid});
      }
    })
  }

  setSelectedItem = selectedItemId => {
    if(!this.state.allItems[selectedItemId])
      selectedItemId = this._newItem.id;

    this.setState({ selectedItemId })
  };

  loadSamples = () => {
    const allItems = {...sampleItems};
    this.setState({ allItems })
  }

  itemsWithNewTemplate = () => {
    var allItems = {...this.state.allItems}
    allItems[this._newItem.id] = this._newItem;
    return allItems;
  }

  authenticate = () => {
    login(this.authHandler);
  }

  authHandler = user => {
    const uid = user.uid;
    this.setState({uid})
    console.log(user);
    console.log("2 user");
    currentUser(console.log);
  }

  signout = () => {
    logout(() => this.setState({uid: null}));
  }

  _validInput = item => {
    const blankFields = R.toPairs(item).filter(item => R.isEmpty(item[1])).map(item => item[0]).join(', ');

    if(!R.isEmpty(blankFields)){
      this._notificationSystem.addNotification({
        message: `Please enter ${blankFields}.`,
        level: 'error'
      });
      return false;
    }

    return true;
  }

  _isPersisted = item => !(item.id === this._newItem.id);

  saveItem = itemChanges => {
    const item = R.clone(itemChanges);

    if (!this._validInput(item))
      return false;

    var action = "updated";
    if(!this._isPersisted(item)){
      action = "added";
      item.id = `${Date.now()}-${item.name}`;
    }

    const allItems = {...this.state.allItems};
    allItems[item.id] = item;
    this.setState({ allItems: allItems, selectedItemId: item.id });

    this._notificationSystem.addNotification({
      message: `Successfully ${action} ${item.name}.`,
      level: 'success'
    });
  }

  _getSelectedItem = () => this.itemsWithNewTemplate()[this.state.selectedItemId] || this._newItem;

  renderSidePanel = () => {
    return (
            <div>
              <ListPanel selectedItemId={this._getSelectedItem().id} setSelectedItem={this.setSelectedItem} items={this.itemsWithNewTemplate()}/>
              <button className="load-samples" onClick={this.loadSamples}>Load Samples</button>
            </div>
          );
  }

  renderMainArea = () => <ItemForm saveItem={this.saveItem} item={this._getSelectedItem()} />;

  renderLogin = () => {
    return (
      <nav className="login">
        <h2> Edit Items </h2>
        <p> Please login </p>
        <button className="github" onClick={this.authenticate}>Login with Github</button>
      </nav>
      );
  }

  render() {
    const logout = <button className="logout" onClick={this.signout}>Log Out!</button>

    if(!this.state.uid)
      return this.renderLogin();

    return (
      <div>
        {logout}
        <NotificationSystem ref="notificationSystem" />
        <AppLayout mainArea={this.renderMainArea} sidePanel={this.renderSidePanel} />
      </div>
    );
  }
}

export default Edit;
