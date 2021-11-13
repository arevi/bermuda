import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useForm } from 'react-hook-form';

import './LocationEntry.css';

const LocationEntry = () => {
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
        />
        <button type='submit' id='location-entry-coordinate-set-btn'>
          <FontAwesomeIcon icon={faPlayCircle} />
        </button>
      </form>
    </div>
  );
};

export default LocationEntry;
