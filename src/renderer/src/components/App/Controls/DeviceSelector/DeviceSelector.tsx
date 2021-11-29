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
  selectedDevice: Device | null;
  setSelectedDevice: (device: Device | null) => void;
}

const DeviceSelector = ({
  selectedDevice,
  setSelectedDevice,
}: DeviceSelectorProps) => {
  const devices = useDevices();
  const [open, setOpen] = useState<boolean>(false);

  console.log(selectedDevice);
  console.log(devices);

  // Validate that the currently selected device is still a valid device anytime the devices and/or selectedDevice changes
  useEffect(() => {
    // Identify all device UDIDs that are currently valid
    const deviceIds = devices.map((device) => device.udid);

    // Check if the selected device is no longer a valid device, and reset selected device
    if (selectedDevice && !deviceIds.includes(selectedDevice.udid)) {
      setSelectedDevice(null);
    }

    // If there is a currently selected device, update it's state
    if (selectedDevice) {
      setSelectedDevice(
        devices.filter((device) => device.udid === selectedDevice.udid)[0]
      );
    }

    // Default the selected device to the first device if only 1 device is connected
    if (!selectedDevice && devices.length === 1) {
      setSelectedDevice(devices[0]);
    }
  }, [devices, selectedDevice, setSelectedDevice]);

  /**
   * Generate JSX for a list of devices, or a single device, depending on panel open condition
   * @param curDevices - Current device array
   * @param panelOpen - Panel open state
   * @param curSelectedDevice - Current selected device UDID
   * @returns JSX.Element<DeviceSelectorItem|div> | JSX.Element[]<DeviceSelectorItem[]>
   */
  const renderDevices = (
    curDevices: Device[],
    panelOpen: boolean,
    curSelectedDevice: Device | null
  ) => {
    // If the panel is open build JSX[] of DeviceSelectorItems and return
    // Note: There is a conditional prop that is spread of selectedDevice, if a device is selected (neat right?)
    if (panelOpen) {
      const renderedDevices: JSX.Element[] = curDevices.map((device) => (
        <DeviceSelectorItem
          device={device}
          key={device.udid}
          {...(selectedDevice ? { selectedDevice: selectedDevice } : {})}
          setSelectedDevice={setSelectedDevice}
          renderMenu={false}
        />
      ));

      return renderedDevices;
    }

    // Panel not open, filter for only selected device
    let deviceSearch = curDevices.filter(
      (device) => device.udid === curSelectedDevice?.udid
    );

    // This is awkward, no selected device was found
    if (deviceSearch.length === 0 || !selectedDevice) {
      return (
        <div id='device-msg-container'>
          <span id='devices-msg'>No device selected</span>
        </div>
      );
    }

    return (
      <DeviceSelectorItem
        device={deviceSearch[0]}
        key={deviceSearch[0].udid}
        renderMenu={true}
      />
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
