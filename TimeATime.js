
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

    constructor(Object3D)
    {
        this.Object3D = Object3D;
    }
    
    load3dModel(objModelUrl, mtlModelUrl)
    {
        mtlLoader = new THREE.MTLLoader();

        mtlLoader.load(mtlModelUrl, materials =>{
            
            materials.preload();
            console.log(materials);

            objLoader = new THREE.OBJLoader();
            
            objLoader.setMaterials(materials);

            objLoader.load(objModelUrl, object=>{
                objectList.push(object);
                object.position.y = 0;
                object.scale.set(0.2, 0.2, 0.2);
                scene.add(object);
            });
        });
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
        // console.log(world.contacts)
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
mtlLoader = null,
objLoader = null,
objectList = [],
orbitControls = null;
canvas = null;
player = null; //Object for the player
playerBody = null; //Object for the cannon body of the player
world = null; //Object for the cannon world
sphereShape = null;
physicsMaterial = null;
testPortal = null;
testPortalBody = null;

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
    //The position of the player character needs to be the same as the position of their cannon body
    testPortal.position.copy(testPortalBody.position);

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
    ground.position.set(1,-1,0);
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
    // physicsMaterial = new CANNON.Material();
    // var physicsContactMaterial = new CANNON.ContactMaterial(physicsMaterial,
    //                                                         physicsMaterial,
    //                                                         0.0, // friction coefficient
    //                                                         0.3  // restitution
    //                                                         );
    // We must add the contact materials to the world
    // world.addContactMaterial(physicsContactMaterial);

    // Create a plane for the floor
    //Create a shape
    var groundShape = new CANNON.Box(new CANNON.Vec3(5, 5, 1));
    //Create a cannon body without mass
    var groundBody = new CANNON.Body({ mass: 0 });
    //Add the shape to the body
    groundBody.addShape(groundShape);
    //Set the position and rotation of the body
    groundBody.position.set(1, -1, 0);
    groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),-Math.PI/2);
    // groundBody.addEventListener("collide",function(e){

    //     console.log("COOOOLLISSION", e);
        
    //     // if(e.body.id == 0){
    //     //     console.log("The sphere just collided with the ground!");
    //     //     player.canJump = true;
    //     // }
    // });
    //Add it to the world
    world.addBody(groundBody);
}


function load_ghost()
{
    /*
    let box_geometry = new THREE.BoxGeometry(1, 1, 1);
    let material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
    
    let playerMesh = new THREE.Mesh(box_geometry, material);
    */
    
    //3Dobject that holds the ghost_mesh
    root = new THREE.Object3D;

    ghost = new Ghost(root);
    //load ghost object
    let objModelUrl = "models/obj/Ghost_obj/Ghost.obj";
    let mtlModelUrl = "models/obj/Ghost_obj/Ghost.mtl";
    
    ghost.load3dModel(objModelUrl, mtlModelUrl);
   
    scene.add(ghost.Object3D)


    //TEST
    //Create cannon body
    var halfExtents = new CANNON.Vec3(1,0,0);
    var boxShape = new CANNON.Box(halfExtents);
    playerBody = new CANNON.Body({ mass: 5 });
    playerBody.addShape(boxShape);

    //Create player object
    player = new Player(playerMesh, playerBody, 0.1);

    playerBody.position.set( 0, 0, 0 );
    playerMesh.position.set( 0, 0, 0 );

    world.addBody(player.body);
    scene.add(player.mesh);

    player.body.addEventListener("collide",function(e){
        console.log("EEEEEEEEEEEEEEE",  e)  
        if(e.body.id == 0){
            console.log("The sphere just collided with the ground!", e);
            player.canJump = true;
        } else {
            console.log("COLLIDED WITH ANOTHER THING")
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

    //Create cannon body
    // var halfExtents = new CANNON.Vec3( 0, 1, 0 );
    // var boxShape = new CANNON.Box(halfExtents);
    // portalBody = new CANNON.Body({ mass: 5 });
    // portalBody.addShape(boxShape);

    // portalBody.position.set( 3, 3, 0 );

    let portal = new THREE.Mesh(geometry, material);
    portal.position.set( 3, 3, 0 );
    portal.rotation.x = Math.PI/1.7;

    addPhysicalBody(portal, {mass: 1});

    // world.addBody(portalBody);
    scene.add(portal);

    testPortal = portal;
    // testPortalBody = portalBody;
    
    // portalBody.addEventListener("collide",function(e){

    //     console.log("PORTAL COLLISION", e);
        
    //     // if(e.body.id == 0){
    //     //     console.log("The sphere just collided with the ground!", e);
    //     //     player.canJump = true;
    //     // }
    // });

}

addPhysicalBody = function (mesh, bodyOptions) {
    var shape;
    // create a Sphere shape for spheres and thorus knots,
    // a Box shape otherwise
    if (mesh.geometry.type === 'SphereGeometry' ||
    mesh.geometry.type === 'ThorusKnotGeometry') {
        mesh.geometry.computeBoundingSphere();
        shape = new CANNON.Sphere(mesh.geometry.boundingSphere.radius);
    }
    else {
        mesh.geometry.computeBoundingBox();
        var box = mesh.geometry.boundingBox;
        shape = new CANNON.Box(new CANNON.Vec3(
            (box.max.x - box.min.x) / 2,
            (box.max.y - box.min.y) / 2,
            (box.max.z - box.min.z) / 2
        ));
    }

    var body = new CANNON.Body(bodyOptions);
    testPortalBody = body;
    body.addShape(shape);
    body.position.copy(mesh.position);
    body.computeAABB();
    // disable collision response so objects don't move when they collide
    // against each other
    body.collisionResponse = true;
    // keep a reference to the mesh so we can update its properties later
    body.mesh = mesh;

    // body.name = "Cuerpo fisico";

    this.world.addBody(body);

    return body;
};
