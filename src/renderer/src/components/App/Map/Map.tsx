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

  // TODO: Why is this necessary for react-leaflet for custom markers
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
        if (marker === null) return;

        // Update location to 5 decimal places to ensure accuracy within ~1m
        setLocation({
          lat: marker.getLatLng().lat.toFixed(5),
          lng: marker.getLatLng().lng.toFixed(5),
        });
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
