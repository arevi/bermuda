import { faEllipsisH, faMobile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Device } from '../../../../../interfaces/Device';

import './DeviceSelectorItem.css';

interface DeviceSelectorItemProps {
  device: Device;
  selectedDevice?: Device;
  setSelectedDevice?: (device: Device) => void;
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
  const handleDeviceClick = (targetDevice: Device) => {
    if (setSelectedDevice && device.udid !== selectedDevice?.udid) {
      setSelectedDevice(targetDevice);
    }
  };

  return (
    <div
      className={`device-selector-item ${
        selectedDevice?.udid === device.udid ? 'selected-device' : ''
      }`}
      onClick={() => handleDeviceClick(device)}
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
      {!selectedDevice && (
        <div className='device-selector-menu-btn-container'>
          <button type='button' className='device-selector-menu-btn'>
            <FontAwesomeIcon
              icon={faEllipsisH}
              className='device-selector-menu-btn-icon'
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default DeviceSelectorItem;
