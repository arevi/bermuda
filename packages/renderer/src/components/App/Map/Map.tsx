import React, { useMemo, useRef } from 'react';
import { renderToString } from 'react-dom/server';
import { divIcon, LatLngLiteral } from 'leaflet';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

import './Map.css';
interface MapProps {
  location: LatLngLiteral;
  setLocation: (arg: LatLngLiteral) => void;
}

const Map = ({ location, setLocation }: MapProps) => {
  // TODO: Identify the proper ref type for marker
  const markerRef = useRef<any>();

  const icon = divIcon({
    className: 'map-marker-icon',
    html: renderToString(
      <FontAwesomeIcon icon={faMapMarkerAlt} size='2x' color='white' />
    ),
  });

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setLocation({
            lat: marker.getLatLng().lat.toFixed(4),
            lng: marker.getLatLng().lng.toFixed(4),
          });
        }
      },
    }),
    [setLocation]
  );

  return (
    <MapContainer
      center={location}
      zoom={13}
      minZoom={3}
      scrollWheelZoom={true}
      id='map-container'
      zoomControl={false}
      attributionControl={false}
    >
      <TileLayer url='https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png' />
      <Marker
        ref={markerRef}
        draggable
        position={location}
        eventHandlers={eventHandlers}
        icon={icon}
      ></Marker>
    </MapContainer>
  );
};

export default Map;
