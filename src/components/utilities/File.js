import React, { Component } from 'react';
import firebase from '../../DataStore';
import PropTypes from 'prop-types';
import '../../styles/File.css';

class File extends Component {
  generateId = () => {
    return `file-${Math.floor(Math.random()*10**6)}`;
  };

  upload = () => {
    const file = this.fileSelector.files[0];
    if (!file) {
      console.log("Please select a file")
      return;
    }
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(file.name);
    fileRef.put(file).then((snapshot) => {
      this.fileSelector.value = null;
      const url = snapshot.metadata.downloadURLs[0];
      this.props.onUpload(url);
    });
  };

  render() {
    return(
      <div className="file-component">
        <input ref={(i) => this.fileSelector = i} type="file" id={this.generateId()}/>
        <button onClick={this.upload}>Upload</button>
      </div>
      )
  }
}

File.propTypes = {
  onUpload: PropTypes.func.isRequired
}

export default File;
