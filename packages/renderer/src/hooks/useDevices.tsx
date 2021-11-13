import { useEffect, useState } from 'react';
import { Device } from '../interfaces/Device';

export const useDevices = () => {
  const [devices, setDevices] = useState<Device[]>([]);

  useEffect(() => {
    window.api.on('device', (data: Device[]) => {
      setDevices(data);
    });
  }, []);

  return devices;
};
