let keysDown = {
    "a":false,
    "d":false,
    "ArrowLeft":false,
    "ArrowRight":false,
    "Spacebar":false
};

class Ghost
{
    constructor(Object3D, position, speed = 2)
    {
        this.Object3D = Object3D;
        this.Object3D.position.set(0,0,0);
        this.speed = speed;
    }

    async load_model(objModeUrl)
    {
    
    }

    //receive translation matrix
    moveLeft()
    {
        this.Object3D.position.x -= this.speed;
    }

    moveRight()
    {
        this.Object3D.position.x += this.speed;
    }

    update(){
        if(keysDown["a"] || keysDown["ArrowLeft"])
            this.moveLeft()
        if(keysDown["d"] || keysDown["ArrowRight"])
            this.moveRight()
    }
}



let renderer = null,    // Object in charge of drawing a scene
scene = null,           
camera = null,
uniforms = null,
orbitControls = null;
ghost = null;

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

    // Update the camera controller
    orbitControls.update();

    // Spin
    animate();

}


function scene_setup(canvas)
{
    console.log(THREE.REVISION);

    // Create the Three.js renderer and attach it to our canvas. Different renderes can be used, for example to a 2D canvas.
    renderer = new THREE.WebGLRenderer( { canvas: canvas, antialias: true } );

    // Set the viewport size.
    renderer.setSize(canvas.width, canvas.height);

    // Create a new Three.js scene.
    scene = new THREE.Scene();
    
    // Add  a camera so we can view the scene. Three js uses these values to create a projection matrix.
    camera = new THREE.PerspectiveCamera( 45, canvas.width / canvas.height, 1, 40 );
    camera.position.set(0, 2, -8);
    scene.add(camera);

    //initiate orbitcontroller
    orbitControls = new THREE.OrbitControls(camera, renderer.domElement);

    // Add light
    // Add a directional light to show off the object
    let directionalLight = new THREE.DirectionalLight( 0xffffff, 1);
    directionalLight.position.set(0, 1, 2);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    load_ghost();
    /*
    Portals = new THREE.Object3D();

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
    
    position = new THREE.Vector3( 0, 0, 0 );

    ghost = new Ghost(cube, position, 2);

    scene.add(ghost.Object3D);
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