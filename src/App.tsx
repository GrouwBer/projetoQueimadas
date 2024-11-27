import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer } from 'react-leaflet';
import HeatmapLayer from './HeatmapLayer';
import './App.css';
import Grafico from './grafico';
import Sobre from './sobre';

export interface WeatherData {
  day: string;
  humidity: string;
  temperature: string;
}

interface HeatmapData {
  lat: number;
  lng: number;
  intensity: number;
}

export interface AirQualityData {
  aqi: number;
  pm10: number;
  pm2_5: number;
  o3: number;
  no2: number;
  so2: number;
  co: number;
}


function App() {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [heatmapData, setHeatmapData] = useState<HeatmapData[]>([]);
  const [airQualityData, setAirQualityData] = useState<AirQualityData | null>(null);

  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=72d21052287751c62fd06d937e623ce7&units=metric`)
      .then(response => {
        const data = response.data;
        const daysOfWeek = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
        const weatherData = data.list.slice(0, 7).map((dayData: any, index: number) => ({
          day: daysOfWeek[new Date(dayData.dt * 1000).getDay()],
          humidity: `${dayData.main.humidity}%`,
          temperature: `${dayData.main.temp}`
        }));
        setWeatherData(weatherData);
      })
      .catch(error => console.error('Error fetching weather data:', error));

    axios.get('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson')
      .then(response => {
        const data = response.data.features.map((feature: any) => ({
          lat: feature.geometry.coordinates[1],
          lng: feature.geometry.coordinates[0],
          intensity: feature.properties.mag
        }));
        setHeatmapData(data);
      })
      .catch(error => console.error('Error fetching heatmap data:', error));

    axios.get(`https://api.openweathermap.org/data/2.5/air_pollution?lat=-21.78&lon=-46.56&appid=72d21052287751c62fd06d937e623ce7`)
      .then(response => {
        const data = response.data.list[0];
        setAirQualityData({
          aqi: data.main.aqi,
          pm10: data.components.pm10,
          pm2_5: data.components.pm2_5,
          o3: data.components.o3,
          no2: data.components.no2,
          so2: data.components.so2,
          co: data.components.co,
        });
      })
      .catch(error => console.error('Error fetching air quality data:', error));
  }, []);

  const getAirQualityText = (aqi: number) => {
    if (aqi <= 50) return 'Muito Bom';
    if (aqi <= 100) return 'Bom';
    if (aqi <= 150) return 'Moderado';
    if (aqi <= 200) return 'Ruim';
    if (aqi <= 300) return 'Muito Ruim';
    return 'Perigoso';
  };

  const todayWeather = weatherData[0];

  return (
    <div className="container">
      <div className="header">
        <img className="logo" src="/ifoco.png" alt="Logotipo do site escrito IFOCO" />

         <a>Qualidade do Ar</a>
        <a ></a>
      </div>
      <div className='grid'> 
        <div className='ar'>
          <h2>Informações Gerais do Ar em Poços de Caldas</h2>
          {airQualityData ? (
            <ul>
              <li>Índice de Qualidade do Ar (AQI): {airQualityData.aqi}</li>
              <li>PM10: {airQualityData.pm10} µg/m³</li>
              <li>PM2.5: {airQualityData.pm2_5} µg/m³</li>
              <li>O3: {airQualityData.o3} µg/m³</li>
              <li>NO2: {airQualityData.no2} µg/m³</li>
              <li>SO2: {airQualityData.so2} µg/m³</li>
              <li>CO: {airQualityData.co} µg/m³</li>
            </ul>
          ) : (
            <p>Carregando dados de qualidade do ar...</p>
          )}
        </div>   
        <div className='ar'>
          <h2>Informações do Dia</h2>
          {todayWeather ? (
            <ul>
              <li>Temperatura: {todayWeather.temperature}°C</li>
              <li>Umidade: {todayWeather.humidity}</li>
              {airQualityData && (
                <li>Qualidade do Ar: {getAirQualityText(airQualityData.aqi)}</li>
              )}
            </ul>
          ) : (
            <p>Carregando dados do tempo...</p>
          )}
        </div>
      </div>

      <div className='grid'>
        <div>
          <Grafico airQualityData={airQualityData} weatherData={weatherData} />
        </div>
        <div className="map-container">
          <MapContainer center={[-21.7883, -46.5625]} zoom={13} scrollWheelZoom={true} className="leaflet-container">
            <HeatmapLayer points={heatmapData} />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </MapContainer>
        </div>
      </div>

      <div className='tabela'>
        <ul>
          {weatherData.map((data, index) => (
            <li key={index}>
              {data.day}: Umidade {data.humidity}, Temperatura {data.temperature}°C
            </li>
          ))}
        </ul>
      </div>
      <Sobre />
    </div>
  );
}

export default App;