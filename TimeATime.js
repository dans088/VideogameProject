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

//Load background images
let futureUrl = "Images/future_texture.jpg";
let pastUrl = "Images/past_texture.jpg";
let futureTexture = new THREE.TextureLoader().load(futureUrl);
let pastTexture = new THREE.TextureLoader().load(pastUrl);


//Materials to be used on meshes
materials = {
    shadow: new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 0.5
    }),
    solid: new THREE.MeshNormalMaterial({}),
    colliding: new THREE.MeshBasicMaterial({
        color: 0xff0000,
        transparent: true,
        opacity: 0.5
    }),
    dot: new THREE.MeshBasicMaterial({
        color: 0x0000ff
    }),
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
    })
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
    camera.position.set(0, 0, 30);    

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
}



// let uno = [0, 6, 12]
// let lai = 0;

// function body2mesh(body, wireframe) {
//     console.log("CALCULANDO")
//     var wireframe = wireframe || true;
//     var obj = new THREE.Object3D();
  
//     for (var l = 0; l < body.shapes.length; l++) {
//       var shape = body.shapes[l];
  
//       var mesh;
  
//       switch(shape.type){
  
//       case CANNON.Shape.types.SPHERE:
//         var sphere_geometry = new THREE.SphereGeometry( shape.radius, 8, 8);
//         mesh = new THREE.Mesh( sphere_geometry, this.currentMaterial );
//         break;
  
//       case CANNON.Shape.types.PARTICLE:
//         mesh = new THREE.Mesh( this.particleGeo, this.particleMaterial );
//         var s = this.settings;
//         mesh.scale.set(s.particleSize,s.particleSize,s.particleSize);
//         break;
  
//       case CANNON.Shape.types.PLANE:
//         var geometry = new THREE.PlaneGeometry(10, 10, 4, 4);
//         mesh = new THREE.Object3D();
//         var submesh = new THREE.Object3D();
//         var ground = new THREE.Mesh( geometry, this.currentMaterial );
//         ground.scale.set(100, 100, 100);
//         submesh.add(ground);
  
//         ground.castShadow = true;
//         ground.receiveShadow = true;
  
//         mesh.add(submesh);
//         break;
  
//       case CANNON.Shape.types.BOX:
//         var box_geometry = new THREE.BoxGeometry(  shape.halfExtents.x*2,
//                               shape.halfExtents.y*2,
//                               shape.halfExtents.z*2 );
//         mesh = new THREE.Mesh( box_geometry, this.currentMaterial );
//         break;
  
//       case CANNON.Shape.types.CONVEXPOLYHEDRON:
//         var geo = new THREE.Geometry();
  
//         // Add vertices
//         for (var i = 0; i < shape.vertices.length; i++) {
//           var v = shape.vertices[i];
//           geo.vertices.push(new THREE.Vector3(v.x, v.y, v.z));
//         }
  
//         for(var i=0; i < shape.faces.length; i++){
//           var face = shape.faces[i];
  
//           // add triangles
//           var a = face[0];
//           for (var j = 1; j < face.length - 1; j++) {
//             var b = face[j];
//             var c = face[j + 1];
//             geo.faces.push(new THREE.Face3(a, b, c));
//           }
//         }
//         geo.computeBoundingSphere();
//         geo.computeFaceNormals();
//         mesh = new THREE.Mesh( geo, this.currentMaterial );
//         break;
  
//       case CANNON.Shape.types.HEIGHTFIELD:
//         var geometry = new THREE.Geometry();
  
//         var v0 = new CANNON.Vec3();
//         var v1 = new CANNON.Vec3();
//         var v2 = new CANNON.Vec3();
//         for (var xi = 0; xi < shape.data.length - 1; xi++) {
//           for (var yi = 0; yi < shape.data[xi].length - 1; yi++) {
//             for (var k = 0; k < 2; k++) {
//               shape.getConvexTrianglePillar(xi, yi, k===0);
//               v0.copy(shape.pillarConvex.vertices[0]);
//               v1.copy(shape.pillarConvex.vertices[1]);
//               v2.copy(shape.pillarConvex.vertices[2]);
//               v0.vadd(shape.pillarOffset, v0);
//               v1.vadd(shape.pillarOffset, v1);
//               v2.vadd(shape.pillarOffset, v2);
//               geometry.vertices.push(
//                 new THREE.Vector3(v0.x, v0.y, v0.z),
//                 new THREE.Vector3(v1.x, v1.y, v1.z),
//                 new THREE.Vector3(v2.x, v2.y, v2.z)
//               );
//               var i = geometry.vertices.length - 3;
//               geometry.faces.push(new THREE.Face3(i, i+1, i+2));
//             }
//           }
//         }
//         geometry.computeBoundingSphere();
//         geometry.computeFaceNormals();
//         mesh = new THREE.Mesh(geometry, this.currentMaterial);
//         break;
  
//       case CANNON.Shape.types.TRIMESH:
//         var geometry = new THREE.Geometry();
  
//         var v0 = new CANNON.Vec3();
//         var v1 = new CANNON.Vec3();
//         var v2 = new CANNON.Vec3();
//         for (var i = 0; i < shape.indices.length / 3; i++) {
//           shape.getTriangleVertices(i, v0, v1, v2);
//           geometry.vertices.push(
//             new THREE.Vector3(v0.x, v0.y, v0.z),
//             new THREE.Vector3(v1.x, v1.y, v1.z),
//             new THREE.Vector3(v2.x, v2.y, v2.z)
//           );
//           var j = geometry.vertices.length - 3;
//           geometry.faces.push(new THREE.Face3(j, j+1, j+2));
//         }
//         geometry.computeBoundingSphere();
//         geometry.computeFaceNormals();
//         mesh = new THREE.Mesh(geometry, this.currentMaterial);
//         break;
  
//       default:
//         throw "Visual type not recognized: "+shape.type;
//       }
  
//       mesh.receiveShadow = true;
//       mesh.castShadow = true;
//       if(mesh.children){
//         for(var i=0; i<mesh.children.length; i++){
//           mesh.children[i].castShadow = true;
//           mesh.children[i].receiveShadow = true;
//           if(mesh.children[i]){
//             for(var j=0; j<mesh.children[i].length; j++){
//               mesh.children[i].children[j].castShadow = true;
//               mesh.children[i].children[j].receiveShadow = true;
//             }
//           }
//         }
//       }
  
//       var o = body.shapeOffsets[l];
//       var q = body.shapeOrientations[l];
//       mesh.position.set(3, 1  , 0);
//       mesh.quaternion.set(q.x, q.y, q.z, q.w);
  
//       obj.add(mesh);
//     }

//     lai++;
//     scene.add(obj)
  
//     return obj;
//    };
