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
  const [panelOpen, setPanelOpen] = useState<boolean>(false);

  /**
   * Sends window event to update selected devices location and updates the location to be rendered on map
   * @param newCoordinates - Location coordinates (string)
   */
  const handleCoordinateUpdate = (newCoordinates: string) => {
    // Send device event to update specific device location
    window.api.send('device', {
      type: 'SetLocation',
      payload: { udid: selectedDevice?.udid, location: newCoordinates },
    });

    // Split location string
    const coords = newCoordinates.split(',');

    // Update location on map
    setLocation({
      lat: parseFloat(coords[0]),
      lng: parseFloat(coords[1]),
    });
  };

  return (
    <div className={`app-controls-overlay ${panelOpen ? 'overlay-open' : ''}`}>
      <DeviceSelector
        selectedDevice={selectedDevice}
        setSelectedDevice={setSelectedDevice}
        panelOpen={panelOpen}
        setPanelOpen={setPanelOpen}
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
