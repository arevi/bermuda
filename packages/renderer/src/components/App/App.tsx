import React from 'react';
import DeviceSelector from './DeviceSelector/DeviceSelector';
import Map from './Map/Map';
import Titlebar from './Titlebar/Titlebar';
import './App.css';
import LocationEntry from './LocationEntry/LocationEntry';

const App = () => {
  return (
    <div id='app-container'>
      <Titlebar />
      <div id='app-content'>
        <div id='app-controls-overlay'>
          <DeviceSelector />
          <LocationEntry />
        </div>
        <Map />
      </div>
    </div>
  );
};

export default App;
