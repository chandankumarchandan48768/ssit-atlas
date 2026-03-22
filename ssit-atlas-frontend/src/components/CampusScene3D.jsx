import { Suspense, useState, useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Sky, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import Building3D from './Building3D';
import NavigationPath3D from './NavigationPath3D';

const InteractiveGrid = ({ onTileClick, adminMode }) => {
    const [hoveredTile, setHoveredTile] = useState(null);
    const planeRef = useRef();
    const { camera, raycaster } = useThree();

    const gridSize = 500;
    const divisions = 50; // 10 units per tile
    const tileSize = gridSize / divisions;

    const handlePointerMove = (e) => {
        if (!adminMode) return;
        e.stopPropagation();

        const point = e.point;
        // Calculate grid coordinates center
        const x = Math.floor(point.x / tileSize) * tileSize + tileSize / 2;
        const z = Math.floor(point.z / tileSize) * tileSize + tileSize / 2;

        if (!hoveredTile || hoveredTile[0] !== x || hoveredTile[1] !== z) {
            setHoveredTile([x, z]);
        }
    };

    const handleClick = (e) => {
        if (!adminMode) return;
        e.stopPropagation();
        if (hoveredTile) {
            onTileClick(hoveredTile);
        }
    };

    return (
        <group>
            {/* Base Ground Plane */}
            <mesh
                ref={planeRef}
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, -0.1, 0]}
                receiveShadow
                onPointerMove={handlePointerMove}
                onPointerOut={() => setHoveredTile(null)}
                onClick={handleClick}
            >
                <planeGeometry args={[gridSize, gridSize]} />
                <meshStandardMaterial color="#e0e0e0" roughness={0.8} />
            </mesh>

            {/* Grid Lines */}
            <gridHelper args={[gridSize, divisions, 0x000000, 0x888888]} position={[0, 0.01, 0]} />

            {/* Hover Highlight */}
            {adminMode && hoveredTile && (
                <mesh
                    rotation={[-Math.PI / 2, 0, 0]}
                    position={[hoveredTile[0], 0.02, hoveredTile[1]]}
                >
                    <planeGeometry args={[tileSize - 0.5, tileSize - 0.5]} />
                    <meshBasicMaterial color="#3B82F6" transparent opacity={0.5} />
                    <lineSegments>
                        <edgesGeometry attach="geometry" args={[new THREE.PlaneGeometry(tileSize - 0.5, tileSize - 0.5)]} />
                        <lineBasicMaterial attach="material" color="#1d4ed8" linewidth={2} />
                    </lineSegments>
                </mesh>
            )}
        </group>
    );
};

const CampusScene3D = ({ buildings, route, routeInfo, onBuildingClick, onTileClick, adminMode = false }) => {
    return (
        <div className="w-full h-full">
            <Canvas shadows>
                {/* Camera Setup */}
                <PerspectiveCamera makeDefault position={[0, 150, 150]} fov={60} />

                {/* Lighting */}
                <ambientLight intensity={0.6} />
                <directionalLight
                    position={[50, 100, 50]}
                    intensity={1}
                    castShadow
                    shadow-mapSize-width={2048}
                    shadow-mapSize-height={2048}
                />
                <directionalLight position={[-50, 50, -50]} intensity={0.4} />

                {/* Sky */}
                <Sky
                    distance={450000}
                    sunPosition={[100, 20, 100]}
                    inclination={0.5}
                    azimuth={0.25}
                />

                {/* Interactive Grid Ground */}
                <InteractiveGrid onTileClick={onTileClick} adminMode={adminMode} />

                {/* Buildings */}
                <Suspense fallback={null}>
                    {buildings.map((building) => (
                        <Building3D
                            key={building.id}
                            building={building}
                            onClick={onBuildingClick}
                        />
                    ))}
                </Suspense>

                {/* Navigation Path */}
                {route && route.coordinates && (
                    <NavigationPath3D route={route} />
                )}

                {/* Orbit Controls */}
                <OrbitControls
                    enableDamping
                    dampingFactor={0.05}
                    minDistance={20}
                    maxDistance={400}
                    maxPolarAngle={Math.PI / 2.1}
                    target={[0, 0, 0]}
                />
            </Canvas>
        </div>
    );
};

export default CampusScene3D;
