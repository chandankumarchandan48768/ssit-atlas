import { useState, useEffect } from 'react';
import CampusMapLibre from '../components/CampusMapLibre';
import GPSPermissionModal from '../components/GPSPermissionModal';
import { useGPSPermission } from '../hooks/useGPSPermission';
import api from '../api/axios';

const GPS_MODAL_KEY = 'ssit_gps_permission_asked';

const MapPage = () => {
    const { permissionState, requestPermission } = useGPSPermission();
    const [showGPSModal, setShowGPSModal] = useState(false);
    const [lostFoundPins, setLostFoundPins] = useState([]);

    /* ── Show GPS prompt on first visit ───────────────────── */
    useEffect(() => {
        const alreadyAsked = localStorage.getItem(GPS_MODAL_KEY);
        if (!alreadyAsked && permissionState === 'prompt') {
            setShowGPSModal(true);
        }
    }, [permissionState]);

    const handleAllowGPS = () => {
        requestPermission();
        localStorage.setItem(GPS_MODAL_KEY, 'true');
        setShowGPSModal(false);
    };

    const handleDenyGPS = () => {
        localStorage.setItem(GPS_MODAL_KEY, 'true');
        setShowGPSModal(false);
    };

    /* ── Fetch Lost & Found pins for the map ──────────────── */
    useEffect(() => {
        const fetchPins = async () => {
            try {
                const [lostRes, foundRes] = await Promise.all([
                    api.get('/lost-found?status=LOST'),
                    api.get('/lost-found?status=FOUND'),
                ]);
                const combined = [...(lostRes.data || []), ...(foundRes.data || [])]
                    .filter(item => item.latitude && item.longitude);
                setLostFoundPins(combined);
            } catch (e) {
                // Silent fail — pins are optional
                console.error('Failed to fetch lost/found pins:', e);
            }
        };
        fetchPins();
        const interval = setInterval(fetchPins, 30000); // refresh every 30s
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full" style={{ height: 'calc(100vh - 64px)' }}>
            {/* GPS Permission Modal */}
            {showGPSModal && (
                <GPSPermissionModal onAllow={handleAllowGPS} onDeny={handleDenyGPS} />
            )}

            {/* The real MapLibre campus map */}
            <CampusMapLibre
                lostFoundPins={lostFoundPins}
                mode="map"
            />
        </div>
    );
};

export default MapPage;
