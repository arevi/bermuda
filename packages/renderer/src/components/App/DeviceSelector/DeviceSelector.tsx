import React, { useEffect, useState } from 'react';
import { Device } from '../../../interfaces/Device';
import { useDevices } from '../../../hooks/useDevices';
import './DeviceSelector.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleDoubleDown,
  faAngleDoubleUp,
} from '@fortawesome/free-solid-svg-icons';

const DeviceSelector = () => {
  const [selectedDevice, setSelectedDevice] = useState<Device | null>();
  const devices = useDevices();
  const [open, setOpen] = useState<boolean>(false);

  // Validate that the currently selected device is still a valid device anytime the devices and/or selectedDevice changes
  useEffect(() => {
    // Identify all device UDIDs that are currently valid
    const deviceIds = devices.map((device) => device.udid);

    // Check if the selected device is no longer a valid device, and reset selected device
    if (selectedDevice && !deviceIds.includes(selectedDevice?.udid)) {
      setSelectedDevice(null);
    }

    if (!selectedDevice && devices.length === 1) {
      setSelectedDevice(devices[0]);
    }
  }, [devices, selectedDevice]);

  return (
    <div id='device-panel' className={`${open ? 'open' : 'closed'}`}>
      <div id='device-panel-header'>
        <button
          id='device-panel-toggle-btn'
          title='Expand Panel'
          onClick={() => setOpen(!open)}
        >
          <FontAwesomeIcon icon={open ? faAngleDoubleDown : faAngleDoubleUp} />
        </button>
      </div>
      {devices.length === 0 && (
        <div id='device-msg-container'>
          <span id='devices-msg'>No devices detected</span>
        </div>
      )}
    </div>
  );
};

export default DeviceSelector;
