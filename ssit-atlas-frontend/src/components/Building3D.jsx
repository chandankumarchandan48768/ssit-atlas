import { useState, useRef, useMemo } from 'react';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { campusCenter } from '../data/CampusMapData';

const Building3D = ({ building, onClick, scale = 10000 }) => {
    const [hovered, setHovered] = useState(false);
    const meshRef = useRef();

    // Convert lat/lng polygon to 3D positions
    const convertToLocal = (polygon, center) => {
        // Reference center for local coordinates is the building center itself
        const refLat = center[0];
        const refLng = center[1];

        return polygon.map(([lat, lng]) => {
            // Convert geographic coordinates to local meters relative to building center
            const x = (lng - refLng) * scale;
            const z = (lat - refLat) * scale;
            return [x, z];
        });
    };

    // Create extruded shape from polygon
    const shape = useMemo(() => {
        const s = new THREE.Shape();
        const localPolygon = convertToLocal(building.polygon, building.center);

        if (localPolygon.length > 0) {
            s.moveTo(localPolygon[0][0], localPolygon[0][1]);
            for (let i = 1; i < localPolygon.length; i++) {
                s.lineTo(localPolygon[i][0], localPolygon[i][1]);
            }
            s.lineTo(localPolygon[0][0], localPolygon[0][1]); // Close the shape
        }
        return s;
    }, [building]);

    const extrudeSettings = {
        steps: 1,
        depth: building.height || 10,
        bevelEnabled: false,
    };

    // Convert center to local 3D position relative to Campus Center
    const centerX = (building.center[1] - campusCenter[1]) * scale;
    const centerZ = (building.center[0] - campusCenter[0]) * scale;

    const blockColor = building.color || '#d4a574';
    const hoverColor = '#e5bd8a';

    return (
        <group position={[centerX, 0, centerZ]}>
            {/* Solid Building Block */}
            <mesh
                ref={meshRef}
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, 0, 0]}
                onClick={(e) => {
                    e.stopPropagation();
                    onClick(building);
                }}
                onPointerOver={(e) => {
                    e.stopPropagation();
                    setHovered(true);
                    document.body.style.cursor = 'pointer';
                }}
                onPointerOut={() => {
                    setHovered(false);
                    document.body.style.cursor = 'default';
                }}
                castShadow
                receiveShadow
            >
                <extrudeGeometry args={[shape, extrudeSettings]} />
                <meshStandardMaterial
                    color={hovered ? hoverColor : blockColor}
                    roughness={0.2}
                    metalness={0.1}
                />
            </mesh>

            {/* Building Outline/Edges */}
            <mesh
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, 0.01, 0]}
            >
                <extrudeGeometry args={[shape, extrudeSettings]} />
                <meshBasicMaterial
                    color="#000000"
                    wireframe={true}
                    transparent={true}
                    opacity={0.3}
                />
            </mesh>

            {/* Building Label */}
            <Text
                position={[0, (building.height || 10) + 3, 0]}
                fontSize={4}
                color="#000000"
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.1}
                outlineColor="#ffffff"
            >
                {building.name}
            </Text>
        </group>
    );
};

export default Building3D;

