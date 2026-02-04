import { useRef, useState } from 'react';
import { useLoader } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

const OBJModelLoader = ({ building, onClick, modelPath, scale = 1, position = [0, 0, 0] }) => {
    const [hovered, setHovered] = useState(false);
    const meshRef = useRef();

    // Load OBJ model
    let obj = null;
    try {
        obj = useLoader(OBJLoader, modelPath);
    } catch (error) {
        console.error(`Error loading OBJ model for ${building.name}:`, error);
        return null;
    }

    // Clone the model to avoid issues with multiple instances
    const clonedObj = obj.clone();

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
            position={position}
            scale={scale}
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
            <primitive object={clonedObj} />

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

export default OBJModelLoader;
