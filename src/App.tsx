import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import HeatmapLayer from './HeatmapLayer'; // Import the custom HeatmapLayer
import './App.css';

interface HeatmapPoint {
  lat: number;
  lng: number;
  intensity: number;
}

function App() {
  const heatmapData: HeatmapPoint[] = [
    { lat: -21.7883, lng: -46.5626, intensity: 1 },
    { lat: -21.7883, lng: -46.5625, intensity: 1 },
    // more data points
  ];

  return (
    <MapContainer center={[-21.7883, -46.5625]} zoom={13} scrollWheelZoom={true}>
      <HeatmapLayer points={heatmapData} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default App;