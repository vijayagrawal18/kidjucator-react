import React from 'react';
import Header from './Header';

const AppLayout = props => {

  return (
    <div className="app">
      <Header/>
      <div className="side-panel">
        {props.sidePanel()}
      </div>
      <div className="main-area">
        {props.mainArea()}
      </div>
    </div>
  )
}

export default AppLayout;
