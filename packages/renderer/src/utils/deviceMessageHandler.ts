class DeviceMessageHandler {
  getDevices = () => {
    window.api.send('device', 'test');
    return [];
  };
}

export default DeviceMessageHandler;
