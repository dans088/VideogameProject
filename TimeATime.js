
//Movement keys
let keysDown = {
    "a":false,
    "d":false,
    "ArrowLeft":false,
    "ArrowRight":false,
    "Spacebar":false
};

//Class for the character that the player controls
class Ghost
{
    constructor(mesh, speed = 0.1)
    {
        this.mesh = mesh;
        this.speed = speed;
    }

    async load_model(objModeUrl)
    {
    
    }

    //receive translation matrix
    moveLeft()
    {
        console.log("Moveleft");
        this.mesh.position.x -= this.speed;
    }

    moveRight()
    {
        console.log("Moveright");
        this.mesh.position.x += this.speed;
    }

    jump(){
        //JUMP
    }

    update(){
        if(keysDown["a"] || keysDown["ArrowLeft"])
            this.moveLeft()
        if(keysDown["d"] || keysDown["ArrowRight"])
            this.moveRight()
        if(keysDown["Spacebar"])
            this.jump()
    }
}

let renderer = null,    // Object in charge of drawing a scene
scene = null,           
camera = null,
uniforms = null,
orbitControls = null;
ghost = null;
canvas = null;

let duration = 5000; // ms
let currentTime = Date.now();

function animate() 
{
    let now = Date.now();
    let deltat = now - currentTime;
    currentTime = now;
    let fract = deltat / duration;
   
    //uniforms.time.value += fract;

}

function run() {

    requestAnimationFrame(function() { run(); });
    
    // Render the scene
    renderer.render( scene, camera );

    ghost.update();

    // Spin
    animate();

}


function scene_setup(canvas)
{

    // Create the Three.js renderer and attach it to our canvas
    renderer = new THREE.WebGLRenderer( { canvas: canvas, antialias: true } );

    // Set the viewport size
    renderer.setSize(canvas.width, canvas.height);

    // Turn on shadows
    renderer.shadowMap.enabled = true;
    // Options are THREE.BasicShadowMap, THREE.PCFShadowMap, PCFSoftShadowMap
    renderer.shadowMap.type = THREE.BasicShadowMap;

    // Create a new Three.js scene
    scene = new THREE.Scene();

    // Add light
    // Add a directional light to show off the object
    let directionalLight = new THREE.DirectionalLight( 0xffffff, 1);
    directionalLight.position.set(0, 1, 2);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    keyEvents();

    load_ghost();

    pivot = new THREE.Object3D;

    //Create a pivot and add it to the mesh of the player
    ghost.mesh.add(pivot);

    // Add  a camera so we can view the scene
    camera = new THREE.PerspectiveCamera( 45, canvas.width / canvas.height, 1, 4000 );
    camera.position.set(0, 2, 10);
    //Add the camera to the pivot so it follows the player
    pivot.add(camera);

    let box_geometry = new THREE.PlaneGeometry(10,10,15,15);
    let material = new THREE.MeshBasicMaterial( {color: 0xffffff} );
    let cube = new THREE.Mesh(box_geometry, material);
    cube.rotation.x = -Math.PI / 2;
    cube.position.y = 0;
    scene.add(cube);
    /*
    Portals = new THREE.mesh();

    create_portal();

    scene.add(Portals);

    */

}

function keyEvents(){

    document.addEventListener("keyup", event=>{
        keysDown[event.key] = false;
    });
       
    document.addEventListener("keydown", event=>{
        keysDown[event.key] = true;

    }); 
} 

function promisifyLoader ( loader, onProgress ) 
{
    function promiseLoader ( url ) {
  
      return new Promise( ( resolve, reject ) => {
  
        loader.load( url, resolve, onProgress, reject );
  
      } );
    }
  
    return {
      originalLoader: loader,
      load: promiseLoader,
    };
}

function load_ghost()
{
    let box_geometry = new THREE.BoxGeometry(1, 1, 1);
    let material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
    let cube = new THREE.Mesh(box_geometry, material);
    
    ghost = new Ghost(cube, 0.1);

    scene.add(ghost.mesh);

    ghost.mesh.position.set( 0, 1, 0 );
}

function create_portal()
{
    //create shadermaterial for the portal 
    let COLORMAP = new THREE.TextureLoader().load("images/whirlpool.jpg");
    let NOISEMAP = new THREE.TextureLoader().load("images/color_clouds.jpg");

    
    uniforms = 
    {
        time: { type: "f", value: 0.1 },
        noiseTexture: { type: "t", value: NOISEMAP },
        glowTexture: { type: "t", value: COLORMAP }
    };

    uniforms.noiseTexture.value.wrapS = uniforms.noiseTexture.value.wrapT = THREE.RepeatWrapping;
    uniforms.glowTexture.value.wrapS = uniforms.glowTexture.value.wrapT = THREE.RepeatWrapping;

    let material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: document.getElementById( 'vertexShader' ).textContent,
        fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
        transparent: false
    } );

    
    let geometry = new THREE.SphereGeometry(2, 36, 36);

    let portal = new THREE.Mesh(geometry, material);
    portal.rotation.x = Math.PI/1.7;

    Portals.add(portal);

    
}