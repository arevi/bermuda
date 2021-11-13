import React, { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { Device } from '../../../interfaces/Device';
import { useDevices } from '../../../hooks/useDevices';

import './DeviceSelector.css';

const DeviceSelector = () => {
  const [selectedDevice, setSelectedDevice] = useState<Device>();
  const devices = useDevices();

  console.log(devices);

  return (
    <Listbox value={selectedDevice} onChange={setSelectedDevice}>
      <div className='relative mt-1' id='device-panel'>
        <Listbox.Button className='relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm'>
          <span className='block truncate'>{selectedDevice?.details.name}</span>
          <span className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'></span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave='transition ease-in duration-100'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <Listbox.Options className='absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
            {devices.map((device, deviceIndex) => (
              <Listbox.Option
                key={deviceIndex}
                className={({ active }) =>
                  `${active ? 'text-amber-900 bg-amber-100' : 'text-gray-900'}
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
                      ></span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default DeviceSelector;
