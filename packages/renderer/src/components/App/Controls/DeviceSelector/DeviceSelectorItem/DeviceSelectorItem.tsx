import { faMobile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Device } from '../../../../../interfaces/Device';

import './DeviceSelectorItem.css';

interface DeviceSelectorItemProps {
  device: Device;
  selectedDevice?: string;
  setSelectedDevice?: (udid: string) => void;
}

const DeviceSelectorItem = ({
  device,
  selectedDevice,
  setSelectedDevice,
}: DeviceSelectorItemProps) => {
  /**
   * Verify the item is in a selectable state and is not the current selected device, then update the selected device
   * @param udid - Device UDID
   */
  const handleDeviceClick = (udid: string) => {
    if (setSelectedDevice && device.udid !== selectedDevice) {
      setSelectedDevice(udid);
    }
  };

  return (
    <div
      className={`device-selector-item ${
        selectedDevice === device.udid ? 'selected-device' : ''
      }`}
      onClick={() => handleDeviceClick(device.udid)}
    >
      <div className='device-selector-item-icon-container'>
        <FontAwesomeIcon
          icon={faMobile}
          className='device-selector-item-icon'
        />
      </div>

      <div className='device-selector-item-details-container'>
        <div className='items-details-rows'>
          <h5 className='item-details-name'>{device.details.name}</h5>
        </div>
        <div className='items-details-row'>
          <span className='item-details-info'>
            {device.details.model} | iOS {device.details.version}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DeviceSelectorItem;
