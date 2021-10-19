import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

import './Map.css';

const Map = () => {
  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      minZoom={3}
      scrollWheelZoom={true}
      id='map-container'
      zoomControl={false}
      attributionControl={false}
    >
      <TileLayer url='https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png' />
    </MapContainer>
  );
};

export default Map;
