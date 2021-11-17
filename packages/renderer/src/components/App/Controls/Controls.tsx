import React, { useState } from 'react';
import DeviceSelector from './DeviceSelector/DeviceSelector';
import LocationEntry from './LocationEntry/LocationEntry';

import './Controls.css';

const Controls = () => {
  const [selectedDevice, setSelectedDevice] = useState<string>('');

  return (
    <div id='app-controls-overlay'>
      <DeviceSelector
        selectedDevice={selectedDevice}
        setSelectedDevice={setSelectedDevice}
      />
      <LocationEntry disabled={selectedDevice === ''} />
    </div>
  );
};

export default Controls;
