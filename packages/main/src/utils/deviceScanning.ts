import { spawn } from 'child_process';
import { Device } from '../interfaces/Device';
import {
  deviceClassRegex,
  deviceNameRegex,
  productTypeRegex,
  productVersionRegex,
} from './deviceInfoRegex';
import { convertProductStringToEnum } from './helper';

export const getConnectedDeviceIds = async (
  executablePath: string
): Promise<string[]> =>
  new Promise(async (resolve, reject) => {
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

export const getConnectedDeviceInfo = async (
  executablePath: string,
  deviceUDID: string
): Promise<Device> =>
  new Promise(async (resolve, reject) => {
    const child = spawn(executablePath, ['-u', deviceUDID]);

    // Read std output once closed
    for await (const chunk of child.stdout) {
      const deviceInfo: string = chunk.toString();

      const deviceNameMatch = deviceInfo.match(deviceNameRegex);
      const productTypeMatch = deviceInfo.match(productTypeRegex);
      const productVersionMatch = deviceInfo.match(productVersionRegex);
      const deviceClassMatch = deviceInfo.match(deviceClassRegex);

      if (
        !deviceNameMatch ||
        !productTypeMatch ||
        !productVersionMatch ||
        !deviceClassMatch
      ) {
        return reject();
      }

      const newDevice: Device = {
        category: convertProductStringToEnum(deviceClassMatch[0]),
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
          model: productTypeMatch[0],
        },
      };

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
