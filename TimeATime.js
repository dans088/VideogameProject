
//Movement keys (Controls for the game)
let keysDown = {
    "a":false,
    "d":false,
    "ArrowLeft":false,
    "ArrowRight":false,
    "Space":false
};

//Class for the character that the player controls
class Player
{
    constructor(mesh, body, speed = 0.1)
    {
        this.mesh = mesh;
        this.body = body;
        this.speed = speed;
        this.canJump = true;
    }

    async load_model(objModeUrl)
    {
    
    }

    //Move position of the player to the left
    moveLeft()
    {
        this.body.position.x -= this.speed;
    }

    //Move position of the player to the right
    moveRight()
    {
        this.body.position.x += this.speed;
    }

    //Add velocity in 'y' to the player so they jump
    jump(){
        this.body.velocity.y += 20;
    }

    //The player character is updated according to the keys that the player is pressing
    update(){
        if(keysDown["a"] || keysDown["ArrowLeft"])
            this.moveLeft();
        if(keysDown["d"] || keysDown["ArrowRight"])
            this.moveRight();
        if(keysDown["Space"]){
            //If the player is not currently jumping
            if(this.canJump){
                this.jump();
                this.canJump = false;
            }
        }
    }
}

let renderer = null,    // Object in charge of drawing a scene
scene = null,           
camera = null,
uniforms = null,
orbitControls = null;
canvas = null;
player = null; //Object for the player
playerBody = null; //Object for the cannon body of the player
world = null; //Object for the cannon world
sphereShape = null;
physicsMaterial = null;

let duration = 5000; // ms
let currentTime = Date.now();

//Listeners for the movement of the player
function keyEvents(){

    document.addEventListener("keyup", event=>{
        keysDown[event.code] = false;
    });
       
    document.addEventListener("keydown", event=>{
        keysDown[event.code] = true;  
    }); 
} 

//Promise to load the 3d object
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

//Animate function
function animate() 
{
    let now = Date.now();
    let deltat = now - currentTime;
    currentTime = now;
    let fract = deltat / duration;
   
    //uniforms.time.value += fract;

    world.step(1/60);

}

//Run function
function run() {

    requestAnimationFrame(function() { run(); });
    
    // Render the scene
    renderer.render( scene, camera );

    //Update the player character
    player.update();
    //The position of the player character needs to be the same as the position of their cannon body
    player.mesh.position.copy(playerBody.position);

    // Spin
    animate();

}

//Function that creates the scene
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

    //Activate the key listeners
    keyEvents();

    //Create the player character
    load_ghost();

    //Create a pivot and add it to the mesh of the player
    pivot = new THREE.Object3D;
    player.mesh.add(pivot);

    // Add  a camera so we can view the scene
    camera = new THREE.PerspectiveCamera( 45, canvas.width / canvas.height, 1, 4000 );
    camera.position.set(0, 2, 10);
    //Add the camera to the pivot so it follows the player
    pivot.add(camera);

    /* Cannon test */

    // Create a plane for the floor
    let PlaneGeometry = new THREE.PlaneGeometry(10,10,15,15);
    let material = new THREE.MeshBasicMaterial( {color: 0xffffff} );
    let ground = new THREE.Mesh(PlaneGeometry, material);
    ground.rotation.x = -Math.PI / 2;
    ground.position.set(1,-2,0);
    scene.add(ground);

    /*
    Portals = new THREE.mesh();

    create_portal();

    scene.add(Portals);

    */

}

//Attempt #1
//Function to innit the physics engine
function innitCannon(){
    world = new CANNON.World();
    world.quatNormalizeSkip = 0;
    world.quatNormalizeFast = false;

    var solver = new CANNON.GSSolver();

    world.defaultContactMaterial.contactEquationStiffness = 1e9;
    world.defaultContactMaterial.contactEquationRelaxation = 4;

    solver.iterations = 7;
    solver.tolerance = 0.1;
    var split = true;
    if(split)
        world.solver = new CANNON.SplitSolver(solver);
    else
        world.solver = solver;

    world.gravity.set(0,-9.81,0);
    world.broadphase = new CANNON.NaiveBroadphase();

    // Create a slippery material (friction coefficient = 0.0)
    physicsMaterial = new CANNON.Material();
    var physicsContactMaterial = new CANNON.ContactMaterial(physicsMaterial,
                                                            physicsMaterial,
                                                            0.0, // friction coefficient
                                                            0.3  // restitution
                                                            );
    // We must add the contact materials to the world
    world.addContactMaterial(physicsContactMaterial);

    // Create a plane for the floor
    //Create a shape
    var groundShape = new CANNON.Box(new CANNON.Vec3(5, 5, 1));
    //Create a cannon body without mass
    var groundBody = new CANNON.Body({ mass: 0 });
    //Add the shape to the body
    groundBody.addShape(groundShape);
    //Set the position and rotation of the body
    groundBody.position.set(1, -2.5, 0);
    groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),-Math.PI/2);
    //Add it to the world
    world.addBody(groundBody);
}


function load_ghost()
{
    let box_geometry = new THREE.BoxGeometry(1, 1, 1);
    let material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
    
    let playerMesh = new THREE.Mesh(box_geometry, material);


    //TEST
    //Create cannon body
    var halfExtents = new CANNON.Vec3(0,0,0);
    var boxShape = new CANNON.Box(halfExtents);
    playerBody = new CANNON.Body({ mass: 5 });
    playerBody.addShape(boxShape);

    //Create player object
    player = new Player(playerMesh, playerBody, 0.1);

    playerBody.position.set( 0, 1, 0 );
    playerMesh.position.set( 0, 1, 0 );

    world.addBody(player.body);
    scene.add(player.mesh);

    player.body.addEventListener("collide",function(e){
        
        if(e.body.id == 0){
            console.log("The sphere just collided with the ground!");
            player.canJump = true;
        }
    });

   
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