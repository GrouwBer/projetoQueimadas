import { useRef, useEffect } from 'react';
import { Chart, registerables } from 'chart.js';
import { AirQualityData, WeatherData } from './App';
// Register all necessary components
Chart.register(...registerables);

interface GraficoProps {
  airQualityData: AirQualityData | null;
  weatherData: WeatherData[];
}

const Grafico: React.FC<GraficoProps> = ({ airQualityData, weatherData }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && airQualityData && weatherData.length > 0) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      chartInstanceRef.current = new Chart(chartRef.current, {
        type: 'bar', // Chart type, can be 'line', 'bar', 'pie', etc.
        data: {
          labels: weatherData.map(data => data.day),
          datasets: [
            {
              label: 'Qualidade AR',
              data: weatherData.map(() => airQualityData.aqi),
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
            },
            {
              label: 'Temperatura (°C)',
              data: weatherData.map(data => parseFloat(data.temperature)),
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                color: '#ffffff', // Cor do texto do eixo Y
              },
            },
            x: {
              ticks: {
                color: '#ffffff', // Cor do texto do eixo X
              },
            },
          },
          plugins: {
            legend: {
              labels: {
                color: '#ffffff', // Cor do texto da legenda
              },
            },
          },
        },
      });
    }
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [airQualityData, weatherData]);

  return <canvas id='grafico' ref={chartRef} />;
};

export default Grafico;