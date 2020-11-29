const playerTag = 0; //Tag for the player body
const turtleTag=3; //Tag for the turtle body
const portalTag=20; //Tag for the first portal body
const levelGroundTag=100; //Tag for all the ground bodies

let renderer = null, // Object in charge of drawing a scene
scene = null, //Scene for our project   
camera = null, //Camera for the scene
uniforms = null, //Shaders uniforms
uniformsArray = [], //Array for all the uniforms
mtlLoader = null, //MTL loader to load the 3d model materials
objLoader = null, //OBJ loader to load the 3d model
canvas = null; //Canvas for threejs
player = null; //Object for the player
playerMesh = null; // Object for the player mesh
playerBody = null; //Object for the cannon body of the player
world = null; //Object for the cannon world
request=null; //Request animation frame. To stop the run function (the next request) when the player dies or wins

let SHADOW_MAP_WIDTH = 4096, SHADOW_MAP_HEIGHT = 4096; //Shadow map sizes

//turtle
turtle = null; //turtle class
group = null; //Object for the turtle
turtleBody = null; //Object for the turtle cannon body

transporthandler = true; //Boolean to know if the player can teleport. It becomes false when the player goes through a portal and becomes true when they touch the ground
sceneHandler = false; //Boolean to change the scene background and to know at which side of the portals the player is
keyhandler = true; // Boolean to know when the player has pressed the 'G' key

let lava_interval = null; //Variable for the interval that makes lava appear randomly
let portal_interval = null; //Variable for the interval that makes the portal at the second level move

//Array to store all the level floor
level1Grounds = [];

//Array for the lava ellipses falling from the top in the second level
lava_ellipses = [];

enemies = []; // Array for the ghost enemies in the second level
evil_ghosts = []; //array for red ghosts models
enemiesMoveLeft = true; // Boolean to know the direction the ghost enemies must move. Enemies should move left or right

// Portal object and movement options across X and Y axis
moving_portal = {xMovement: "DontMove", yMovement: "DontMove", mesh: null, body: null, velocity: 0.1};

//Load background images
let futureUrl = "Images/future_texture.jpg";
let pastUrl = "Images/past_texture.jpg";
let futureTexture = new THREE.TextureLoader().load(futureUrl);
let pastTexture = new THREE.TextureLoader().load(pastUrl);

//Portal animation
let portalduration = 5000; // ms
let currentTime = Date.now();

let TurtleAnimator = null; //Keyframe por the turtle animation

//Function to change the scene background whenever the player enters a portal
function change_scene(scene)
{
    if(!sceneHandler){
        scene.background = futureTexture;
    }else{
        scene.background = pastTexture;
    }
}

//Function to change the value of the scene handler
function toggleSceneHandler()
{
    if(sceneHandler){
        sceneHandler = false;
    }else{
        sceneHandler = true;
    }
}

//Function to initiate the canvas for three js
function init(canvas) 
{
    //Make canvas full length of screen
    canvas.width = document.body.clientWidth; 
    canvas.height = document.body.clientHeight;
    //Save the values of the canvas dimensions
    canvasW = canvas.width;
    canvasH = canvas.height;
}

//Listeners for the movement of the player
function keyEvents(){

    //Listener that toggles the value of a key when the user stops holding it down
    document.addEventListener("keyup", event=>{
        keysDown[event.code] = false;

        //When user releases 'G' letter, the key handler is set to true
        if(event.code == "KeyG"){
            keyhandler = true;
        }

    });
       
    //Listener that toggles the value of a key when the user is holding it down
    document.addEventListener("keydown", event=>{
        keysDown[event.code] = true;  
    }); 

    //Listener for the grab action. It listens for the pressing of a key
    document.addEventListener("keypress", event=>{

        //If the key being pressed is the letter 'G'
        if(event.code == "KeyG"){

            //And if the key handler is true
            if(keyhandler){
                
                //Grab or ungrab the turtle
                if(turtle != null){
                    if(!turtle.grabbed){
                        turtle.grab();
                    }
                    else{
                        turtle.ungrab();
                    }
                }

                //Set the key handler to false
                keyhandler = false;    
            }
        }
    }); 
} 

//Animate function
function animate() 
{
    //Calculate the current time using the now() function
    let now = Date.now();
    let deltat = now - currentTime;
    currentTime = now;
    //Calculate the duration for the portal animation
    let fract = deltat / portalduration;
    //Animate the portal
    uniformsArray.forEach(uniforms => {
        uniforms.time.value += fract;
    });

    //Update the world physics
    world.step(1/60);
}

//Run function
function run() {

    //Request a new animation frame after this run() iteration
    request = requestAnimationFrame(function() { run(); });
    
    //Render the scene after the camera is created
    if(camera != null){
        renderer.render( scene, camera );
    }

    //Update the player character
    playerMesh.update();

    //If the turtle has been created
    if(group!=null){
        //And the player hasn't grabbed it
        if(!turtle.animations){
            //Play the turtle keyframe's animation
            playAnimations();
            turtle.animations=true;
        }
    }

    //If the player has been created
    if(player.playerObject != null){

        //If the player moves too fast upwards, stop their velocity
        if(playerBody.velocity.y >15){
            playerBody.velocity.y = 0.1;
        }

        //Make the camera look at the player
        camera.lookAt(player.playerObject.position);
        //And the camera follows the player at the x coordinate
        camera.position.x = player.playerObject.position.x;
        //The position of the player character needs to be the same as the position of their cannon body. To follow the physics of the world
        player.playerObject.position.copy(playerBody.position);
        //Increase the position of the player character so it doesn't clip with the ground
        player.playerObject.position.y += 1;
        //The position of the player mesh needs to be the same as the position of their cannon body
        playerMesh.mesh.position.copy(playerBody.position);

        //If the player has fallen from the map
        if(player.playerObject.position.y < -5){
            //The player dies and the game over screen appears
            this.death();
            //The next request animation frame is cancelled
            window.cancelAnimationFrame(request);
            //The function ends
            return;
        }

        //If the ghost enemies have been created
        // Move enemy ghosts left or right 
        if(enemies.length > 0){ 

            // If the right most enemy is to the left of the player or if the enemies collide with wall
            if(enemies[0].body.position.x < 598 || (enemies[enemies.length -1].body.position.x + 5 < player.playerObject.position.x && enemiesMoveLeft == true)){
                //Make the enemies move right
                enemiesMoveLeft = false;
            // If the left most enemy is to the right of the player or if the enemies collide with wall
            } else if (enemies[enemies.length -1].body.position.x > 668 || (enemies[0].body.position.x - 5 > player.playerObject.position.x && enemiesMoveLeft == false)){
                //Make the enemies move left
                enemiesMoveLeft = true;
            }

            //Movement of the enemies
            enemies.forEach(enemy => {
                //Move them to the left
                if(enemiesMoveLeft){
                    enemy.body.position.x -= 0.04;
                } 
                //Move them to the right
                else {
                    enemy.body.position.x += 0.04;
                }
                //The mesh copies the position of the cannon body
                enemy.mesh.position.copy(enemy.body.position);
            })

            //If all the 3d models for the ghost enemies have been loaded
            if(evil_ghosts.length == 3){
                //For each of the enemies
                evil_ghosts.forEach((enemy, index) => {
                    //The model copies the position of the enemy bodie
                    enemy.position.copy(enemies[index].body.position);
                    //And move the model upwards so it doesn't clip with the floor
                    enemy.position.y += 1;
                })
            }
        }
    }
    
    //If the turtle has been created
    if(turtle != null && turtle.turtleObject != null){
        
        //Stop its velocity in 'z' so it only moves in the 'x' and 'y' coordinate
        turtle.body.velocity.z = 0;
        //Calculate the distance from the turtle to the player
        distance = Math.abs(turtleBody.position.x - playerBody.position.x);

        // Update the animations
        if(!turtle.grabAnimations){
            //Call the keyframe update
            KF.update();
        }

        //If the turtle has been grabbed and the player is to the left
        if(turtle.grabbed && turtleBody.position.x > playerBody.position.x && distance < 3){
            //Toogle the player grab animations boolean
            turtle.grabAnimations=true;
            //If the player is in the past
            if(sceneHandler){
                //Move the turtle to the right of the player
                turtleBody.position.x = playerBody.position.x + 1.5;
                turtleBody.position.y = playerBody.position.y;
                turtleBody.position.z = playerBody.position.z;
            }
            //If the player is in the future
            if(!sceneHandler){
                //Move the turtle below the player
                turtleBody.position.x = playerBody.position.x + 1;
                turtleBody.position.y = playerBody.position.y - 3;
                turtleBody.position.z = playerBody.position.z;
            }
        } 
        //If the turtle has been grabbed and the player is to the right
        else if (turtle.grabbed && turtleBody.position.x < playerBody.position.x && distance < 3){
            //Toogle the player grab animations boolean
            turtle. grabAnimations=true;
            //If the player is in the past
            if(sceneHandler){
                //Move the turtle to the left of the player
                turtleBody.position.x = playerBody.position.x - 1.5;
                turtleBody.position.y = playerBody.position.y;
                turtleBody.position.z = playerBody.position.z;
            }
            //If the player is in the future
            if(!sceneHandler){
                //Move the turtle below the player
                turtleBody.position.x = playerBody.position.x + 1;
                turtleBody.position.y = playerBody.position.y - 3;
                turtleBody.position.z = playerBody.position.z;
            }
   
        }

        //The position of the turtle model needs to be the same as the position of their cannon body
        group.position.copy(turtleBody.position);

        //If the player is in the past
        if(sceneHandler){
            //The turtle's model position is changed so it doesn0t clip the ground
            group.position.x -=1;
            group.position.y +=0.8;
        }
        //If the player is in the future
        if(!sceneHandler){
            //The turtle's model position is changed so it doesn0t clip the ground
            group.position.x -=1;
            group.position.y -=1;
        }
        
        //The position of the turtle mesh needs to be the same as the position of their cannon body
        turtle.mesh.position.copy(turtleBody.position);
        
    }

    // Attach lava ellipses mesh to body
    if(lava_ellipses.length > 0){
        lava_ellipses.forEach(lava_ellipse => {
            lava_ellipse.lava_object.mesh.position.copy(lava_ellipse.lava_object.body.position);
            lava_ellipse.lava_light.position.copy(lava_ellipse.lava_object.mesh.position); // Attach lava to its mesh
        })
    }

    //If the moving portal has been created
    if(moving_portal.body != null){ 
        //Copy its body position to the mesh
        moving_portal.mesh.position.copy(moving_portal.body.position);

        // Move portal randomly across x and y axis 
        
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

        //Move the portal in the 'x' coordinate accordingly
        if(moving_portal.xMovement == "DontMove"){
            moving_portal.body.position.x += 0;
        } else if(moving_portal.xMovement == "MoveLeft"){
            moving_portal.body.position.x -= moving_portal.velocity;
        } else if(moving_portal.xMovement == "MoveRight"){
            moving_portal.body.position.x += moving_portal.velocity;
        }

        //Move the portal in the 'y' coordinate accordingly
        if(moving_portal.yMovement == "DontMove"){
            moving_portal.body.position.y += 0;
        } else if(moving_portal.yMovement == "MoveDown"){
            moving_portal.body.position.y -= moving_portal.velocity;
        } else if(moving_portal.yMovement == "MoveUp"){
            moving_portal.body.position.y += moving_portal.velocity;
        }
    }

    // Call the animate function
    animate();
}

//In case of error, print the error
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

    //Add the image background to the scene
    change_scene(scene);

    // Create a directional light
    let directionalLight = new THREE.DirectionalLight( 0xffffff, 1);
    directionalLight.position.set(0, 1, 2);
    //Make it cast shadows
    directionalLight.castShadow = true;
    //Set the map size for the shadows
    directionalLight.shadow.mapSize.width = SHADOW_MAP_WIDTH;
    directionalLight.shadow.mapSize.height = SHADOW_MAP_HEIGHT;
    //Add the light to the scene
    scene.add(directionalLight);

    //Activate the key listeners
    keyEvents();

    // Add  a camera 
    camera = new THREE.PerspectiveCamera( 45, canvas.width / canvas.height, 1, 1000 );
    camera.position.set(0, 10, 50);    
   
    //Create the player character
    await load_ghost();

    //Create turtle character
    await load_turtle();

    //turtle animation time in seconds
    duration = 10;

    //Load the map
    load_map();

    //Activate the lava interval
    lava_interval = setInterval(create_lava, 5000)
    
    //Activate the portal interval
    portal_interval = setInterval(create_portal_movement, 3000)
    
    //Create the portals
    create_portals();
    
}


