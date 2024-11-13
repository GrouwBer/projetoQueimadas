import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import HeatmapLayer from './HeatmapLayer'; // Import the custom HeatmapLayer
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import './App.css';
import Grafico from './grafico'; // Certifique-se de que o caminho e a extensão estão corretos

function App() {
  const [verGrafico, MostraGrafico] = useState(false);

  const heatmapData = [
    { lat: -21.837799, lng: -46.558914, intensity: 1 },
    { lat: -21.7883, lng: -46.5625, intensity: 1 },
    // more data points
  ];

  return (
    <div className="container" style={{ position: 'relative', height: '100vh' }}>
      <div className="map-container" style={{ height: '100%' }}>
        <MapContainer center={[-21.7883, -46.5625]} zoom={13} scrollWheelZoom={true} className="leaflet-container">
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
      </div>
      <button onClick={() => MostraGrafico(!verGrafico)} style={{ position: 'fixed', top: '10px', right: '10px', zIndex: 1000 }}>
        {verGrafico ? 'Fechar Gráfico' : 'Gráfico'}
      </button>
      {verGrafico && (
              <div style={{ zIndex: 1000, position: 'absolute', top: 0, left: 0 }}>
              <Draggable>
                <div>
                  <ResizableBox width={300} height={150} minConstraints={[200, 200]} maxConstraints={[600, 600]}>
                    <Grafico />
                  </ResizableBox>
                </div>
              </Draggable>
            </div>
      )}
    </div>
  );

}

export default App;