import { spawn } from 'child_process';
import { Device } from '../interfaces/Device';
import {
  deviceClassRegex,
  deviceNameRegex,
  productTypeRegex,
  productVersionRegex,
} from './deviceInfoRegex';
import {
  convertDeviceClassToEnum,
  convertProductTypeToFriendlyName,
} from './helper';

/**
 * Spawns the devicelist executable w/ list parameter and returns a string array of UDIDs
 * @param executablePath - devicelist executable path (string)
 * @returns - Promise<string[]> of device UDIDs
 */
export const getConnectedDeviceIds = async (
  executablePath: string
): Promise<string[]> =>
  new Promise(async (resolve, reject) => {
    // Spawn the devicelist executable w/ --list param
    const child = spawn(executablePath, ['--list']);

    // Read std output once closed
    for await (const chunk of child.stdout) {
      let deviceIds: string[] = chunk.toString().trim().split('\n');

      // Removing carriage return character for Windows
      deviceIds = deviceIds.map((deviceId) => deviceId.replace('\r', ''));

      return resolve(deviceIds);
    }

    // Read stderr once closed
    for await (const chunk of child.stderr) {
      console.error(chunk.toString());
      return reject([]);
    }

    // Fail through case where something really weird must have happened
    return reject([]);
  });

/**
 * Spawns the device info executable w/ the provided UDID as a parameter
 * Will attempt to read the device information from stderr and return a device object representing the device
 * @param executablePath - deviceinfo executable path (string)
 * @param deviceUDID - UDID of an iOS device (string)
 * @returns - Promise<Device> device object
 */
export const getConnectedDeviceInfo = async (
  executablePath: string,
  deviceUDID: string
): Promise<Device> =>
  new Promise(async (resolve, reject) => {
    // Spawn the deviceinfo executable w/ UDID as a parameter
    const child = spawn(executablePath, ['-u', deviceUDID]);

    // Read std output once closed
    for await (const chunk of child.stdout) {
      const deviceInfo: string = chunk.toString();

      // Utilize regex to parse the device information from stdout
      const deviceNameMatch = deviceInfo.match(deviceNameRegex);
      const productTypeMatch = deviceInfo.match(productTypeRegex);
      const productVersionMatch = deviceInfo.match(productVersionRegex);
      const deviceClassMatch = deviceInfo.match(deviceClassRegex);

      // If any of the information above is unavailable, some (weird?) error must have occurred, reject.
      if (
        !deviceNameMatch ||
        !productTypeMatch ||
        !productVersionMatch ||
        !deviceClassMatch
      ) {
        return reject();
      }

      // Identify device category
      const category = convertDeviceClassToEnum(deviceClassMatch[0]);

      // Build the new device object by using the information parsed above
      const newDevice: Device = {
        category,
        udid: deviceUDID,
        status: {
          developer: false,
        },
        diskImage: {
          path: '',
          signaturePath: '',
        },
        details: {
          name: deviceNameMatch[0],
          version: productVersionMatch[0],
          model: convertProductTypeToFriendlyName(
            productTypeMatch[0],
            category
          ),
        },
      };

      // Resolve with the new identified device
      return resolve(newDevice);
    }

    // Read stderr once closed
    for await (const chunk of child.stderr) {
      console.error(chunk.toString());
      return reject({});
    }

    // Fail through case where something really weird must have happened
    return reject({});
  });
