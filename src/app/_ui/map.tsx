'use client';
import { useEffect, useRef, useMemo } from 'react';
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
  const validCoordinates = useMemo(() => profiles.filter(
    (profile) =>
      typeof profile.latitude === 'number' &&
      typeof profile.longitude === 'number' &&
      profile.latitude !== 0 &&
      profile.longitude !== 0 &&
      !isNaN(profile.latitude) &&
      !isNaN(profile.longitude)
  ), [profiles]);

  const center = useMemo((): [number, number] => 
    validCoordinates.length > 0
      ? [validCoordinates[0].latitude, validCoordinates[0].longitude]
      : defaultCenter,
    [validCoordinates]
  );

  const zoom = useMemo(() => validCoordinates.length > 0 ? 10 : 8, [validCoordinates]);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    console.log('Profiles:', profiles);
    console.log('Valid Coordinates:', validCoordinates);
    console.log('Center:', center);

    if (!Array.isArray(center) || center.length !== 2 || typeof center[0] !== 'number' || typeof center[1] !== 'number') {
      console.error('Invalid center coordinates:', center);
      return;
    }

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
          `
          <a href="/escort/${profile.nome}" style="text-decoration: none; color: inherit; display: block; width: 120px; height: 220px;">
            <div style="width: 120px; height: 220px; background: #111e; border-radius: 1rem; box-shadow: 0 4px 2px rgba(0, 0, 0, 0.2); overflow: hidden; font-family: Arial, sans-serif; cursor: pointer;">
              <div style="position: relative; width: 120px; height: 220px;">
                <img src="${profile.photos[0] || '/logo.webp'}" alt="${profile.nome}" style="width: 100%; height: 100%; object-fit: fill; border-radius: 1rem 1rem 0 0; display: block;" />
                <div style="position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(to top, rgba(0, 0, 0, 0.85), transparent); padding: 0.5rem;">
                  <h3 style="font-size: 0.9rem; font-weight: 700; color: white; margin: 0 0 0.25rem 0; display: flex; align-items: center; gap: 0.25rem;">
                    ${profile.nome}
                    ${profile.certificado ? '<span style="color: #22c55e; font-size: 0.75rem;">✔</span>' : ''}
                  </h3>
                  <div style="display: flex; align-items: center; gap: 0.25rem; color: #f1f1f1; font-size: 0.75rem; font-weight: 500;">
                    <span style="color: #ec4899;">📍</span> ${profile.cidade}
                  </div>
                </div>
              </div>
              <div style="height: 80px; background: #fff;"></div>
            </div>
          </a>
          `
        );
      markersRef.current.push(marker);
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [profiles, center, zoom, validCoordinates]);

  return (
    <div
      ref={containerRef}
      style={{ height: '400px', width: '600px' }}
      className='rounded-2xl'
    />
  );
}

export default Map;