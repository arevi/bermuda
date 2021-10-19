import React from 'react';
import {
  faCircle,
  faMobile,
  faTablet,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Device, DeviceCategory } from '../../../../interfaces/Device';

import './DevicePanelItem.css';

interface DevicePanelItemProps {
  device: Device;
}

const DevicePanelItem = ({ device }: DevicePanelItemProps) => {
  /**
   * Accepts DeviceCategory enum and returns associated FontAwesome icon
   * @param deviceCategory DeviceCategory - Category of the device as Enum
   * @returns IconDefintion - FontAwesome Icon Definition representing device
   */
  const retrieveDeviceIcon = (deviceCategory: DeviceCategory) => {
    if (deviceCategory === DeviceCategory.iPad) {
      return faTablet;
    }

    return faMobile;
  };

  return (
    <li className='device-panel-item'>
      <div className='device-panel-item-icon-container'>
        <FontAwesomeIcon icon={retrieveDeviceIcon(device.category)} />
      </div>
      <div className='device-panel-item-details-container'>
        <h3 className='device-panel-item-details-device-name'>{device.name}</h3>
        <div className='device-panel-item-details-specs-container'>
          <h5 className='device-panel-item-details-specs-text'>
            {device.model}
          </h5>
          <h5 className='device-panel-item-details-specs-text'>
            iOS {device.version}
          </h5>
        </div>
        <div className='device-panel-item-details-status-container'>
          <div className='device-panel-item-details-status-item-container'>
            <span>Connected</span>{' '}
            <FontAwesomeIcon
              icon={faCircle}
              className={
                device.developer === true
                  ? 'status-item-true'
                  : 'status-item-false'
              }
            />
          </div>
          <div className='device-panel-item-details-status-item-container'>
            <span>Developer</span>{' '}
            <FontAwesomeIcon
              icon={faCircle}
              className={
                device.developer === true
                  ? 'status-item-true'
                  : 'status-item-false'
              }
            />
          </div>
        </div>
      </div>
    </li>
  );
};

export default DevicePanelItem;
