import { useRef, useEffect } from 'react';
import { Chart, registerables } from 'chart.js';
import { labels, ruindade, qualidade } from './dadosGrafico';
// Registre todos os componentes necessários
Chart.register(...registerables);

const Grafico = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    console.log('Grafico component mounted');
    if (chartRef.current) {
      console.log('Chart ref is set', chartRef.current);

      // Destrua o gráfico existente antes de criar um novo
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      chartInstanceRef.current = new Chart(chartRef.current, {
        type: 'bar', // Tipo de gráfico, pode ser 'line', 'bar', 'pie', etc.
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Qualida do Ar',
              data: qualidade,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
              ],
              borderWidth: 1,
            },
            {
                label: 'Ruindade do AR',
                data: ruindade,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
              },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });

      console.log('Chart instance created', chartInstanceRef.current);
    }

    // Cleanup function to destroy the chart when the component unmounts
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className='grafico'>
      <canvas id="grafico" ref={chartRef}></canvas>
    </div>
  );
};

export default Grafico;