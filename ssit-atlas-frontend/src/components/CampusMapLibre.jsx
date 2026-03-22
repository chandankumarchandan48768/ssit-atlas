import { useEffect, useRef, useState, useCallback } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { createBuildingLayer } from '../utils/buildingLayer';

const CAMPUS_CENTER = [77.0912, 13.3224];
const CAMPUS_BOUNDS = [
  [77.0880, 13.3185],
  [77.0938, 13.3250]
];

// Building definitions with names for info panel
const BUILDINGS_INFO = [
  { id: 'building-1',  lngLat: [77.09107158944602, 13.319402211532577], glbPath: '/campus-models/ITI_lab.glb',          scaleFactor: 30,  offsetY: 0.2,  rotationY: 83 * Math.PI / 180,  name: 'ITI Lab',          category: 'lab' },
  { id: 'building-2',  lngLat: [77.09129772839714, 13.318766762352851], glbPath: '/campus-models/ITI_Class.glb',        scaleFactor: 40,  offsetY: 0.15, rotationY: 35 * Math.PI / 180,  name: 'ITI Classroom',    category: 'academic' },
  { id: 'building-3',  lngLat: [77.09227064426489, 13.322844540468878], glbPath: '/campus-models/geodome.glb',          scaleFactor: 40,  offsetY: 0.2,  rotationY: -0.2,                name: 'Geo Dome',         category: 'landmark' },
  { id: 'building-4',  lngLat: [77.0923628472878,  13.320121577424672], glbPath: '/campus-models/Admin_block.glb',      scaleFactor: 70,  offsetY: 0.2,  rotationY: -0.12,               name: 'Admin Block',      category: 'admin' },
  { id: 'building-5',  lngLat: [77.08946502538447, 13.322557492666746], glbPath: '/campus-models/Rajagruha_hostal.glb', scaleFactor: 60,  offsetY: 0.25, rotationY: 0.6,                 name: 'Rajagruha Hostel', category: 'hostel' },
  { id: 'building-6',  lngLat: [77.09109463385647, 13.319873848703438], glbPath: '/campus-models/Param.glb',            scaleFactor: 35,  offsetY: 0.0,  rotationY: -2.49,               name: 'Param Block',      category: 'academic' },
  { id: 'building-7',  lngLat: [77.08912333588711, 13.321832762361964], glbPath: '/campus-models/Boys_hostal_2.glb',    scaleFactor: 50,  offsetY: 0.2,  rotationY: -0.2,                name: 'Boys Hostel 2',    category: 'hostel' },
  { id: 'building-8',  lngLat: [77.08932032520096, 13.322335944299013], glbPath: '/campus-models/Boys_hostal_2.glb',    scaleFactor: 50,  offsetY: 0.2,  rotationY: 4.53,                name: 'Boys Hostel 1',    category: 'hostel' },
  { id: 'building-9',  lngLat: [77.0922521690141,  13.322193521844966], glbPath: '/campus-models/mba_block.glb',        scaleFactor: 60,  offsetY: 0.1,  rotationY: -0.1,                name: 'MBA Block',        category: 'academic' },
  { id: 'building-10', lngLat: [77.09033241247505, 13.321532495005627], glbPath: '/campus-models/Gym.glb',              scaleFactor: 25,  offsetY: 0.1,  rotationY: 4.54,                name: 'Gymnasium',        category: 'sports' },
  { id: 'building-11', lngLat: [77.09005702191303, 13.320939186740688], glbPath: '/campus-models/Lumbini.glb',          scaleFactor: 60,  offsetY: 0.15, rotationY: -0.16,               name: 'Lumbini Block',    category: 'academic' },
  { id: 'building-12', lngLat: [77.09143574577661, 13.319297178421337], glbPath: '/campus-models/MV_Block.glb',         scaleFactor: 60,  offsetY: 0.15, rotationY: -0.10,               name: 'MV Block',         category: 'academic' },
  { id: 'building-13', lngLat: [77.09188295813112, 13.321702325400082], glbPath: '/campus-models/Scolor_front.glb',     scaleFactor: 40,  offsetY: 0.15, rotationY: -0.1,                name: 'Scholar Front',    category: 'academic' },
  { id: 'building-14', lngLat: [77.09080075102491, 13.31895982326931],  glbPath: '/campus-models/ITI_Class.glb',        scaleFactor: 40,  offsetY: 0.15, rotationY: 35 * Math.PI / 180,  name: 'ITI Class (2)',    category: 'academic' },
  { id: 'building-15', lngLat: [77.09165041471289, 13.321361185680615], glbPath: '/campus-models/Step_building.glb',    scaleFactor: 25,  offsetY: 0.15, rotationY: 3.8,                 name: 'Step Building',    category: 'academic' },
  { id: 'building-16', lngLat: [77.09137476041701, 13.321401720284271], glbPath: '/campus-models/Xerox_shop.glb',       scaleFactor: 30,  offsetY: 0.15, rotationY: 2.23,                name: 'Xerox Shop',       category: 'services' },
  { id: 'building-17', lngLat: [77.0920581560224,  13.320232316209442], glbPath: '/campus-models/EcLabs.glb',           scaleFactor: 20,  offsetY: 0.2,  rotationY: -0.12,               name: 'EC Lab',           category: 'lab' },
  { id: 'building-18', lngLat: [77.0915160463349,  13.31976422964128],  glbPath: '/campus-models/EcLabsParamGap.glb',   scaleFactor: 20,  offsetY: 0.1,  rotationY: -2.48,               name: 'EC Param Gap',     category: 'lab' },
  { id: 'building-19', lngLat: [77.09183673093884, 13.320863860145607], glbPath: '/campus-models/EcLabs.glb',           scaleFactor: 20,  offsetY: 0.1,  rotationY: -2.48,               name: 'EC Lab (2)',       category: 'lab' },
  { id: 'building-20', lngLat: [77.09132222700481, 13.320427990472098], glbPath: '/campus-models/EcLabs.glb',           scaleFactor: 20,  offsetY: 0.2,  rotationY: -0.12,               name: 'EC Lab (3)',       category: 'lab' },
];

const CATEGORY_COLORS = {
  academic: '#3b82f6',
  admin:    '#8b5cf6',
  hostel:   '#f59e0b',
  lab:      '#10b981',
  sports:   '#ef4444',
  services: '#06b6d4',
  landmark: '#f97316',
};

const CAMPUS_COORDS = [
  [77.09078412644703, 13.324073073247888],[77.09057280462088, 13.323312896590252],
  [77.09048685941286, 13.323343012817176],[77.08958649676788, 13.323671482443558],
  [77.08915158806144, 13.322640928468815],[77.08907531689937, 13.322531002396104],
  [77.08884862735891, 13.322075752760497],[77.0888483802533,  13.321725906012205],
  [77.08983697886117, 13.321345474619434],[77.089693873535,   13.320853581979293],
  [77.08974904821554, 13.32064286406505], [77.08967134459607, 13.320310779894854],
  [77.09001320687429, 13.320237306143085],[77.09001162824546, 13.31930245710869],
  [77.09063758363123, 13.319194557660666],[77.09056522808498, 13.318980372220636],
  [77.09083290983813, 13.31888805444197], [77.09147709624796, 13.318632699676186],
  [77.09151702744543, 13.318704818858436],[77.09200400384458, 13.318770611713049],
  [77.09217228077972, 13.319012632172758],[77.09235955140059, 13.319220527629383],
  [77.09260526785982, 13.319393716430866],[77.09285603246121, 13.319659890642853],
  [77.09301360815914, 13.319815998216527],[77.09313462957465, 13.31999015574732],
  [77.09318008424367, 13.320091328204114],[77.09319928336521, 13.320160630425477],
  [77.09333163799164, 13.321556481094163],[77.09335283040093, 13.322995723209175],
  [77.09329566212057, 13.323261630362822],[77.09315049997497, 13.323714453975285],
  [77.09291509369541, 13.323742171933759],[77.09195420640066, 13.323847266859104],
  [77.09172303726751, 13.323887610888633],[77.09078412644703, 13.324073073247888],
];

export default function CampusMapLibre({ lostFoundPins = [], onMapClick, mode = 'map', onLocationUpdate }) {
  const mapContainer = useRef(null);
  const mapRef       = useRef(null);
  const userMarkerRef  = useRef(null);
  const watchIdRef     = useRef(null);
  const pinMarkersRef  = useRef([]);

  const [selectedBuilding, setSelectedBuilding]   = useState(null);
  const [userLocation, setUserLocation]           = useState(null);
  const [locationError, setLocationError]         = useState(null);
  const [isTracking, setIsTracking]               = useState(false);
  const [navigationRoute, setNavigationRoute]     = useState(null);
  const [navFrom, setNavFrom]    = useState('');
  const [navTo, setNavTo]        = useState('');
  const [navDirections, setNavDirections]         = useState([]);
  const [pinMode, setPinMode]    = useState(false);
  const [pendingPin, setPendingPin] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  /* ──────────────────────────────────────────────────────────
     Initialize Map
  ────────────────────────────────────────────────────────── */
  useEffect(() => {
    if (mapRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://tiles.basemaps.cartocdn.com/gl/voyager-gl-style/style.json',
      center: CAMPUS_CENTER,
      zoom: 17,
      pitch: 45,
      bearing: -2,
      antialias: true,
      maxBounds: [
        [CAMPUS_BOUNDS[0][0] - 0.005, CAMPUS_BOUNDS[0][1] - 0.005],
        [CAMPUS_BOUNDS[1][0] + 0.005, CAMPUS_BOUNDS[1][1] + 0.005]
      ]
    });

    map.addControl(new maplibregl.NavigationControl(), 'top-right');
    map.addControl(new maplibregl.ScaleControl({ unit: 'metric' }), 'bottom-right');

    map.on('load', () => {
      // ── Campus ground ──────────────────────────────────────
      map.addSource('campus-plane', {
        type: 'geojson',
        data: { type: 'Feature', geometry: { type: 'Polygon', coordinates: [CAMPUS_COORDS] } }
      });
      map.addLayer({
        id: 'campus-plane-layer', type: 'fill', source: 'campus-plane',
        paint: { 'fill-color': '#4ade80', 'fill-opacity': 0.35 }
      });
      map.addLayer({
        id: 'campus-outline', type: 'line', source: 'campus-plane',
        paint: { 'line-color': '#16a34a', 'line-width': 2 }
      });

      // ── Campus wall ─────────────────────────────────────────
      const thickness = 0.00002;
      const wallFeatures = [];
      for (let i = 0; i < CAMPUS_COORDS.length - 1; i++) {
        const A = CAMPUS_COORDS[i], B = CAMPUS_COORDS[i + 1];
        wallFeatures.push({
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [[A, B, [B[0]+thickness, B[1]+thickness], [A[0]+thickness, A[1]+thickness], A]]
          }
        });
      }
      map.addSource('campus-wall', { type: 'geojson', data: { type: 'FeatureCollection', features: wallFeatures } });
      map.addLayer({
        id: 'campus-wall-3d', type: 'fill-extrusion', source: 'campus-wall',
        paint: { 'fill-extrusion-color': '#8B7D6B', 'fill-extrusion-height': 6, 'fill-extrusion-base': 0, 'fill-extrusion-opacity': 1 }
      });

      // ── Building markers and 3D models ────────────────────────────────────
      BUILDINGS_INFO.forEach(b => {
        // Add 3D model layer
        if (b.glbPath) {
          const layer = createBuildingLayer({
            id: b.id + '-3d',
            map: map,
            lngLat: b.lngLat,
            glbPath: b.glbPath,
            scaleFactor: b.scaleFactor,
            offsetX: b.offsetX || 0,
            offsetY: b.offsetY || 0,
            offsetZ: b.offsetZ || 0,
            rotationY: b.rotationY || 0
          });
          map.addLayer(layer);
        }

        // Add HTML Marker for interactions
        const el = document.createElement('div');
        el.className = 'campus-building-marker';
        el.style.cssText = `
          width:32px; height:32px; border-radius:50%;
          background:${CATEGORY_COLORS[b.category] || '#3b82f6'};
          border:3px solid white; cursor:pointer;
          display:flex; align-items:center; justify-content:center;
          box-shadow:0 2px 8px rgba(0,0,0,0.3);
          transition: transform 0.2s;
        `;
        el.innerHTML = `<span style="font-size:12px; color:white; font-weight:bold;">${b.name.charAt(0)}</span>`;
        el.addEventListener('mouseenter', () => { el.style.transform = 'scale(1.3)'; });
        el.addEventListener('mouseleave', () => { el.style.transform = 'scale(1)'; });
        el.addEventListener('click', (e) => {
          e.stopPropagation();
          setSelectedBuilding(b);
        });

        const popup = new maplibregl.Popup({ offset: 25, closeButton: false })
          .setHTML(`<div style="font-weight:600;font-size:13px;">${b.name}</div><div style="font-size:11px;color:#666;text-transform:capitalize;">${b.category}</div>`);

        new maplibregl.Marker({ element: el })
          .setLngLat(b.lngLat)
          .setPopup(popup)
          .addTo(map);
      });

      // ── Navigation route source (empty, filled on navigate) ─
      map.addSource('nav-route', {
        type: 'geojson',
        data: { type: 'Feature', geometry: { type: 'LineString', coordinates: [] } }
      });
      map.addLayer({
        id: 'nav-route-line', type: 'line', source: 'nav-route',
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: { 'line-color': '#3b82f6', 'line-width': 5, 'line-dasharray': [2, 1] }
      });
      map.addLayer({
        id: 'nav-route-glow', type: 'line', source: 'nav-route',
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: { 'line-color': '#93c5fd', 'line-width': 10, 'line-opacity': 0.3 }
      }, 'nav-route-line');

      // ── Lost & Found pins source ────────────────────────────
      map.addSource('lf-pins', { type: 'geojson', data: { type: 'FeatureCollection', features: [] } });

      setMapLoaded(true);
    });

    // ── Click handler for pin placement ──────────────────────
    map.on('click', (e) => {
      if (pinMode || mode === 'lostfound') {
        setPendingPin({ lng: e.lngLat.lng, lat: e.lngLat.lat });
      }
    });

    mapRef.current = map;

    return () => {
      if (watchIdRef.current) navigator.geolocation.clearWatch(watchIdRef.current);
      map.remove();
      mapRef.current = null;
    };
  }, []);

  /* ──────────────────────────────────────────────────────────
     Update Lost & Found pins on map
  ────────────────────────────────────────────────────────── */
  useEffect(() => {
    if (!mapRef.current || !mapLoaded) return;

    // Remove old markers
    pinMarkersRef.current.forEach(m => m.remove());
    pinMarkersRef.current = [];

    lostFoundPins.forEach(pin => {
      if (!pin.latitude || !pin.longitude) return;
      const el = document.createElement('div');
      el.style.cssText = `
        width:28px; height:28px; border-radius:50% 50% 0 50%;
        transform: rotate(-45deg);
        background:${pin.status === 'LOST' ? '#ef4444' : '#22c55e'};
        border:2px solid white; cursor:pointer;
        box-shadow:0 2px 6px rgba(0,0,0,0.4);
      `;
      const popup = new maplibregl.Popup({ offset: 10 })
        .setHTML(`
          <div style="min-width:180px;">
            <div style="font-weight:700;font-size:13px;">${pin.title}</div>
            <div style="font-size:11px;color:${pin.status==='LOST'?'#ef4444':'#22c55e'};margin-bottom:6px;">${pin.status}</div>
            ${pin.imageUrl ? `<img src="${pin.imageUrl}" style="width:100%;max-height:80px;object-fit:cover;border-radius:4px;margin-bottom:6px;" />` : ''}
            <div style="font-size:11px;color:#555;">${pin.description || ''}</div>
            <div style="font-size:10px;color:#888;margin-top:4px;">📞 ${pin.contactInfo || ''}</div>
          </div>
        `);
      const marker = new maplibregl.Marker({ element: el })
        .setLngLat([pin.longitude, pin.latitude])
        .setPopup(popup)
        .addTo(mapRef.current);
      pinMarkersRef.current.push(marker);
    });
  }, [lostFoundPins, mapLoaded]);

  /* ──────────────────────────────────────────────────────────
     Pending pin preview marker
  ────────────────────────────────────────────────────────── */
  const pendingMarkerRef = useRef(null);
  useEffect(() => {
    if (!mapRef.current) return;
    if (pendingMarkerRef.current) { pendingMarkerRef.current.remove(); pendingMarkerRef.current = null; }
    if (!pendingPin) return;

    const el = document.createElement('div');
    el.style.cssText = `
      width:24px; height:24px; border-radius:50%;
      background:#f59e0b; border:3px solid white;
      box-shadow:0 0 0 4px rgba(245,158,11,0.3);
      animation: pulse 1.2s infinite;
    `;
    pendingMarkerRef.current = new maplibregl.Marker({ element: el, draggable: true })
      .setLngLat([pendingPin.lng, pendingPin.lat])
      .addTo(mapRef.current);

    pendingMarkerRef.current.on('dragend', () => {
      const ll = pendingMarkerRef.current.getLngLat();
      setPendingPin({ lng: ll.lng, lat: ll.lat });
    });

    if (onMapClick) onMapClick(pendingPin);
  }, [pendingPin]);

  /* ──────────────────────────────────────────────────────────
     Live Location Tracking
  ────────────────────────────────────────────────────────── */
  const startTracking = useCallback(() => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser.');
      return;
    }
    setIsTracking(true);
    setLocationError(null);

    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        const { longitude, latitude, accuracy } = pos.coords;
        setUserLocation({ lng: longitude, lat: latitude, accuracy });
        if (onLocationUpdate) onLocationUpdate({ lng: longitude, lat: latitude });

        const map = mapRef.current;
        if (!map) return;

        if (!userMarkerRef.current) {
          // Create pulsing user dot
          const el = document.createElement('div');
          el.innerHTML = `
            <div style="position:relative;width:20px;height:20px;">
              <div style="position:absolute;inset:0;background:#3b82f6;border-radius:50%;border:3px solid white;box-shadow:0 0 0 3px rgba(59,130,246,0.4);"></div>
              <div style="position:absolute;inset:-6px;border:2px solid rgba(59,130,246,0.3);border-radius:50%;animation:ripple 1.5s linear infinite;"></div>
            </div>
          `;
          el.style.cssText = 'width:20px;height:20px;background:transparent;';
          userMarkerRef.current = new maplibregl.Marker({ element: el })
            .setLngLat([longitude, latitude])
            .addTo(map);
          map.flyTo({ center: [longitude, latitude], zoom: 18, speed: 1.2 });
        } else {
          userMarkerRef.current.setLngLat([longitude, latitude]);
        }
      },
      (err) => {
        setLocationError(err.message);
        setIsTracking(false);
      },
      { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 }
    );
  }, [onLocationUpdate]);

  const stopTracking = useCallback(() => {
    if (watchIdRef.current) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    if (userMarkerRef.current) {
      userMarkerRef.current.remove();
      userMarkerRef.current = null;
    }
    setIsTracking(false);
    setUserLocation(null);
  }, []);

  const centerOnUser = useCallback(() => {
    if (userLocation && mapRef.current) {
      mapRef.current.flyTo({ center: [userLocation.lng, userLocation.lat], zoom: 19, speed: 1.5 });
    }
  }, [userLocation]);

  /* ──────────────────────────────────────────────────────────
     Navigation – simple straight-line routing between buildings
  ────────────────────────────────────────────────────────── */
  const handleNavigate = useCallback(() => {
    const fromB = BUILDINGS_INFO.find(b => b.id === navFrom || b.name === navFrom);
    const toB   = BUILDINGS_INFO.find(b => b.id === navTo   || b.name === navTo);
    const map   = mapRef.current;
    if (!fromB || !toB || !map) return;

    const coords = [fromB.lngLat, toB.lngLat];
    map.getSource('nav-route').setData({
      type: 'Feature',
      geometry: { type: 'LineString', coordinates: coords }
    });

    // Calc distance (Haversine approx)
    const R = 6371000;
    const dLat = (toB.lngLat[1] - fromB.lngLat[1]) * Math.PI / 180;
    const dLng = (toB.lngLat[0] - fromB.lngLat[0]) * Math.PI / 180;
    const a = Math.sin(dLat/2)**2 + Math.cos(fromB.lngLat[1]*Math.PI/180) * Math.cos(toB.lngLat[1]*Math.PI/180) * Math.sin(dLng/2)**2;
    const dist = Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)));

    setNavigationRoute({ from: fromB, to: toB, distance: dist });
    setNavDirections([
      { step: 1, text: `Start at ${fromB.name}` },
      { step: 2, text: `Head towards ${toB.name}` },
      { step: 3, text: `Arrive at ${toB.name} (${dist}m)` },
    ]);

    // Fit map to route
    const bounds = new maplibregl.LngLatBounds(fromB.lngLat, toB.lngLat);
    map.fitBounds(bounds, { padding: 100, pitch: 50 });
  }, [navFrom, navTo]);

  const clearNavigation = useCallback(() => {
    if (mapRef.current) {
      mapRef.current.getSource('nav-route')?.setData({
        type: 'Feature', geometry: { type: 'LineString', coordinates: [] }
      });
    }
    setNavigationRoute(null);
    setNavDirections([]);
    setNavFrom('');
    setNavTo('');
  }, []);

  const confirmPin = useCallback(() => {
    if (pendingPin && onMapClick) {
      onMapClick(pendingPin);
    }
  }, [pendingPin, onMapClick]);

  /* ──────────────────────────────────────────────────────────
     Render
  ────────────────────────────────────────────────────────── */
  return (
    <div className="relative w-full h-full" style={{ minHeight: 500 }}>
      {/* Map container */}
      <div ref={mapContainer} className="absolute inset-0" />

      {/* CSS animations */}
      <style>{`
        @keyframes ripple { 0% { transform: scale(1); opacity:0.8; } 100% { transform: scale(2.5); opacity:0; } }
        @keyframes pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(245,158,11,0.6); } 50% { box-shadow: 0 0 0 8px rgba(245,158,11,0); } }
        .campus-building-marker:hover { transform: scale(1.3) !important; }
      `}</style>

      {/* ── Live Location Controls ──────────────────────────── */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        <button
          onClick={isTracking ? stopTracking : startTracking}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold shadow-lg transition-all
            ${isTracking
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200'}`}
        >
          <span className={`w-2 h-2 rounded-full ${isTracking ? 'bg-white animate-pulse' : 'bg-gray-400'}`} />
          {isTracking ? 'Live: ON' : 'Enable Live Location'}
        </button>

        {isTracking && userLocation && (
          <button
            onClick={centerOnUser}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold shadow-lg bg-white text-gray-700 hover:bg-blue-50 border border-gray-200 transition-all"
          >
            🎯 Center on Me
          </button>
        )}

        {locationError && (
          <div className="bg-red-100 text-red-700 text-xs px-3 py-2 rounded-lg border border-red-200 shadow max-w-xs">
            ⚠️ {locationError}
          </div>
        )}
      </div>

      {/* ── Navigation Panel ──────────────────────────────────── */}
      {mode === 'map' && (
        <div className="absolute top-4 right-14 z-10 w-72">
          <div className="bg-white/95 backdrop-blur rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3">
              <h3 className="text-white font-bold text-sm flex items-center gap-2">
                🧭 Navigate Campus
              </h3>
            </div>
            <div className="p-3 space-y-2">
              <select
                value={navFrom}
                onChange={e => setNavFrom(e.target.value)}
                className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-300 outline-none bg-white"
              >
                <option value="">From: Select building...</option>
                {BUILDINGS_INFO.map(b => (
                  <option key={b.id} value={b.id}>{b.name}</option>
                ))}
              </select>
              <select
                value={navTo}
                onChange={e => setNavTo(e.target.value)}
                className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-300 outline-none bg-white"
              >
                <option value="">To: Select building...</option>
                {BUILDINGS_INFO.map(b => (
                  <option key={b.id} value={b.id}>{b.name}</option>
                ))}
              </select>
              <div className="flex gap-2">
                <button
                  onClick={handleNavigate}
                  disabled={!navFrom || !navTo}
                  className="flex-1 bg-blue-600 text-white text-sm py-2 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Get Route
                </button>
                {navigationRoute && (
                  <button
                    onClick={clearNavigation}
                    className="px-3 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm hover:bg-gray-200 transition-colors"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Directions */}
            {navDirections.length > 0 && (
              <div className="border-t border-gray-100 px-3 py-2 space-y-1 max-h-40 overflow-y-auto">
                <div className="text-xs font-semibold text-blue-600 mb-1">
                  📍 {navigationRoute?.distance}m · ~{Math.ceil(navigationRoute?.distance/80)} min walk
                </div>
                {navDirections.map(d => (
                  <div key={d.step} className="flex gap-2 text-xs text-gray-700 py-1">
                    <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      {d.step}
                    </span>
                    {d.text}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Lost & Found pin mode indicator ──────────────────── */}
      {(mode === 'lostfound' || pinMode) && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          {!pendingPin && (
            <div className="bg-amber-500/90 backdrop-blur text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg">
              📍 Click on map to pin location
            </div>
          )}
        </div>
      )}

      {pendingPin && mode === 'lostfound' && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          <button
            onClick={confirmPin}
            className="bg-green-500 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-lg hover:bg-green-600 transition-colors"
          >
            ✓ Confirm Location
          </button>
          <button
            onClick={() => setPendingPin(null)}
            className="bg-white text-gray-700 px-4 py-2 rounded-xl text-sm font-semibold shadow-lg hover:bg-gray-100 transition-colors border"
          >
            ✕ Cancel
          </button>
        </div>
      )}

      {/* ── Building Info Popup ───────────────────────────────── */}
      {selectedBuilding && (
        <div className="absolute bottom-4 left-4 z-20 w-72 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
          <div className="p-4"
               style={{ background: `linear-gradient(135deg, ${CATEGORY_COLORS[selectedBuilding.category]}, ${CATEGORY_COLORS[selectedBuilding.category]}aa)` }}>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-white font-bold text-base">{selectedBuilding.name}</h3>
                <span className="text-white/80 text-xs capitalize">{selectedBuilding.category}</span>
              </div>
              <button onClick={() => setSelectedBuilding(null)} className="text-white/80 hover:text-white text-xl leading-none">×</button>
            </div>
          </div>
          <div className="p-3 space-y-2">
            <div className="flex gap-2 text-xs text-gray-600">
              <span>📍</span>
              <span>{selectedBuilding.lngLat[1].toFixed(5)}°N, {selectedBuilding.lngLat[0].toFixed(5)}°E</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => { setNavTo(selectedBuilding.id); setSelectedBuilding(null); }}
                className="flex-1 text-xs bg-blue-600 text-white py-1.5 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Navigate Here
              </button>
              <button
                onClick={() => { setNavFrom(selectedBuilding.id); setSelectedBuilding(null); }}
                className="flex-1 text-xs bg-gray-100 text-gray-700 py-1.5 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Start From Here
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Map Legend ───────────────────────────────────────── */}
      <div className="absolute bottom-4 right-4 z-10 bg-white/90 backdrop-blur rounded-xl shadow-lg p-3 text-xs">
        <div className="font-semibold text-gray-700 mb-2">Legend</div>
        {Object.entries(CATEGORY_COLORS).map(([cat, color]) => (
          <div key={cat} className="flex items-center gap-2 mb-1">
            <div className="w-3 h-3 rounded-full border border-white/50 shadow-sm" style={{ background: color }} />
            <span className="text-gray-600 capitalize">{cat}</span>
          </div>
        ))}
        {lostFoundPins.length > 0 && (
          <>
            <div className="border-t border-gray-100 my-1" />
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span className="text-gray-600">Lost Item</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-gray-600">Found Item</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
