import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import maplibregl from 'maplibre-gl';

export function createBuildingLayer({
  id,
  map,
  lngLat,
  glbPath,
  scaleFactor = 1,
  offsetX = 0,
  offsetY = 0,
  offsetZ = 0,
  rotationY = 0
}) {
  const mercator = maplibregl.MercatorCoordinate.fromLngLat(
    lngLat,
    offsetZ
  );

  const transform = {
    translateX: mercator.x,
    translateY: mercator.y,
    translateZ: mercator.z,
    rotateX: Math.PI / 2,
    rotateY: rotationY,
    rotateZ: 0,
    scale: mercator.meterInMercatorCoordinateUnits() * scaleFactor
  };

  let scene, camera, renderer, model;

  return {
    id,
    type: 'custom',
    renderingMode: '3d',

    onAdd(map, gl) {
      scene = new THREE.Scene();
      camera = new THREE.Camera();

      /* ===== RENDERER ===== */
      renderer = new THREE.WebGLRenderer({
        canvas: map.getCanvas(),
        context: gl,
        antialias: true
      });

      renderer.autoClear = false;
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.3;

      /* ===== LIGHTING ===== */
      scene.add(new THREE.AmbientLight(0xffffff, 1.2));

      scene.add(new THREE.HemisphereLight(
        0xffffff,
        0xcccccc,
        1.0
      ));

      const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
      dirLight.position.set(100, 200, 100);
      scene.add(dirLight);

      /* ===== LOAD MODEL ===== */
      const loader = new GLTFLoader();
      loader.load(glbPath, (gltf) => {
        model = gltf.scene;

        model.position.set(offsetX, offsetY, 0);
        model.rotation.y = rotationY;

        model.traverse((obj) => {
          if (obj.isMesh) {
            obj.material.side = THREE.DoubleSide;
            obj.material.needsUpdate = true;
          }
        });

        scene.add(model);
        map.triggerRepaint();
      });
    },

    render(gl, matrix) {
      if (!scene || !camera || !renderer) return;

      const rotationX = new THREE.Matrix4().makeRotationAxis(
        new THREE.Vector3(1, 0, 0),
        transform.rotateX
      );

      const rotationY = new THREE.Matrix4().makeRotationAxis(
        new THREE.Vector3(0, 1, 0),
        transform.rotateY
      );

      const m = new THREE.Matrix4().fromArray(matrix);
      const l = new THREE.Matrix4()
        .makeTranslation(
          transform.translateX,
          transform.translateY,
          transform.translateZ
        )
        .scale(new THREE.Vector3(
          transform.scale,
          -transform.scale,
          transform.scale
        ))
        .multiply(rotationX)
        .multiply(rotationY);

      camera.projectionMatrix = m.multiply(l);

      renderer.resetState();
      renderer.render(scene, camera);
      map.triggerRepaint();
    }
  };
}
