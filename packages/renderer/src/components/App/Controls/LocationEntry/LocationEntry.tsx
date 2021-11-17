import React from 'react';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from 'react-hook-form';

import './LocationEntry.css';

interface LocationEntryProps {
  disabled: boolean;
}

const LocationEntry = ({ disabled }: LocationEntryProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleCoordinateUpodate = () => {};

  return (
    <div id='location-entry-container'>
      <form
        id='location-entry-form'
        onSubmit={handleSubmit(handleCoordinateUpodate)}
      >
        <input
          type='text'
          id='location-entry-coordinate-input'
          {...register('coordinates')}
          disabled={disabled}
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
