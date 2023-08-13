import * as THREE from "three";
import gsap from 'gsap'
import './style.css'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
//Scene

const scene = new THREE.Scene();

//Create a cube
const geometry = new THREE.SphereGeometry(10); 
const material = new THREE.MeshPhysicalMaterial( {
  color: "#0000FF",
  roughness: 0.3,
  //transparent: true,
  opacity: 0.5,
  //wireframe: true,
} ); 
const obj = new THREE.Mesh( geometry, material ); 
scene.add( obj );

//Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}
//Light
const light = new THREE.PointLight(0xffffff, 1, 25)
light.position.set(5,10, 10)
scene.add(light)

// const light2 = new THREE.AmbientLight(0xffffff, 0.1)
// scene.add(light2);

// const light3 = new THREE.DirectionalLight(0xff0000, 0.5);
// light3.position.set(0, 2, 0);
// scene.add(light3)

//Camera
const camera = new THREE.PerspectiveCamera(
  45, 
  sizes.width / sizes.height,
  0.1,
  100
)

camera.position.z = 50
scene.add(camera)


//Renderer
const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({
  canvas,
  //alpha: true
  }
  
  )
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(3)
renderer.render(scene, camera)


//Controls
const controls = new OrbitControls(camera, canvas)
controls. enableDamping = true
controls.enablePan = false
controls.enableZoom = false
controls.autoRotate = true
//Resize

window.addEventListener('resize', () => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  //update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  renderer.setSize(sizes.width, sizes.height)
})

const loop = () => {
  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(loop)
}
loop()

//Timeline magicc
const tl = gsap.timeline({defaults: {duration: 1}})
tl.fromTo(obj.scale, {z:0, x:0, y:0}, {z:1, x:1, y:1})
tl.fromTo('nav', {y: "-100%"}, {y:"0%"})
tl.fromTo('.title', {opacity: 0}, {opacity: 1})

//Mouse animation color
let mouseDown = false
let rgb = []
window.addEventListener('mousedown', () => (mouseDown = true))
window.addEventListener('mouseup', () => (mouseDown = false))

window.addEventListener("mousemove", (e)=>{
  if(mouseDown){
    rgb = [
      Math.round((e.pageX / sizes.width) * 255),
      Math.round((e.pageY / sizes.height) * 255),
      200,
    ]
    //Animate
    let newColor = new THREE.Color(`rgb(${rgb.join(",")})`)
    
    gsap.to(obj.material.color, {
      r: newColor.r,
      g: newColor.g, 
      b: newColor.b,
    })
  }
})