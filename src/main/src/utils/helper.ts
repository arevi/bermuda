import { DeviceCategory } from '../interfaces/Device';

import deviceDictionary from '../utils/deviceDictionary.json';
import { isDev } from './isDev';
import path from 'path';

/**
 * Converts device categories into an enum representing the device category (iPhone, iPad, iPhone)
 * This will default to an iPhone if the category cannot be identified
 * @param deviceClass - DeviceClass string
 * @returns - Device Category Enum
 */
export const convertDeviceClassToEnum = (
  deviceClass: string
): DeviceCategory => {
  switch (deviceClass) {
    case 'iPad':
      return DeviceCategory.iPad;
    case 'iPod':
      return DeviceCategory.iPod;
    case 'iPhone':
    default:
      return DeviceCategory.iPhone;
  }
};

/**
 * Converts internal product names into friendly device names, i.e. iPhone13,4 -> iPhone 13 Pro Max
 * @param productType - productType plist property
 * @param category - Device Category enum
 * @returns - Device name (i.e. iPhone 13 Pro Max, iPad Pro 3rd Gen, etc.)
 */
export const convertProductTypeToFriendlyName = (
  productType: string,
  category: DeviceCategory
): string => {
  // Perform a search through device dictionary to identify the device based on model number
  const productSearch = deviceDictionary.filter(
    (dictionaryItem) => dictionaryItem.model === productType
  );

  // If the item is found (list not empty) return the device name
  if (productSearch.length !== 0) {
    return productSearch[0].item;
  }

  // Return an unknown device type w/ the category if a device is found not in the dictionary
  // This handles situations where a new device is released, but the dictionary has not been updated yet to support it
  return `Unknown ${category.toString()}`;
};

/**
 * Converts a executable name into the platform specific executable path
 * @param executable - Executable name (string)
 * @returns - Path to executable (string)
 */
export const getExecutablePath = (executable: string) => {
  switch (process.platform) {
    case 'darwin': {
      if (process.arch === 'arm64') {
        return path.join(
          '/opt/homebrew/Cellar/libimobiledevice/1.3.0/bin',
          executable
        );
      } else {
        return path.join(
          '/usr/local/Cellar/libimobiledevice/1.3.0/bin',
          executable
        );
      }
    }
    case 'linux': {
      return path.join('/usr/bin', executable);
    }
    default: {
      if (isDev) {
        return path.join(__dirname, './assets/win-x64/', `${executable}.exe`);
      } else {
        return path.join(
          process.resourcesPath,
          './assets/win-x64/',
          `${executable}.exe`
        );
      }
    }
  }
};
