const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 1000);
camera.position.z = 3; // Adjusted camera position for smaller sphere

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // antialias true for smoother sphere
renderer.setSize(150, 150); // Match CSS size for #three-container
renderer.setClearColor(0x000000, 0); 
const threeContainer = document.getElementById('three-container');
if (threeContainer) {
    threeContainer.appendChild(renderer.domElement);
}


const geometry = new THREE.SphereGeometry(1, 32, 32); // Increased segments for smoother sphere
const material = new THREE.MeshBasicMaterial({ color: 0x00FF00, wireframe: true, transparent: true });
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

const fog = new THREE.FogExp2(0x000000, 0.15); // Adjusted fog density
scene.fog = fog;

// Removed unused animate() function

let lastTime = performance.now();
function rotateAndRender() { // Renamed function
  const currentTime = performance.now();
  const timeDiff = currentTime - lastTime;

  // Rotate continuously for smoother animation
  sphere.rotation.y += 0.005; // Slower, smoother rotation
  sphere.rotation.x += 0.002;


  renderer.render(scene, camera);
  lastTime = currentTime;
  requestAnimationFrame(rotateAndRender);
}

rotateAndRender(); // Start the animation loop