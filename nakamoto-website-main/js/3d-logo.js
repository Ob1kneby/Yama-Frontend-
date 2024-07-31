var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, 1, 1, 1000);
camera.position.set(0, 0, 20);
var renderer = new THREE.WebGLRenderer({
  antialias: true
});
var canvas = renderer.domElement;
document.getElementById("canvas-container").appendChild(canvas)
const geometry = new THREE.CircleGeometry(5, 32);
const material = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load('images/heading-logo.png'),
    side: THREE.DoubleSide
});
const disk = new THREE.Mesh(geometry, material);
disk.geometry.translate(0, 0, 0.5);
disk.scale.set(1.5, 1.5, 3);
disk.position.z = -10;
scene.add(disk);

var plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -10);
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var pointOfIntersection = new THREE.Vector3();
document.body.addEventListener("mousemove", onMouseMove, false);

const planeGeometry = new THREE.PlaneGeometry(1488, 200, 1, 1);
const planeTexture = new THREE.TextureLoader().load('images/rainbow-worms.png');
const planeMaterial = new THREE.MeshBasicMaterial({ map: planeTexture });
const wormPlane = new THREE.Mesh(planeGeometry, planeMaterial);
wormPlane.position.z = -700;
scene.add(wormPlane);

function onMouseMove(event){
  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  raycaster.ray.intersectPlane(plane, pointOfIntersection);
  disk.lookAt(pointOfIntersection);
  wormPlane.lookAt(pointOfIntersection);
}

renderer.setAnimationLoop(() => {
  if (resize(renderer)) {
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }
  renderer.render(scene, camera);
});

function resize(renderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}

