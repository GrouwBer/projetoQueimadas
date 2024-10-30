import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet.heat';

declare module 'leaflet' {
  function heatLayer(latlngs: L.LatLngExpression[], options?: any): any;
}

interface HeatmapLayerProps {
  points: { lat: number; lng: number; intensity: number }[];
}

const HeatmapLayer = ({ points }: HeatmapLayerProps) => {
  const map = useMap();

  useEffect(() => {
    const heatLayer = L.heatLayer(
      points.map(point => [point.lat, point.lng, point.intensity]),
      { radius: 25 }
    ).addTo(map);

    return () => {
      map.removeLayer(heatLayer);
    };
  }, [map, points]);

  return null;
};

export default HeatmapLayer;