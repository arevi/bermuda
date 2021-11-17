import React from 'react';
import Map from './Map/Map';
import Titlebar from './Titlebar/Titlebar';
import Controls from './Controls/Controls';

import './App.css';

const App = () => {
  return (
    <div id='app-container'>
      <Titlebar />
      <div id='app-content'>
        <Controls />
        <Map />
      </div>
    </div>
  );
};

export default App;
