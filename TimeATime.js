const playerTag = 0;
const turtleTag=3;
const portalTag=20; //First portal
const levelGroundTag=100; //All the ground objects

let renderer = null,    // Object in charge of drawing a scene
scene = null,           
camera = null,
uniforms = null,
mtlLoader = null,
objLoader = null,
canvas = null;
player = null; //Object for the player
playerBody = null; //Object for the cannon body of the player
world = null; //Object for the cannon world
sphereShape = null;
physicsMaterial = null;
//Test moving cube
testCube = null;
testCubeBody = null;
//turtle
turtle = null; //turtle model
group = null; //Object for the turtle
turtleBody = null;
transporthandler = true;
sceneHandler = false; //boolean to change scene background

//Level 1 Ground 1
level1Grounds = [];

//Lava ellipses falling from top in second level array
lava_ellipses = [];

// Save enemies of second level, second part
enemies = [];
enemiesMoveLeft = true; // Enemies should move left or right

// Portal object and movement options across X and Y axis
moving_portal = {xMovement: "DontMove", yMovement: "DontMove", mesh: null, body: null, velocity: 0.1};

//Load background images
let futureUrl = "Images/future_texture.jpg";
let pastUrl = "Images/past_texture.jpg";
let futureTexture = new THREE.TextureLoader().load(futureUrl);
let pastTexture = new THREE.TextureLoader().load(pastUrl);


//Materials to be used on meshes
materials = {
    level1: new THREE.MeshBasicMaterial({
        color: 0x00ff00
    }),
    water: new THREE.MeshBasicMaterial({
        color: 0x33DEF9
    }),
    orange: new THREE.MeshBasicMaterial({
        color: 0xFFB841
    }),
    blue: new THREE.MeshBasicMaterial({
        color: 0x5BA7D3
    }),
    purple: new THREE.MeshBasicMaterial({
        color: 0xA071F1
    }),
    red: new THREE.MeshBasicMaterial({
        color: 0xCE1343
    }),
    light_blue: new THREE.MeshBasicMaterial({
        color: 0x53C3D3
    }),
};

let duration = 5000; // ms
let currentTime = Date.now();

let TurtleAnimator = null;

function change_scene(scene)
{
    if(!sceneHandler){
        scene.background = futureTexture;
    }else{
        scene.background = pastTexture;
    }
}

function toggleSceneHandler()
{
    if(sceneHandler){
        sceneHandler = false;
    }else{
        sceneHandler = true;
    }
}


function init(canvas) //Make canvas full length of screen
{
    canvas.width = document.body.clientWidth; 
    canvas.height = document.body.clientHeight;
    canvasW = canvas.width;
    canvasH = canvas.height;
}

//Listeners for the movement of the player
function keyEvents(){

    var keyhandler = true;

    document.addEventListener("keyup", event=>{
        keysDown[event.code] = false;

        //When user releases 'G' letter, the key handler is set to true
        if(event.code == "KeyG"){
            keyhandler = true;
        }

    });
       
    document.addEventListener("keydown", event=>{
        keysDown[event.code] = true;  
    }); 

    document.addEventListener("keypress", event=>{

        if(event.code == "KeyG"){

            //If key handler is true
            if(keyhandler){

                //Set it to false
                keyhandler = false;
                
                //Grab or ungrab the turtle
                if(turtle != null){
                    if(!turtle.grabbed){
                        turtle.grab();
                    }
                    else{
                        turtle.ungrab();
                    }
                }
                
            }
        }

        
    }); 
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

    // console.log(world.contacts);
    //console.log(testCube.canJump)

    world.contacts.forEach(function (contact) {
        // console.log(contact);
        // console.log("BI", contact.bi.id)
        // console.log("BJ", contact.bj.id)
        // if(contact.bi.id == 2 ){
        //     player.body.position.set(17,1,0)
        // }
        // if (contact.bi.id == 1){
        //     console.log("Bi: 11111111111111111111")
        // } else if (contact.bi.id == 2){
        //     console.log("Bi: 222222222222222222")
        // } else if (contact.bi.id == 0){
        //     console.log("Bi: 000000000000000000")
        // } else if (contact.bi.id == 3){
        //     console.log("Bi: 333333333333333")
        // } else if (contact.bi.id == 4){
        //     console.log("Bi: 4444444444444444444")
        // } 
        
    })

}

//Run function
function run() {

    let request = requestAnimationFrame(function() { run(); });
    
    if(camera != null){
        // Render the scene
        renderer.render( scene, camera );
    }

    //Update the player character
    testCube.update();

    if(group!=null){
        if(!turtle.animations){
            playAnimations();
            turtle.animations=true;
        }
    }

    if(player.playerObject != null){
        //make camera follow the player
        camera.lookAt(player.playerObject.position);
        camera.position.x = player.playerObject.position.x;
        //The position of the player character needs to be the same as the position of their cannon body
        player.playerObject.position.copy(testCubeBody.position);
        //The position of the player character needs to be the same as the position of their cannon body
        testCube.mesh.position.copy(testCubeBody.position);

        //If the player has fallen from the map
        if(player.playerObject.position.y < -5){
            //The player dies and the game over screen appears
            this.death();
            //The next request animation frame is cancelled
            window.cancelAnimationFrame(request);
            //The function ends
            return;
        }

        // Move enemy ghosts left or right and attach mesh to body
        if(enemies.length > 0){
            if(enemies[0].body.position.x < 598 || 
                (enemies[enemies.length -1].body.position.x + 5 < player.playerObject.position.x && enemiesMoveLeft == true)
                ){
                enemiesMoveLeft = false;
            } else if (enemies[enemies.length -1].body.position.x > 668 ||
                        (enemies[0].body.position.x - 5 > player.playerObject.position.x && enemiesMoveLeft == false)
                        ){
                enemiesMoveLeft = true;
            }
            enemies.forEach(enemy => {
                if(enemiesMoveLeft){
                    enemy.body.position.x -= 0.04;
                } else {
                    enemy.body.position.x += 0.04;
                }
                enemy.mesh.position.copy(enemy.body.position);
            })
        }
    }
    

    if(turtle != null && turtle.turtleObject != null){
        // Update the animations

        turtle.body.velocity.z = 0;
        distance = Math.abs(turtleBody.position.x - testCubeBody.position.x);

        if(!turtle.grabAnimations){
            KF.update();
        }

        if(turtle.grabbed && turtleBody.position.x > testCubeBody.position.x && distance < 3){
            turtle.grabAnimations=true;

            turtleBody.position.x = testCubeBody.position.x + 1.5;
            turtleBody.position.y = testCubeBody.position.y;
            turtleBody.position.z = testCubeBody.position.z;

        } else if (turtle.grabbed && turtleBody.position.x < testCubeBody.position.x && distance < 3){
            turtle. grabAnimations=true;

            turtleBody.position.x = testCubeBody.position.x - 1.5;
            turtleBody.position.y = testCubeBody.position.y;
            turtleBody.position.z = testCubeBody.position.z;

            
        }

        //The position of the player character needs to be the same as the position of their cannon body
        group.position.copy(turtleBody.position);
        group.position.x -=1;
        group.position.y +=0.8;
        //The position of the player character needs to be the same as the position of their cannon body
        turtle.mesh.position.copy(turtleBody.position);
        
    }

    // Attach lava ellipses mesh to body
    if(lava_ellipses.length > 0){
        lava_ellipses.forEach(ellipse => {
            ellipse.mesh.position.copy(ellipse.body.position);
        })
    }

    if(moving_portal.body != null){ // Move portal randomly across x and y axis 
        moving_portal.mesh.position.copy(moving_portal.body.position);

        // Check that portal stay in x plane boundaries
        if(moving_portal.body.position.x > 439) {
            moving_portal.xMovement = "MoveLeft";
        } else if(moving_portal.body.position.x < 425) {
            moving_portal.xMovement = "MoveRight";
        }
        // Check that portal stay in y plane boundaries
        if(moving_portal.body.position.y > 29) {
            moving_portal.yMovement = "MoveDown";
        } else if(moving_portal.body.position.y < 10) {
            moving_portal.yMovement = "MoveUp";
        }

        if(moving_portal.xMovement == "DontMove"){
            moving_portal.body.position.x += 0;
        } else if(moving_portal.xMovement == "MoveLeft"){
            moving_portal.body.position.x -= moving_portal.velocity;
        } else if(moving_portal.xMovement == "MoveRight"){
            moving_portal.body.position.x += moving_portal.velocity;
        }

        if(moving_portal.yMovement == "DontMove"){
            moving_portal.body.position.y += 0;
        } else if(moving_portal.yMovement == "MoveDown"){
            moving_portal.body.position.y -= moving_portal.velocity;
        } else if(moving_portal.yMovement == "MoveUp"){
            moving_portal.body.position.y += moving_portal.velocity;
        }
    }

    // Spin
    animate();

}

const onError = ( ( err ) => { console.error( err ); } );

//Function that creates the scene
async function scene_setup(canvas)
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

    change_scene(scene);

    // Add light
    // Add a directional light to show off the object
    let directionalLight = new THREE.DirectionalLight( 0xffffff, 1);
    directionalLight.position.set(0, 1, 2);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    //Activate the key listeners
    keyEvents();

    // Add  a camera so we can view the scene
    camera = new THREE.PerspectiveCamera( 45, canvas.width / canvas.height, 1, 1000 );
    camera.position.set(0, 20, 100);    
    // camera.position.set(0, 0, 30); 
    //Create the player character
    await load_ghost();

    //Create turtle character
    await load_turtle();

    //animation time in seconds
    duration = 10;

    //console.log("Turtle:", group);

    
    //Create planes for the floor 1st Level
    const groundGeometry1 = new THREE.BoxGeometry(10, 2, 5 );
    const materialG1 = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
    testGround = new THREE.Mesh( groundGeometry1, materialG1 );
    testGround.position.set(0,-2,0);

    load_map();
    create_portals();
    create_enemies();
}
