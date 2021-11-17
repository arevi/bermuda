import React, { useEffect, useState } from 'react';
import { useDevices } from '../../../../hooks/useDevices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleDoubleDown,
  faAngleDoubleUp,
} from '@fortawesome/free-solid-svg-icons';
import DeviceSelectorItem from './DeviceSelectorItem/DeviceSelectorItem';
import { Device } from '../../../../interfaces/Device';

import './DeviceSelector.css';

interface DeviceSelectorProps {
  selectedDevice: string;
  setSelectedDevice: (udid: string) => void;
}

const DeviceSelector = ({
  selectedDevice,
  setSelectedDevice,
}: DeviceSelectorProps) => {
  const devices = useDevices();
  const [open, setOpen] = useState<boolean>(false);

  // Validate that the currently selected device is still a valid device anytime the devices and/or selectedDevice changes
  useEffect(() => {
    // Identify all device UDIDs that are currently valid
    const deviceIds = devices.map((device) => device.udid);

    // Check if the selected device is no longer a valid device, and reset selected device
    if (selectedDevice && !deviceIds.includes(selectedDevice)) {
      setSelectedDevice('');
    }

    // Default the selected device to the first device if only 1 device is connected
    if (!selectedDevice && devices.length === 1) {
      setSelectedDevice(devices[0].udid);
    }
  }, [devices, selectedDevice, setSelectedDevice]);

  /**
   * Generate JSX for a list of devices, or a single device, depending on panel open condition
   * @param curDevices - Current device array
   * @param panelOpen - Panel open state
   * @param curSelectedDevice - Current selected device UDID
   * @returns DeviceSelectorItem|DeviceSelectorItem[]
   */
  const renderDevices = (
    curDevices: Device[],
    panelOpen: boolean,
    curSelectedDevice: string
  ) => {
    let renderedDevices: JSX.Element[] = [];

    // If the panel is open build JSX[] of DeviceSelectorItems and return
    if (panelOpen) {
      renderedDevices = curDevices.map((device) => (
        <DeviceSelectorItem
          device={device}
          key={device.udid}
          selectedDevice={selectedDevice}
          setSelectedDevice={setSelectedDevice}
        />
      ));

      return renderedDevices;
    }

    // Panel not open, filter for only selected device
    let deviceSearch = curDevices.filter(
      (device) => device.udid === curSelectedDevice
    );

    // If for some odd reason, the device disappears, return nothing
    if (deviceSearch.length === 0) {
      renderedDevices = [];

      return renderedDevices;
    }

    // Return the selected device only if the panel is closed
    return (
      <DeviceSelectorItem device={deviceSearch[0]} key={deviceSearch[0].udid} />
    );
  };

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
      {devices.length !== 0 && renderDevices(devices, open, selectedDevice)}
    </div>
  );
};

export default DeviceSelector;
