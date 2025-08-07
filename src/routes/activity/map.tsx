import { useQuery } from '@tanstack/react-query';
import { fetchGPSData } from '@/mockupdata/gpsJournal';
import type { DataType } from '@/types/gpsJournal';
import { createFileRoute } from '@tanstack/react-router';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix lỗi marker không hiển thị
L.Marker.prototype.options.icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

export const Route = createFileRoute('/activity/map')({
  component: RouteComponent,
});

const getLatestGPSByUnit = (data: DataType[]): DataType[] => {
  const latestMap = data.reduce((acc, item) => {
    if (!acc[item.unitid] || item.positiontime > acc[item.unitid].positiontime) {
      acc[item.unitid] = item;
    }
    return acc;
  }, {} as Record<string, DataType>);
  
  return Object.values(latestMap);
};

function RouteComponent() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['gpsData'],
    queryFn: fetchGPSData
  });

  if (isLoading) return <div style={{ padding: 24, textAlign: 'center' }}>Đang tải dữ liệu...</div>;
  if (isError) return <div style={{ padding: 24, textAlign: 'center' }}>Lỗi khi tải dữ liệu</div>;
  if (!data?.length) return <div style={{ padding: 24, textAlign: 'center' }}>Không có dữ liệu vị trí</div>;

  const latestGPS = getLatestGPSByUnit(data);
  
  // Tính toán center point từ dữ liệu thực tế
  const calculateCenter = (): [number, number] => {
    if (latestGPS.length === 0) return [21.0285, 105.8542]; // Fallback center
    
    const avgLat = latestGPS.reduce((sum, item) => sum + item.latitude, 0) / latestGPS.length;
    const avgLng = latestGPS.reduce((sum, item) => sum + item.longitude, 0) / latestGPS.length;
    return [avgLat, avgLng];
  };

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <MapContainer 
        center={calculateCenter()} 
        zoom={13} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        {latestGPS.map((item) => (
          <Marker 
            key={`${item.unitid}-${item.positiontime}`} 
            position={[item.latitude, item.longitude]}
          >
            <Popup>
              <div>
                <strong>Thiết bị:</strong> {item.unitid}<br />
                <strong>Thời gian:</strong> {new Date(item.positiontime * 1000).toLocaleString()}<br />
                <strong>Tọa độ:</strong> {item.latitude.toFixed(6)}, {item.longitude.toFixed(6)}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}