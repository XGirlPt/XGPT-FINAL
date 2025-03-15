'use client';
import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Profile } from '@/backend/types';

// Leaflet icon config
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  iconRetinaUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface MapProps {
  profiles?: Profile[];
}

const Map = ({ profiles = [] }: MapProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  const defaultCenter: [number, number] = [38.7, -10.13];
  const validCoordinates = profiles.filter(
    (profile) =>
      typeof profile.latitude === 'number' &&
      typeof profile.longitude === 'number' &&
      profile.latitude !== 0 &&
      profile.longitude !== 0 &&
      !isNaN(profile.latitude) &&
      !isNaN(profile.longitude)
  );
  const center: [number, number] =
    validCoordinates.length > 0
      ? [validCoordinates[0].latitude, validCoordinates[0].longitude]
      : defaultCenter;
  const zoom = validCoordinates.length > 0 ? 10 : 8;

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center,
      zoom,
    });
    mapRef.current = map;

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      id: 'mapbox/streets-v11',
      accessToken: process.env.NEXT_PUBLIC_MAPBOX_API_KEY || '',
      attribution: '© <a href="https://www.mapbox.com/">Mapbox</a> © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    validCoordinates.forEach((profile) => {
      const marker = L.marker([profile.latitude, profile.longitude], { icon: redIcon })
        .addTo(map)
        .bindPopup(
          `<div style="max-width: 320px; background: white; border-radius: 1rem; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">
            <img src="${profile.photos[0]}" alt="${profile.nome}" style="width: 100%; height: 120px; object-fit: cover;" />
            <div style="padding: 0.75rem; text-align: center;">
              <h3 style="font-size: 1rem; font-weight: 600; color: #300d1b; margin: 0;">${profile.nome}</h3>
              <div style="display: flex; justify-content: center; align-items: center; gap: 0.25rem; color: #666; font-size: 0.875rem;">
                <span style="color: #ec4899;">&#x1F4CD;</span> ${profile.cidade}
              </div>
            </div>
          </div>`
        );
      markersRef.current.push(marker);
    });
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [profiles, center, zoom]);

  return (
    <div
      ref={containerRef}
      style={{ height: '400px', width: '600px' }}
      className='rounded-2xl'
    />
  );
};

export default Map;
