import React, { Fragment } from 'react';
import { faEllipsisH, faMobile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Menu, Transition } from '@headlessui/react';
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

  const handleMountClick = (targetDevice: Device) => {
    window.api.send('device', {
      type: 'MountImage',
      payload: { udid: targetDevice.udid },
    });
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
          <Menu as='div' className='device-selector-menu'>
            <div>
              <Menu.Button className='device-selector-menu-btn'>
                <FontAwesomeIcon icon={faEllipsisH} />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter='transition ease-out duration-100'
              enterFrom='transform opacity-0 scale-95'
              enterTo='transform opacity-100 scale-100'
              leave='transition ease-in duration-75'
              leaveFrom='transform opacity-100 scale-100'
              leaveTo='transform opacity-0 scale-95'
            >
              <Menu.Items className='device-selector-menu-items-dropdown-container'>
                <div>
                  <Menu.Item>
                    <button
                      className='device-select-menu-dropdown-item'
                      onClick={() => handleMountClick(device)}
                    >
                      Mount Developer Disk Image
                    </button>
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      )}
    </div>
  );
};

export default DeviceSelectorItem;
