import { useState, useRef } from 'react';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

const Building3D = ({ building, onClick, scale = 10000 }) => {
    const [hovered, setHovered] = useState(false);
    const meshRef = useRef();

    // Convert lat/lng polygon to 3D positions
    const convertToLocal = (polygon, center) => {
        // Reference center for local coordinates
        const refLat = center[0];
        const refLng = center[1];

        return polygon.map(([lat, lng]) => {
            // Convert geographic coordinates to local meters
            const x = (lng - refLng) * scale;
            const z = (lat - refLat) * scale;
            return [x, z];
        });
    };

    // Create extruded shape from polygon
    const createBuildingGeometry = () => {
        const shape = new THREE.Shape();
        const localPolygon = convertToLocal(building.polygon, building.center);

        if (localPolygon.length > 0) {
            shape.moveTo(localPolygon[0][0], localPolygon[0][1]);
            for (let i = 1; i < localPolygon.length; i++) {
                shape.lineTo(localPolygon[i][0], localPolygon[i][1]);
            }
            shape.lineTo(localPolygon[0][0], localPolygon[0][1]); // Close the shape
        }

        return shape;
    };

    const shape = createBuildingGeometry();
    const extrudeSettings = {
        steps: 1,
        depth: building.height || 10,
        bevelEnabled: false,
    };

    // Convert center to local 3D position
    const centerX = (building.center[1] - building.center[1]) * scale;
    const centerZ = (building.center[0] - building.center[0]) * scale;

    return (
        <group position={[centerX, 0, centerZ]}>
            {/* Building Block */}
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
            >
                <extrudeGeometry args={[shape, extrudeSettings]} />
                <meshStandardMaterial
                    color={hovered ? '#e5bd8a' : building.color || '#d4a574'}
                    roughness={0.7}
                    metalness={0.2}
                />
            </mesh>

            {/* Building Label */}
            <Text
                position={[0, (building.height || 10) + 2, 0]}
                fontSize={3}
                color="#000000"
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.2}
                outlineColor="#ffffff"
            >
                {building.name}
            </Text>

            {/* Outline */}
            <mesh
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, 0.01, 0]}
            >
                <extrudeGeometry args={[shape, extrudeSettings]} />
                <meshBasicMaterial
                    color="#000000"
                    wireframe={false}
                    transparent={true}
                    opacity={0}
                />
                <lineSegments>
                    <edgesGeometry attach="geometry" args={[new THREE.ExtrudeGeometry(shape, extrudeSettings)]} />
                    <lineBasicMaterial attach="material" color="#8B4513" linewidth={2} />
                </lineSegments>
            </mesh>
        </group>
    );
};

export default Building3D;
