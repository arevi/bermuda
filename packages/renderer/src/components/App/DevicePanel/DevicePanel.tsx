import React from 'react';
import { Device, DeviceCategory } from '../../../interfaces/Device';

import './DevicePanel.css';
import DevicePanelItem from './DevicePanelItem/DevicePanelItem';

const DevicePanel = () => {
  const devices: Device[] = [
    {
      name: 'Armins iPhone',
      version: '15.0.1',
      model: 'iPhone 12 Pro',
      category: DeviceCategory.iPhone,
      connected: true,
      developer: true,
    },
    {
      name: 'Matts iPhone',
      version: '15.0.0',
      model: 'iPhone 13 Pro Max',
      category: DeviceCategory.iPhone,
      connected: true,
      developer: false,
    },
    {
      name: 'Jakes iPad',
      version: '15.1',
      model: 'iPad Pro 12.9 (3rd Generation)',
      category: DeviceCategory.iPad,
      connected: false,
      developer: false,
    },
  ];
  return (
    <div id='device-panel'>
      <div id='device-panel-header'></div>
      <ul id='device-panel-list'>
        {devices.map((device) => (
          <DevicePanelItem device={device} key={device.name} />
        ))}
      </ul>
    </div>
  );
};

export default DevicePanel;
