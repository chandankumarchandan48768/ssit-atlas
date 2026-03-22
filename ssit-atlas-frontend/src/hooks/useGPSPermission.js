import { useState, useEffect } from 'react';

/**
 * Requests geolocation permission once per browser session.
 * Returns { permissionState, requestPermission, location, error }
 */
export function useGPSPermission() {
  const [permissionState, setPermissionState] = useState('prompt'); // 'prompt' | 'granted' | 'denied'
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check existing permission
    if ('permissions' in navigator) {
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        setPermissionState(result.state);
        result.onchange = () => setPermissionState(result.state);
      });
    }
  }, []);

  const requestPermission = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      setPermissionState('denied');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPermissionState('granted');
        setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setError(null);
      },
      (err) => {
        setPermissionState('denied');
        setError(err.message);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  return { permissionState, requestPermission, location, error };
}
