//Movement keys (Controls for the game)
let keysDown = {
    "KeyA":false,
    "KeyD":false,
    "ArrowLeft":false,
    "ArrowRight":false,
    "Space":false,
    "keyG" : false,
};

class Player
{
    constructor()
    {
        this.speed = 0.1;
        this.playerObject = null;
    }
    
    load3dModel(objModelUrl, mtlModelUrl)
    {
        mtlLoader = new THREE.MTLLoader();

        mtlLoader.load(mtlModelUrl, materials =>{
            
            materials.preload();
            //console.log(materials);

            objLoader = new THREE.OBJLoader();
            
            objLoader.setMaterials(materials);

            objLoader.load(objModelUrl, object=>{
                object.position.y = 0;
                object.rotation.y = Math.PI/2;
                object.scale.set(0.2, 0.2, 0.2);
                this.playerObject = object;
                //console.log("Player", this.playerObject);
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
        if(this.body.velocity.y < 3){
            this.body.velocity.y += 10;
        } else if (this.body.velocity.y > 3 && this.body.velocity.y < 7) {
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
        /*if(keysDown["KeyG"]){
            //If the player is not currently jumping
            if(!turtle.grabbed){
                turtle.grab();
            } else if (turtle.grabbed) {
                turtle.ungrab();
            }
        }*/
    }
}

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

function load_ghost()
{ 
    //Create player object
    player = new Player();

    //load ghost object
    let objModelUrl = "models/Ghost.obj";
    let mtlModelUrl = "models/Ghost.mtl";

    player.load3dModel(objModelUrl, mtlModelUrl);

    let ghostGeometry = new THREE.BoxGeometry(1, 1, 1);
    let ghostMaterial = new THREE.MeshBasicMaterial( {color: 0xF145FF, opacity: 0.0} );
    let ghostMesh = new THREE.Mesh(ghostGeometry , ghostMaterial);
    //Create player object
    testCubeBody = addPhysicalBody(playerTag,ghostMesh, {mass: 1}, true)
    testCube = new Cube(ghostMesh, testCubeBody, 0.1);
    
    ghostMesh.position.set( 0, 0, 0 );
    testCubeBody.position.set( 0, 0, 0 );

    testCube.body.addEventListener("collide",function(e){
        console.log("HOLAAAAAAAAAAAAAAAAAAAAAAAA", console.log(e.body.tag))
        if(e.body.tag == portalTag) { // Arriba Use body.Tag instead of id
            //If key handler is true
            if(transporthandler){
                //Set it to false
                transporthandler = false;
                toggleSceneHandler();
                change_scene(scene);
                testCubeBody.position.set( 206, 3, 0 );
                if(turtle.grabbed){
                    //Return to orginal size
                    turtle.mesh.scale.x = 1; 
                    turtle.mesh.scale.y = 1;
                    turtle.mesh.scale.z = 1;
                    turtleBody = addPhysicalBody(turtleTag,turtle.mesh, {mass: 1}, true);
                    turtleBody.position.copy(testCubeBody.position);
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
                testCubeBody.position.set( 6, 3, 0 );
                if(turtle.grabbed){
                    // Increase turtle size
                    turtle.mesh.scale.x = 5;
                    turtle.mesh.scale.y = 5;
                    turtle.mesh.scale.z = 5;
                    turtleBody = addPhysicalBody(turtleTag,turtle.mesh, {mass: 1}, true);
                    turtleBody.position.copy(testCubeBody.position);
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
                testCubeBody.position.set( 55, 3, 0 );
                if(turtle.grabbed){
                    // Increase turtle size
                    turtle.mesh.scale.x = 5;
                    turtle.mesh.scale.y = 5;
                    turtle.mesh.scale.z = 5; 
                    turtleBody = addPhysicalBody(turtleTag,turtle.mesh, {mass: 1}, true);
                    turtleBody.position.copy(testCubeBody.position);
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
                testCubeBody.position.set( 255, 3, 0 );
                if(turtle.grabbed){
                    //Return to orginal size
                    turtle.mesh.scale.x = 1; 
                    turtle.mesh.scale.y = 1;
                    turtle.mesh.scale.z = 1;
                    turtleBody = addPhysicalBody(turtleTag,turtle.mesh, {mass: 1}, true);
                    turtleBody.position.copy(testCubeBody.position);
                    turtle.turtleObject.scale.set(0.007,0.007,0.007);
                }
            }
        } else if(e.body.tag == levelGroundTag){
            testCube.canJump = true;
            transporthandler = true;
        }
    });

    scene.add(testCube.mesh);

}

//Function to use when the player dies
function death(){

    let canvas = document.getElementById("webglcanvas");
    canvas.width = 900; 
    canvas.height = 600;

    //color2 = new THREE.Color( 0x000000 );
    scene.background = null;
    scene.visibe = false;
    console.log(scene);

    //The renderer is cleared
    renderer.clear();

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

    //Toggle the game over screen
    toggleGameOver();
}