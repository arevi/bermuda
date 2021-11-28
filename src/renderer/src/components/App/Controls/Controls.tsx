import React, { useState } from 'react';
import DeviceSelector from './DeviceSelector/DeviceSelector';
import LocationEntry from './LocationEntry/LocationEntry';
import { LatLngLiteral } from 'leaflet';
import { Device } from '../../../interfaces/Device';

import './Controls.css';

interface ControlsProps {
  setLocation: (arg: LatLngLiteral) => void;
  location: LatLngLiteral;
}

const Controls = ({ location, setLocation }: ControlsProps) => {
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);

  return (
    <div id='app-controls-overlay'>
      <DeviceSelector
        selectedDevice={selectedDevice}
        setSelectedDevice={setSelectedDevice}
      />
      <LocationEntry
        location={location}
        setLocation={setLocation}
        disabled={!selectedDevice || !selectedDevice.status.developer}
      />
    </div>
  );
};

export default Controls;
