import { DeviceMessage, DeviceMessageType } from '../interfaces/Message';

class DeviceMessageHandler {
  getDevices = () => {
    const message: DeviceMessage = { type: DeviceMessageType.GetDevices };

    window.api.send('device', message);
  };
}

export default DeviceMessageHandler;
