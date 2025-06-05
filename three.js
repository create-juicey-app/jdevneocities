const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); // Use window dimensions for aspect
camera.position.set(0, 0, 0); // Camera at the center

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight); // Renderer covers the whole window
renderer.setClearColor(0x000000, 0); 

const threeContainer = document.getElementById('three-container');
if (threeContainer) {
    threeContainer.appendChild(renderer.domElement);
}

const geometry = new THREE.SphereGeometry(500, 60, 40); // Much larger sphere, more segments
// Flip the geometry normals to see the inside
geometry.scale(-1, 1, 1);

const material = new THREE.MeshBasicMaterial({ 
    color: 0x003300, // Darker green for background
    wireframe: true, 
    transparent: true, 
    opacity: 0.3, // Make it somewhat transparent
    side: THREE.BackSide // Render the inside of the sphere
});
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Fog might not be needed or might need adjustment when inside the sphere
// scene.fog = new THREE.FogExp2(0x000000, 0.002); // Optional: adjust if you want fog

let lastTime = performance.now();
function rotateAndRender() { // Renamed function
  const currentTime = performance.now();
  const timeDiff = currentTime - lastTime;

  // Rotate continuously for smoother animation
  sphere.rotation.y += 0.0005; // Slower rotation for background
  sphere.rotation.x += 0.0002;
  sphere.rotation.z += 0.0001; // Add a bit of z rotation


  renderer.render(scene, camera);
  lastTime = currentTime;
  requestAnimationFrame(rotateAndRender);
}

rotateAndRender(); // Start the animation loop

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});