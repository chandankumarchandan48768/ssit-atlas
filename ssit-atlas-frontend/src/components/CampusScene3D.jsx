import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sky, PerspectiveCamera, Grid } from '@react-three/drei';
import Building3D from './Building3D';
import NavigationPath3D from './NavigationPath3D';

const CampusScene3D = ({ buildings, route, routeInfo, onBuildingClick }) => {
    return (
        <div className="w-full h-full">
            <Canvas shadows>
                {/* Camera Setup */}
                <PerspectiveCamera makeDefault position={[0, 150, 150]} fov={60} />

                {/* Lighting */}
                <ambientLight intensity={0.5} />
                <directionalLight
                    position={[50, 100, 50]}
                    intensity={1}
                    castShadow
                    shadow-mapSize-width={2048}
                    shadow-mapSize-height={2048}
                />
                <directionalLight position={[-50, 50, -50]} intensity={0.3} />
                <hemisphereLight intensity={0.3} groundColor="#666666" />

                {/* Sky */}
                <Sky
                    distance={450000}
                    sunPosition={[100, 20, 100]}
                    inclination={0.6}
                    azimuth={0.25}
                />

                {/* Ground Plane */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
                    <planeGeometry args={[500, 500]} />
                    <meshStandardMaterial color="#90a955" roughness={0.8} />
                </mesh>

                {/* Grid Helper */}
                <Grid
                    args={[500, 500]}
                    cellSize={10}
                    cellThickness={0.5}
                    cellColor="#6b8e23"
                    sectionSize={50}
                    sectionThickness={1}
                    sectionColor="#556b2f"
                    fadeDistance={400}
                    fadeStrength={1}
                    followCamera={false}
                    infiniteGrid={false}
                />

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
                    minDistance={50}
                    maxDistance={300}
                    maxPolarAngle={Math.PI / 2.1}
                    target={[0, 0, 0]}
                />
            </Canvas>
        </div>
    );
};

export default CampusScene3D;
