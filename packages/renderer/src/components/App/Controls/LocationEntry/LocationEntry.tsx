import React, { useEffect } from 'react';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from 'react-hook-form';
import { LatLngLiteral } from 'leaflet';

import './LocationEntry.css';

interface LocationEntryProps {
  disabled: boolean;
  location: LatLngLiteral;
  setLocation: (arg: LatLngLiteral) => void;
}

const LocationEntry = ({
  disabled,
  location,
  setLocation,
}: LocationEntryProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const handleCoordinateUpdate = () => {};

  useEffect(() => {
    setValue('coordinates', `${location.lat},${location.lng}`);
  }, [location, setValue]);

  return (
    <div id='location-entry-container'>
      <form
        id='location-entry-form'
        onSubmit={handleSubmit(handleCoordinateUpdate)}
      >
        <input
          type='text'
          id='location-entry-coordinate-input'
          {...register('coordinates', {
            required: true,
            disabled,
          })}
        />
        <button
          type='submit'
          id='location-entry-coordinate-set-btn'
          disabled={disabled}
        >
          <FontAwesomeIcon icon={faPlayCircle} />
        </button>
      </form>
    </div>
  );
};

export default LocationEntry;
