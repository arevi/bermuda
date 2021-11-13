import React, { Fragment, useEffect, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { Device } from '../../../interfaces/Device';
import { useDevices } from '../../../hooks/useDevices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faChevronDown } from '@fortawesome/free-solid-svg-icons';

import './DeviceSelector.css';

const DeviceSelector = () => {
  const [selectedDevice, setSelectedDevice] = useState<Device | null>();
  const devices = useDevices();

  // Validate that the currently selected device is still a valid device anytime the devices and/or selectedDevice changes
  useEffect(() => {
    // Identify all device UDIDs that are currently valid
    const deviceIds = devices.map((device) => device.udid);

    // Check if the selected device is no longer a valid device, and reset selected device
    if (selectedDevice && !deviceIds.includes(selectedDevice?.udid)) {
      setSelectedDevice(null);
    }
  }, [devices, selectedDevice]);

  return (
    <div id='device-panel'>
      <div className='w-72'>
        <Listbox value={selectedDevice} onChange={setSelectedDevice}>
          <div className='relative mt-1'>
            <Listbox.Button className='relative h-7 min-h-7 w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm'>
              <span className='block truncate'>
                {selectedDevice?.details.name}
              </span>
              <span className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className='w-5 h-5 text-gray-400'
                  aria-hidden='true'
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave='transition ease-in duration-100'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Listbox.Options className='absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                {devices.map((device, deviceIdx) => (
                  <Listbox.Option
                    key={deviceIdx}
                    className={({ active }) =>
                      `${
                        active ? 'text-amber-900 bg-amber-100' : 'text-gray-900'
                      }
                          cursor-default select-none relative py-2 pl-10 pr-4`
                    }
                    value={device}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`${
                            selected ? 'font-medium' : 'font-normal'
                          } block truncate`}
                        >
                          {device.details.name}
                        </span>
                        {selected ? (
                          <span
                            className={`${
                              active ? 'text-amber-600' : 'text-amber-600'
                            }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                          >
                            <FontAwesomeIcon
                              icon={faCheck}
                              className='w-5 h-5'
                              aria-hidden='true'
                            />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
    </div>
  );
};

export default DeviceSelector;
