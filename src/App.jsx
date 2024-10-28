import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";

import "./App.css";
const INITIAL_ZOOM = 12.12;
const INITIAL_CENTER = [-46.563224, -21.788051];

function App() {
  const mapRef = useRef();
  const mapContainerRef = useRef();
  const handleButtonClick = () => {
    mapRef.current.flyTo({
      center: INITIAL_CENTER,
      zoom: INITIAL_ZOOM,
    });
  };

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiZ3JvdXdiZXIiLCJhIjoiY20yYnQ0MmJ1MHNtaTJrcHNrYjNtYnAydSJ9.NKa86uVhMHHe21-INTgiIA";
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: INITIAL_CENTER,
      zoom: INITIAL_ZOOM,
    });
    mapRef.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true,
        showUserHeading: true
      })
    );

    // Suponha que você tenha recuperado os dados do banco de dados e os tenha armazenado em uma variável chamada `polygons`
    const polygons = [
      {
        id: 1,
        coordinates: [
          [-46.559611, -21.836576],
          [-46.558714, -21.837003],
          [-46.559169, -21.837733],
          [-46.560088, -21.837291],
          [-46.559611, -21.836576],
        ]
      },
      // Adicione mais polígonos aqui
      
    ];

    const geojson = {
      type: 'FeatureCollection',
      features: polygons.map(polygon => ({
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [polygon.coordinates]
        }
      }))
    };

    mapRef.current.on('load', () => {
      mapRef.current.addSource('polygons', {
        type: 'geojson',
        data: geojson
      });

      mapRef.current.addLayer({
        id: 'polygons-layer',
        type: 'fill',
        source: 'polygons',
        paint: {
          'fill-color': '#000',
          'fill-opacity': 1
        }
      });

      // Adicionando pontos
      mapRef.current.addLayer({
        id: 'points-layer',
        type: 'circle',
        source: 'polygons',
        paint: {
          'circle-radius': 6,
          'circle-color': '#B42222'
        },
        filter: ['==', '$type', 'Point']
      });
    });

    return () => {
      mapRef.current.remove();
    };
  }, []);

  return (
    <>
      <div id="map-container" ref={mapContainerRef} />
      <button className="reset-button" onClick={handleButtonClick}>
        Reset
      </button>
    </>
  );
}

export default App;