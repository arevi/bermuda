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

  const handleCoordinateUpdate = (newCoordinates: string) => {
    window.api.send('device', {
      type: 'SetLocation',
      payload: { udid: selectedDevice?.udid, location: newCoordinates },
    });

    const coords = newCoordinates.split(',');

    setLocation({
      lat: parseFloat(coords[0]),
      lng: parseFloat(coords[1]),
    });
  };

  return (
    <div id='app-controls-overlay'>
      <DeviceSelector
        selectedDevice={selectedDevice}
        setSelectedDevice={setSelectedDevice}
      />
      <LocationEntry
        location={location}
        handleCoordinateUpdate={handleCoordinateUpdate}
        disabled={!selectedDevice || !selectedDevice.status.developer}
      />
    </div>
  );
};

export default Controls;
