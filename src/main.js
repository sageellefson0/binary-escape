import * as THREE from 'three';
import { GLTFLoader } from '../node_modules/three/examples/jsm/loaders/GLTFLoader.js';

let scene, camera, renderer, model;

function init() {
  scene = new THREE.Scene();

  const modelDiv = document.getElementById('male-intern');
  
  // Use new dimensions for aspect ratio and renderer size
  const width = 300;
  const height = 500;
  const aspect = width / height;
  
  camera = new THREE.PerspectiveCamera(40, aspect, 1, 5000);
  camera.position.set(0, 150, 500); // Adjusted position to view both cube and model

  // Ambient light
  const hlight = new THREE.AmbientLight(0x404040, 5);
  scene.add(hlight);

  // Directional light
  const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
  directionalLight.position.set(0, 1, 0);
  directionalLight.castShadow = true;
  scene.add(directionalLight);

  // Point lights
  const light1 = new THREE.PointLight(0xc4c4c4, 1);
  light1.position.set(0, 300, 500);
  scene.add(light1);

  const light2 = new THREE.PointLight(0xc4c4c4, 1);
  light2.position.set(500, 100, 0);
  scene.add(light2);

  const light3 = new THREE.PointLight(0xc4c4c4, 1);
  light3.position.set(0, 100, -500);
  scene.add(light3);

  const light4 = new THREE.PointLight(0xc4c4c4, 1);
  light4.position.set(-500, 300, 500);
  scene.add(light4);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height); // Set size to 300x500px
  modelDiv.appendChild(renderer.domElement);

  // Add a simple cube for debugging
  const geometry = new THREE.BoxGeometry(50, 50, 50);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);
  cube.position.set(0, 25, 0); // Adjust position to make sure it's in view
  scene.add(cube);
  console.log("Added cube to scene");

  // Load GLTF model
  const loader = new GLTFLoader();
  loader.load('/3d-models/girl-intern-idle.glb', function (gltf) {
    model = gltf.scene;
    model.scale.set(100, 100, 100);
    model.position.set(0, 0, 0); // Adjust position to make sure it's in view
    scene.add(model);
    console.log("Added model to scene");

    // Center the camera on the model
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    camera.lookAt(center);
  }, undefined, function (error) {
    console.error('An error happened:', error);
  });

  window.addEventListener('resize', onWindowResize, false);

  animate();
}

function onWindowResize() {
  const width = 300;
  const height = 500;
  const aspect = width / height;
  camera.aspect = aspect;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

init();