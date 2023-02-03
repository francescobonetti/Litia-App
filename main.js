import * as THREE from 'https://cdn.skypack.dev/three@0.133.1/build/three.module.js';
import { RGBELoader } from 'https://cdn.skypack.dev/three@0.133.1/examples/jsm/loaders/RGBELoader.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.133.1/examples/jsm/loaders/GLTFLoader.js';
const hdrTextureURL = new URL('assets/brown_photostudio_07_1k.hdr', import.meta.url); 
gsap.registerPlugin(ScrollTrigger);

const scene = new THREE.Scene();

let container = document.querySelector(".container3d")
let specta;
let basetta;
let camera;
let tl = gsap.timeline({defaults : {duration: 1, ease: Power2.easeInOut}})
let slide3 = false;

const models = {};
let sizes = {
    width : container.getBoundingClientRect().width,
    height : container.getBoundingClientRect().height
} 

const toLoad = [
    {name: "specta", file: "assets/specta/Specta.gltf", group: new THREE.Group()},
    //{name: "basetta", file: "assets/basetta/Basetta.gltf", group: new THREE.Group()},
  ]

const LoadingManager = new THREE.LoadingManager
const gltfLoader = new GLTFLoader(LoadingManager)
const hdriloader = new RGBELoader(LoadingManager);

LoadingManager.onLoad = setupPosition;

toLoad.forEach(item=>{
    gltfLoader.load(item.file, (model)=>{
      model.scene.traverse(child => {
        if (child instanceof THREE.Mesh) {
          child.receiveShadow = true;
        }
      })
      item.group.add(model.scene)
      item.group.scale.set(10, 10, 10)
      scene.add(item.group);
      models[item.name] = item.group 
    })
}) 

//hdri
hdriloader.load(hdrTextureURL, function(texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = texture;
})

//camera
camera = new THREE.PerspectiveCamera(40, sizes.width/sizes.height, 0.1, 100);

camera.position.set(0, 0, 30);
let cameraTarget = new THREE.Vector3(0, 0, 0)
scene.add(camera);

//lights
const RightLight = new THREE.DirectionalLight( 0xffffff , 0.7);
RightLight.position.set( 50, 50, 50 );
RightLight.castShadow = true
RightLight.shadow.bias = -0.01;
RightLight.shadow.mapSize.width = 2048
RightLight.shadow.mapSize.height = 2048
RightLight.shadow.camera.near = 1.0
RightLight.shadow.camera.far = 500
RightLight.shadow.camera.left = 200
RightLight.shadow.camera.right = -200
RightLight.shadow.camera.top = 200
RightLight.shadow.camera.bottom = -200

const LeftLight = new THREE.DirectionalLight( 0xffffff , 0.2);
LeftLight.position.set( -10, -10, 10 );
LeftLight.castShadow = true
LeftLight.shadow.bias = -0.01;
LeftLight.shadow.mapSize.width = 2048
LeftLight.shadow.mapSize.height = 2048
LeftLight.shadow.camera.near = 1.0
LeftLight.shadow.camera.far = 500
LeftLight.shadow.camera.left = 200
LeftLight.shadow.camera.right = -200
LeftLight.shadow.camera.top = 200
LeftLight.shadow.camera.bottom = -200

scene.add(RightLight, LeftLight)

//render

const renderer = new THREE.WebGLRenderer({alpha:true});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
container.appendChild( renderer.domElement )
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(window.devicePixelRatio)
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;

function loop() {

    camera.lookAt(cameraTarget)
    renderer.render(scene, camera); 
    requestAnimationFrame(loop);   

    if(container.getBoundingClientRect().x < 150 && slide3 == false) {
        slide3 = true;
        comeUpAnimation()
    }

    if(container.getBoundingClientRect().x > 150 && slide3 == true) {
        slide3 = false;
        console.log("down")
        goDownAnimation()
    }

       
  }

loop()

function setupPosition(){

    specta = models.specta
    basetta = models.basetta
  
    specta.position.set( 0, -15, 4);
    specta.rotation.set(1.7, -0.12, 0);
    
}

let connectionStatus = document.querySelector(".connection-status")

function comeUpAnimation() {

    tl.to("#hold-specta p", {opacity: 0, duration: 0.5, delay: 1})
    tl.to("#hold-specta .divider", {width: 0, opacity:0, duration: 0.5}, '<')
    tl.to("#hold-specta h4", {opacity: 0, duration: 0.5}, '<')
    tl.to(specta.position, {y: 2})
    tl.to("#hold-specta h3", {opacity: 1, y:"-10%" , duration: 0.5}, '<')
    /* .add(function(){connectionStatus.innerHTML = "Connected"}, '<+=1')
    tl.call(function() {connectionStatus.style.opacity = 1}, null, '<') */
    
    /* tl.to(specta.position, {y: 2.4})
    tl.to(specta.position, {y: 2})
    tl.to(specta.position, {y: 2.4})
    tl.to(specta.position, {y: 2})
    tl.to(specta.position, {z:7, duration: 1, ease: Back.easeInOut.config(1)})
    .add(function(){connectionStatus.innerHTML = "Connected"}, '<+=0.5') */

    let connectionOverlay = document.querySelector(".overlay")
    let overlayNav = document.querySelector(".steps-navigation")
    tl.call(function() {if(slide3 == true) {connectionOverlay.classList.remove("active"); overlayNav.classList.remove("active");}}, null, "<+=2")
   /*  tl.call(function(){connectionStatus.style.opacity = 0; connectionStatus.innerHTML = "Connecting..."}, null, "<+=1") */
}

function goDownAnimation() {
    tl.to(specta.position, {y: -15, z:4, duration: 0.2})
    tl.to("#hold-specta p", {opacity: 1, duration: 0.2}, '<')
    tl.to("#hold-specta .divider", {width: "100%", opacity:1, duration: 0.2}, '<')
    tl.to("#hold-specta h4", {opacity: 1, duration: 0.2}, '<')
    tl.to("#hold-specta h3", {opacity: 0, y:0 , duration: 0.2}, '<')
}
