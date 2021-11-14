import React from 'react';
import { Device } from '../../../../interfaces/Device';

import './DeviceSelectorItem.css';

interface DeviceSelectorItemProps {
  device: Device;
}

const DeviceSelectorItem = ({ device }: DeviceSelectorItemProps) => {
  return <div className='device-selector-item'></div>;
};

export default DeviceSelectorItem;
