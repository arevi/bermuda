import React, { useEffect } from 'react';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from 'react-hook-form';
import { LatLngLiteral } from 'leaflet';

import './LocationEntry.css';

interface LocationEntryProps {
  disabled: boolean;
  location: LatLngLiteral;
  handleCoordinateUpdate: (newCoordinates: string) => void;
}

const LocationEntry = ({
  disabled,
  location,
  handleCoordinateUpdate,
}: LocationEntryProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  /**
   * Listen for updates ot location and set value appropriately
   */
  useEffect(() => {
    setValue('coordinates', `${location.lat},${location.lng}`);
  }, [location, setValue]);

  return (
    <div id='location-entry-container'>
      <form
        id='location-entry-form'
        onSubmit={handleSubmit((data) =>
          handleCoordinateUpdate(data.coordinates)
        )}
      >
        <input
          type='text'
          id='location-entry-coordinate-input'
          className={errors.coordinates ? 'coordinate-input-invalid' : ''}
          {...register('coordinates', {
            required: true,
            disabled,
            pattern: {
              value:
                /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/,
              message: 'Invalid GPS Coordinates',
            },
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
