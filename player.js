//Movement keys (Controls for the game)
let keysDown = {
    "KeyA":false,
    "KeyD":false,
    "ArrowLeft":false,
    "ArrowRight":false,
    "Space":false,
    "keyG" : false,
};

class Player // Player class (White Ghost)
{
    constructor() 
    {
        this.speed = 0.1;
        this.playerObject = null; // WIll contain the model
    }
    
    load3dModel(objModelUrl, mtlModelUrl) //Loads the material of the ghost 
    {
        mtlLoader = new THREE.MTLLoader();

        mtlLoader.load(mtlModelUrl, materials =>{ 
            
            materials.preload();

            objLoader = new THREE.OBJLoader();
            
            objLoader.setMaterials(materials);

            objLoader.load(objModelUrl, object=>{ // Configure attributes
                object.traverse( function ( child ) {
                    if ( child.isMesh ) {
                        child.castShadow = true;
                        child.receiveShadow = true;
                    }
                } );
                object.position.y = 0.5; // Move it up so it matches the body
                object.scale.set(0.5, 0.5, 0.5); //Make it half the size
                this.playerObject = object; // Save it on the player attribute
               
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
        this.body.velocity.y += 10;
    }
}

//Class for the character that the player controls
class Cube
{
    constructor(mesh, body, speed = 0.1)
    {
        this.mesh = mesh;
        this.body = body;
        this.speed = speed;
        this.canJump = true;
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
        if(this.body.velocity.y < 3){ // Make the jump always be greter than 3, 3 is to small
            this.body.velocity.y += 10;
        } else if (this.body.velocity.y > 3 && this.body.velocity.y < 7) { // 3 is to small but if we add 10 when it is 7 it will be too big so we add only 6
            this.body.velocity.y += 6;
        }
    }

    //The player character is updated according to the keys that the player is pressing
    update(){
        this.body.velocity.z = 0;
        if(keysDown["KeyA"] || keysDown["ArrowLeft"])
            this.moveLeft();
        if(keysDown["KeyD"] || keysDown["ArrowRight"])
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

function load_ghost() // Create ghost with all its prperties when calling the player function
{ 
    //Create player object
    player = new Player();

    //load ghost object
    let objModelUrl = "models/Ghost.obj";
    let mtlModelUrl = "models/Ghost.mtl";

    // Load White ghost figure
    player.load3dModel(objModelUrl, mtlModelUrl);

    // Create a mesh and body to control the movement
    let ghostGeometry = new THREE.BoxGeometry(1, 1, 1);
    let ghostMaterial = new THREE.MeshBasicMaterial( {color: 0xF145FF, opacity: 0.0} );
    let ghostMesh = new THREE.Mesh(ghostGeometry , ghostMaterial);
    //Create player object
    playerBody = addPhysicalBody(playerTag,ghostMesh, {mass: 1}, true)
    playerMesh = new Cube(ghostMesh, playerBody, 0.1);
    
    // Set position at the beginning of the game
    ghostMesh.position.set( 405, 1, 0 );  
    playerBody.position.set( 405, 1, 0 ); 

    playerMesh.body.addEventListener("collide",function(e){ // Add interaction when colliding with different objects

        // If the turtle is grabbed there has to be changes applied to the turtle as well that will change depending the portal it enters to 
        if(e.body.tag == portalTag) { // Use body.Tag instead of id
            //If key handler is true
            if(transporthandler){
                //Set it to false
                transporthandler = false;
                toggleSceneHandler();
                change_scene(scene); // Change part of the level, (Go to the past or future)
                playerBody.position.set( 206, 3, 0 );
                if(turtle.grabbed){
                    //Return to orginal size
                    turtleBody = addPhysicalBody(turtleTag,turtle.mesh, {mass: 1}, true);
                    turtleBody.position.copy(playerBody.position);
                    turtle.turtleObject.scale.set(0.007,0.007,0.007);
                }
            }
            
        } else if(e.body.tag == (portalTag+1)){
            //If key handler is true
            if(transporthandler){
                //Set it to false
                transporthandler = false;
                toggleSceneHandler();
                change_scene(scene);
                playerBody.position.set( 6, 3, 0 );
                if(turtle.grabbed){
                    
                    turtleBody = addPhysicalBody(turtleTag,turtle.mesh, {mass: 1}, true, true);
                    turtleBody.position.copy(playerBody.position);
                    turtle.turtleObject.scale.set(0.05,0.05,0.05);
                }
            }
        } else if(e.body.tag == (portalTag+2)){
            //If key handler is true
            if(transporthandler){
                //Set it to false
                transporthandler = false;
                toggleSceneHandler();
                change_scene(scene);
                playerBody.position.set( 63, 5, 0 );
                if(turtle.grabbed){
                    
                    turtleBody = addPhysicalBody(turtleTag,turtle.mesh, {mass: 1}, true, true);
                    turtleBody.position.copy(playerBody.position);
                    turtle.turtleObject.scale.set(0.05,0.05,0.05);
                }
            }
        }else if(e.body.tag == (portalTag+3)){ // Arriba
            //If key handler is true
            if(transporthandler){
                //Set it to false
                transporthandler = false;
                toggleSceneHandler();
                change_scene(scene);
                playerBody.position.set( 255, 3, 0 );
                if(turtle.grabbed){
                    //Return to orginal size
                    turtle.mesh.scale.x = 1; 
                    turtle.mesh.scale.y = 1;
                    turtle.mesh.scale.z = 1;
                    turtleBody = addPhysicalBody(turtleTag,turtle.mesh, {mass: 1}, true, true);
                    turtleBody.position.copy(playerBody.position);
                    turtle.turtleObject.scale.set(0.007,0.007,0.007);
                }
            }
        } 
        // In the next cases the player will not enter with a turtle
        else if(e.body.tag == (portalTag+4)){ //Level 2 First portal
            
            if(enemies.length == 0){
                create_enemies();
            }
            teleport({x: 393, y: 2.5, z: 0});
        }
        else if(e.body.tag == (portalTag+5)){ //Level 2 First portal
            teleport({x: 593, y: 31.3, z: 0});
        }
        else if(e.body.tag == (portalTag+6)){ //Portal with movement -> Third Portal First Part
            teleport({x: 460, y: 3, z: 0});
        }
        else if(e.body.tag == (portalTag+7)){ // First Portal Second part
            teleport({x: 395, y: 32, z: 0});
        }
        else if(e.body.tag == (portalTag+8)){ // Second Portal Second part
            teleport({x: 431, y: 20, z: 0});
        }
        else if(e.body.tag == (portalTag+9)){ // Second Portal Second part
            teleport({x: 431, y: 20, z: 0});
        }
        else if(e.body.tag == (portalTag+10)){ // Second Portal Second part
            teleport({x: 655, y: 12.8, z: 0});
        }
        else if(e.body.tag == (portalTag+11)){ 
            teleport({x: 465, y: 2.5, z: 0});
        }
        else if(e.body.tag == (portalTag+12)){ //WIN
            win();
        }
        else if(e.body.tag == levelGroundTag || e.body.tag == turtleTag){ // Th jump is activated when touching the ground or the turtle tags
            playerMesh.canJump = true;
            transporthandler = true;
        }

        //If the player touches an enemy or a lava drop, they die
        else if(e.body.tag >= 2000 || (e.body.tag >= 900 && e.body.tag <= 904) || e.body.tag==600) { // If it touches an object with any of these tags the player dies
            window.cancelAnimationFrame(request);
            death(); 
        }
    });
}

function teleport(position){ // Teleport player to new position (when touching a portal)
    //If key handler is true
    if(transporthandler){
        //Set it to false
        transporthandler = false;
        toggleSceneHandler(); // Change the scene (going to the past and future)
        change_scene(scene);
        playerBody.position.set(position.x, position.y, position.z );
    }
}

function teleport_with_turtle(position, meshScale, bodyScale){ // Teleport player and scale turtle 
    //If key handler is true
    if(transporthandler){
        //Set it to false
        transporthandler = false;
        toggleSceneHandler();
        change_scene(scene);
        playerBody.position.set( position.x, position.y, position.z );
        if(turtle.grabbed){
            //Return to orginal size
            turtle.mesh.scale.x = meshScale; 
            turtle.mesh.scale.y = meshScale;
            turtle.mesh.scale.z = meshScale;
            turtleBody = addPhysicalBody(turtleTag,turtle.mesh, {mass: 1}, true);
            turtleBody.position.copy(playerBody.position);
            turtle.turtleObject.scale.set(bodyScale, bodyScale, bodyScale);
        }
    }
}

//Function to use when the player dies
function death(){

    //RESET ALL OBJECTS IN THE GAME
    let canvas = document.getElementById("webglcanvas");
    canvas.width = 900; 
    canvas.height = 600;

    clearInterval(lava_interval); // Stop creating lava ellipses
    clearInterval(portal_interval); // Stop moving the portal

    //All elements from the scene are deleted
    while(scene.children.length > 0){ 
        scene.remove(scene.children[0]); 
    }
    scene = null;

    //All elements from the world are deleted
    while(world.bodies.length > 0){ 
        world.remove(world.bodies[0]); 
    }

    sceneHandler = false;

    // Clear arrays that save variables
    enemies = [];
    evil_ghosts = [];

    //Toggle the game over screen
    toggleGameOver();
}

//Function to use when the player wins
function win(){ // Same comments as the death method

    let canvas = document.getElementById("webglcanvas");
    canvas.width = 900; 
    canvas.height = 600;

    window.cancelAnimationFrame(request);
    clearInterval(lava_interval);
    clearInterval(portal_interval);

    //All elements from the scene are deleted
    while(scene.children.length > 0){ 
        scene.remove(scene.children[0]); 
    }
    scene = null;

    //All elements from the world are deleted
    while(world.bodies.length > 0){ 
        world.remove(world.bodies[0]); 
    }
    world=null;

    sceneHandler = false;

    enemies = [];
    evil_ghosts = [];

    //Toggle the game over screen
    toggleWin();
}