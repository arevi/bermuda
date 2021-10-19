import React from 'react';
import DevicePanel from './DevicePanel/DevicePanel';
import Map from './Map/Map';

import './App.css';
import Titlebar from './Titlebar/Titlebar';

const App = () => {
  return (
    <div id='app-container'>
      <Titlebar />
      <div id='app-content'>
        <DevicePanel />
        <Map />
      </div>
    </div>
  );
};

export default App;
