import { DeviceCategory } from '../interfaces/Device';

import deviceDictionary from '../utils/deviceDictionary.json';

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

export const convertProductTypeToFriendlyName = (
  productType: string,
  category: DeviceCategory
) => {
  const productSearch = deviceDictionary.filter(
    (dictionaryItem) => dictionaryItem.model === productType
  );

  if (productSearch.length !== 0) {
    return productSearch[0].item;
  }

  return `Unknown ${category.toString()}`;
};
