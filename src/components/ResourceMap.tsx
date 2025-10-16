import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { ResourceWithLive } from '../types/resource';
import L from 'leaflet';

interface Props {
  resources: ResourceWithLive[];
  onSelect: (resource: ResourceWithLive) => void;
}

const defaultCenter: [number, number] = [42.7654, -71.4676];

// Fix default icon issue
delete (L.Icon.Default as any).prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const ResourceMap: React.FC<Props> = ({ resources, onSelect }) => {
  return (
    <div style={{ height: '50vh', width: '100%' }}>
      <MapContainer center={defaultCenter} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {resources.map(r => {
          // expecting latitude & longitude in resource object
          const lat = (r as any).latitude;
          const lng = (r as any).longitude;
          if (lat == null || lng == null) return null;
          return (
            <Marker key={r.id} position={[lat, lng]}>
              <Popup>
                <div>
                  <strong>{r.name}</strong>
                  <br />
                  {r.address}
                  <br />
                  <button onClick={() => onSelect(r)}>Details</button>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default ResourceMap;
