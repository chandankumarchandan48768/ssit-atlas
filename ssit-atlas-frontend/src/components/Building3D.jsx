import { useState, useRef, Suspense } from 'react';
import { Text } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import * as THREE from 'three';
import { campusCenter } from '../data/CampusMapData';

const Building3D = ({ building, onClick, scale = 10000 }) => {
    const [hovered, setHovered] = useState(false);
    const meshRef = useRef();

    // If building has a 3D model, render it
    if (building.modelPath) {
        return (
            <Suspense fallback={null}>
                <OBJModel
                    building={building}
                    onClick={onClick}
                    hovered={hovered}
                    setHovered={setHovered}
                    scale={scale}
                />
            </Suspense>
        );
    }

    // Otherwise, use procedural geometry
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

    // Convert center to local 3D position relative to Campus Center
    const centerX = (building.center[1] - campusCenter[1]) * scale;
    const centerZ = (building.center[0] - campusCenter[0]) * scale;

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

// Component for rendering OBJ models
const OBJModel = ({ building, onClick, hovered, setHovered, scale }) => {
    const meshRef = useRef();

    // Load OBJ model
    const obj = useLoader(OBJLoader, building.modelPath);

    // Clone the model to avoid issues with multiple instances
    const clonedObj = obj.clone();

    // Calculate position based on building center relative to Campus Center
    const centerX = (building.center[1] - campusCenter[1]) * scale;
    const centerZ = (building.center[0] - campusCenter[0]) * scale;

    const modelScale = building.modelScale || 0.01;

    // Apply material properties to all meshes in the model
    clonedObj.traverse((child) => {
        if (child instanceof THREE.Mesh) {
            // Create a new material with better appearance
            child.material = new THREE.MeshStandardMaterial({
                color: hovered ? '#e5bd8a' : (building.color || '#d4a574'),
                roughness: 0.7,
                metalness: 0.2,
            });
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });

    return (
        <group
            ref={meshRef}
            position={[centerX, 0, centerZ]}
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
            {/* The scaled model */}
            <group scale={[modelScale, modelScale, modelScale]}>
                <primitive object={clonedObj} />
            </group>

            {/* Building Label */}
            <Text
                position={[0, (building.height || 15) + 5, 0]}
                fontSize={3}
                color="#000000"
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.2}
                outlineColor="#ffffff"
            >
                {building.name}
            </Text>
        </group>
    );
};

export default Building3D;
