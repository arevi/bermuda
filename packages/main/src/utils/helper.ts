import { DeviceCategory } from '../interfaces/Device';

export const convertProductStringToEnum = (
  productType: string
): DeviceCategory => {
  switch (productType) {
    case 'iPad':
      return DeviceCategory.iPad;
    case 'iPod':
      return DeviceCategory.iPod;
    case 'iPhone':
    default:
      return DeviceCategory.iPhone;
  }
};
