import { useRef, useMemo } from 'react';
import * as THREE from 'three';

const NavigationPath3D = ({ route, scale = 10000 }) => {
    const lineRef = useRef();

    // Convert lat/lng coordinates to 3D positions
    const pathPoints = useMemo(() => {
        if (!route || !route.coordinates) return [];

        // Use first coordinate as reference
        const refLat = route.coordinates[0][0];
        const refLng = route.coordinates[0][1];

        return route.coordinates.map(([lat, lng]) => {
            const x = (lng - refLng) * scale;
            const z = (lat - refLat) * scale;
            return new THREE.Vector3(x, 2, z); // Elevated above ground
        });
    }, [route, scale]);

    if (pathPoints.length < 2) return null;

    // Create curve from points
    const curve = new THREE.CatmullRomCurve3(pathPoints);
    const points = curve.getPoints(50);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    return (
        <group>
            {/* Navigation Path Line */}
            <line ref={lineRef} geometry={geometry}>
                <lineBasicMaterial
                    attach="material"
                    color="#3B82F6"
                    linewidth={3}
                    transparent
                    opacity={0.9}
                />
            </line>

            {/* Start Marker (Green Sphere) */}
            {pathPoints[0] && (
                <mesh position={pathPoints[0].clone()}>
                    <sphereGeometry args={[2, 32, 32]} />
                    <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={0.5} />
                </mesh>
            )}

            {/* End Marker (Red Sphere) */}
            {pathPoints[pathPoints.length - 1] && (
                <mesh position={pathPoints[pathPoints.length - 1].clone()}>
                    <sphereGeometry args={[2, 32, 32]} />
                    <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.5} />
                </mesh>
            )}

            {/* Path markers along the route */}
            {pathPoints.map((point, index) => {
                if (index === 0 || index === pathPoints.length - 1) return null;
                return (
                    <mesh key={index} position={point.clone()}>
                        <cylinderGeometry args={[0.5, 0.5, 4, 8]} />
                        <meshStandardMaterial color="#3B82F6" transparent opacity={0.6} />
                    </mesh>
                );
            })}
        </group>
    );
};

export default NavigationPath3D;
