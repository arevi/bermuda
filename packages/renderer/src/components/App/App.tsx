import React from 'react';
import DeviceSelector from './DeviceSelector/DeviceSelector';
import Map from './Map/Map';
import Titlebar from './Titlebar/Titlebar';
import './App.css';

const App = () => {
  return (
    <div id='app-container'>
      <Titlebar />
      <div id='app-content'>
        <DeviceSelector />
        <Map />
      </div>
    </div>
  );
};

export default App;
