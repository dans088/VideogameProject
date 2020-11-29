class Enemy
{
    constructor(x, y, z)
    {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    async load3dModel(objModelUrl, evil_ghosts)
    {
        const materials = new THREE.MeshPhongMaterial( {color: 0xD63030} );

        //console.log(materials);

        objLoader = new THREE.OBJLoader();

        await objLoader.load(objModelUrl, object=>{

            object.traverse( function ( child ) {
                if ( child.isMesh ) {
                    child.material = materials;
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            } );

            evil_ghosts.push(object);
            //console.log("array", evil_ghosts);
            object.position.set(this.x, this.y, this.z);
            object.scale.set(0.5, 0.5, 0.5);
            scene.add(object);
        });
        
    }
    
}

const mossStonetexture = new THREE.TextureLoader().load( "./Images/mossStoneTexture.jpg" );
const stonetexture = new THREE.TextureLoader().load( "./Images/stoneTexture.jpg" );
const watertexture = new THREE.TextureLoader().load( "./Images/waterTexture.jpg" );
const icetexture = new THREE.TextureLoader().load( "./Images/iceTexture.jpg" );
const lavatexture = new THREE.TextureLoader().load( "./Images/lavaTexture.jpg" );
const blackstonetexture = new THREE.TextureLoader().load( "./Images/blackStoneTexture.jpg" );

//Materials to be used on meshes
materials = {
    water: new THREE.MeshBasicMaterial({
        map: watertexture
    }),
    ice: new THREE.MeshBasicMaterial({
        map: icetexture
    }),
    stone: new THREE.MeshBasicMaterial({
        map: stonetexture
    }),
    mossStone: new THREE.MeshBasicMaterial({
        map: mossStonetexture
    }),
    blackstone: new THREE.MeshBasicMaterial({
        map: blackstonetexture
    }),
    lava: new THREE.MeshBasicMaterial({
        map: lavatexture
    }),
    red: new THREE.MeshBasicMaterial({
        color: 0xCE1343
    }),
};

function load_map(){ //Load level plane grounds (boxes)

    //Reset lava counter
    lava_counter=0;

    //Create planes for the floor 1st Level
    //First Part First Level
    //Call function with parameters (Geometry, Position, Material) to Create Meshes
    create_ground({x: 8, y: 2, z: 5}, {x: -4, y: -2, z: 0}, materials.mossStone);
    create_ground({x: 12, y: 2, z: 5}, {x: 6, y: -2, z: 0}, materials.water,"water"); //Water
    create_ground({x: 6, y: 2, z: 5}, {x: 15, y: -2, z: 0}, materials.mossStone);
    create_ground({x: 10, y: 2, z: 5}, {x: 55, y: -2, z: 0}, materials.mossStone);
    create_ground({x: 8, y: 2, z: 5}, {x: 64, y: -2, z: 0}, materials.mossStone);
    create_ground({x: 4, y: 2, z: 5}, {x: 87, y: -2, z: 0}, materials.mossStone);
    //create_ground({x: 4, y: 2, z: 5}, {x: 90, y: -2, z: 0}, materials.blue);
    //Position
    create_trap({x: 68, y: -3, z: 0}); //Create peaks that kill the user
    //create_trap({x: 85.7, y: -3, z: 0}); //Create peaks that kill the user

    //Second Part First Level
    //Call function with parameters (Geometry, Position, Material) to Create Meshes
    create_ground({x: 8, y: 2, z: 5}, {x: -204, y: -2, z: 0}, materials.stone);
    create_ground({x: 12, y: 2, z: 5}, {x: 206, y: -2, z: 0}, materials.ice); //Ice
    create_ground({x: 6, y: 2, z: 5}, {x: 215, y: -2, z: 0}, materials.stone);
    create_ground({x: 2, y: 1, z: 5}, {x: 225, y: 3, z: 0}, materials.stone);
    //Positio
    create_trap({x: 269, y: -3, z: 0}); //Create peaks that kill the user
    //create_trap({x: 288, y: -3, z: 0}); //Create peaks that kill the user

    create_ground({x: 2, y: 1, z: 5}, {x: 237, y: 3, z: 0}, materials.stone);
    create_ground({x: 10, y: 2, z: 5}, {x: 255, y: -2, z: 0}, materials.stone);
    create_ground({x: 8, y: 2, z: 5}, {x: 264, y: -2, z: 0}, materials.stone);
    create_ground({x: 4, y: 2, z: 5}, {x: 287, y: -2, z: 0}, materials.stone);
    //create_ground({x: 4, y: 2, z: 5}, {x: 304, y: -2, z: 0}, materials.orange);
    
    // Create 2nd Level 
    create_ground({x: 22, y: 2, z: 5}, {x: 400, y: -2, z: 0}, materials.blackstone);
    create_ground({x: 18, y: 2, z: 5}, {x: 432, y: -2, z: 0}, materials.blackstone);
    create_ground({x: 16, y: 2, z: 5}, {x: 461, y: -2, z: 0}, materials.blackstone);
    
    //Floating platforms Ordered by position y
    //Left part
    create_ground({x: 5, y: 1, z: 5}, {x: 403, y: 2.5, z: 0}, materials.blackstone);
    create_ground({x: 4, y: 1, z: 5}, {x: 394, y: 3.5, z: 0}, materials.blackstone);
    create_ground({x: 4, y: 1, z: 5}, {x: 394, y: 3.5, z: 0}, materials.blackstone);
    create_ground({x: 2, y: 1, z: 5}, {x: 409, y: 5.5, z: 0}, materials.blackstone);
    create_ground({x: 1.5, y: 1, z: 5}, {x: 398.5, y: 7.5, z: 0}, materials.blackstone);
    create_ground({x: 1.5, y: 1, z: 5}, {x: 403.5, y: 9.5, z: 0}, materials.blackstone);
    create_ground({x: 3.5, y: 1, z: 5}, {x: 393, y: 9.5, z: 0}, materials.blackstone);
    create_ground({x: 1, y: 1, z: 5}, {x: 409.5, y: 12, z: 0}, materials.blackstone);
    create_ground({x: 2, y: 1, z: 5}, {x: 392, y: 14, z: 0}, materials.blackstone);
    create_ground({x: 4.5, y: 1, z: 5}, {x: 403, y: 15, z: 0}, materials.blackstone);
    create_ground({x: 2.5, y: 1, z: 5}, {x: 398, y: 18, z: 0}, materials.blackstone);
    create_ground({x: 1.8, y: 1, z: 5}, {x: 408.5, y: 19.5, z: 0}, materials.blackstone);
    create_ground({x: 1, y: 1, z: 5}, {x: 391, y: 20.5, z: 0}, materials.blackstone);
    create_ground({x: 1, y: 1, z: 5}, {x: 394, y: 20.5, z: 0}, materials.blackstone);
    create_ground({x: 5.5, y: 1, z: 5}, {x: 402.5, y: 23.5, z: 0}, materials.blackstone);
    create_ground({x: 4, y: 1, z: 5}, {x: 393, y: 28.3, z: 0}, materials.blackstone);
    //Lava
    create_ground({x: 12, y: 20, z: 5}, {x: 417, y: 7, z: 0}, materials.lava, "lava");
    create_ground({x: 12, y: 20, z: 5}, {x: 417, y: 27, z: 0}, materials.lava, "lava"); 
    create_ground({x: 12, y: 20, z: 5}, {x: 447, y: 7, z: 0}, materials.lava, "lava"); 
    create_ground({x: 12, y: 20, z: 5}, {x: 447, y: 27, z: 0}, materials.lava, "lava"); 
    //Middle part
    create_ground({x: 2.5, y: 1, z: 5}, {x: 427, y: 13, z: 0}, materials.blackstone);
    create_ground({x: 3, y: 1, z: 5}, {x: 436, y: 14, z: 0}, materials.blackstone);
    create_ground({x: 2, y: 1, z: 5}, {x: 431, y: 16, z: 0}, materials.blackstone);
    create_ground({x: 1.5, y: 1, z: 5}, {x: 439, y: 17.5, z: 0}, materials.blackstone);
    create_ground({x: 1.8, y: 1.5, z: 5}, {x: 426, y: 18.5, z: 0}, materials.blackstone);
    create_ground({x: 2, y: 1.5, z: 5}, {x: 435, y: 21, z: 0}, materials.blackstone);
    create_ground({x: 2, y: 1.5, z: 5}, {x: 435, y: 21, z: 0}, materials.blackstone);
    create_ground({x: 1.7, y: 1, z: 5}, {x: 439, y: 24, z: 0}, materials.blackstone);
    create_ground({x: 1.5, y: 1, z: 5}, {x: 430, y: 22.5, z: 0}, materials.blackstone);
    create_ground({x: 1.5, y: 1, z: 5}, {x: 425, y: 24.5, z: 0}, materials.blackstone); 

    //Second part
    create_ground({x: 38, y: 31.5, z: 5}, {x: 609, y: 13, z: 0}, materials.blackstone);
    create_ground({x:6, y: 9.5, z: 5}, {x: 631, y: 2, z: 0}, materials.blackstone);
    create_ground({x:6, y: 9.5, z: 5}, {x: 631, y: 11.5, z: 0}, materials.blackstone);
    create_ground({x: 18, y: 31.5, z: 5}, {x: 643, y: 13, z: 0}, materials.blackstone);
    create_ground({x: 18, y: 13, z: 5}, {x: 661, y: 3.7, z: 0}, materials.blackstone);
    create_ground({x: 18, y: 8, z: 5}, {x: 661, y: 24.75, z: 0}, materials.blackstone);
    create_ground({x: 10, y: 1, z: 5}, {x: 595, y: 34, z: 0}, materials.blackstone);
    create_ground({x: 10, y: 1, z: 5}, {x: 605, y: 34, z: 0}, materials.blackstone);
    create_ground({x: 10, y: 1, z: 5}, {x: 615, y: 34, z: 0}, materials.blackstone);
    create_ground({x: 10, y: 1, z: 5}, {x: 625, y: 34, z: 0}, materials.blackstone);
    create_ground({x: 10, y: 1, z: 5}, {x: 635, y: 34, z: 0}, materials.blackstone);
    create_ground({x: 10, y: 1, z: 5}, {x: 645, y: 34, z: 0}, materials.blackstone);
    create_ground({x: 10, y: 1, z: 5}, {x: 655, y: 34, z: 0}, materials.blackstone);
    create_ground({x: 10, y: 1, z: 5}, {x: 665, y: 34, z: 0}, materials.blackstone);
    //create_ground({x: 80, y: 1, z: 5}, {x: 630, y: 34, z: 0}, materials.blackstone);
    
}

lava_counter=0;
function create_ground(groundGeometry, groundPosition, material, type="ground"){

    let gGeometry = new THREE.BoxGeometry(groundGeometry.x, groundGeometry.y, groundGeometry.z);
    ground = new THREE.Mesh( gGeometry, material );
    ground.position.set(groundPosition.x, groundPosition.y, groundPosition.z);
    level1Grounds.push(ground);

    if(type=="ground"){
        addPhysicalBody(levelGroundTag, ground, {mass: 0}, true);
        scene.add(ground);
    }
    else if(type=="lava"){
        lavabody = addPhysicalBody(903+lava_counter, ground, {mass: 0}, true);
        let light = new THREE.PointLight( 0xFA7726, 100.0, 100);
        light.position.set(groundPosition.x, groundPosition.y, groundPosition.z);
        scene.add(light);
        scene.add(ground);
        lava_counter+=1;
    }
    else if(type=="water"){
        lavabody = addPhysicalBody(levelGroundTag, ground, {mass: 0}, false);
        //body2mesh(lavabody,true);
        scene.add(ground);
    }
    
}

function create_trap(position){
    let finalPoistion = (0.4 * 2 * 20) + position.x;
    for(let i = position.x; i< finalPoistion; i += 0.8){
        const geometry = new THREE.ConeGeometry( 0.4, 3, 10 );
        const material = new THREE.MeshBasicMaterial( materials.blackstone );
        const cone = new THREE.Mesh( geometry, material );
        cone.position.set(i, position.y, position.z)
        addPhysicalBody(600, cone, {mass: 0}, true);
        scene.add( cone );
    }
}

function create_portals(){ //Create many portals

    let COLORMAP = new THREE.TextureLoader().load("images/whirlpool.jpg");
    let NOISEMAP = new THREE.TextureLoader().load("images/color_clouds.jpg");

    //Level 1
    create_portal(0, NOISEMAP, COLORMAP, {x: 6, y: 3, z: 0})
    create_portal(1, COLORMAP, NOISEMAP, {x: 206, y: 3, z: 0})
    create_portal(2, COLORMAP, NOISEMAP, {x: 255, y: 3, z: 0})
    create_portal(3, NOISEMAP, COLORMAP, {x: 55, y: 3, z: 0})
    create_portal(4, NOISEMAP, COLORMAP, {x: 90, y: 3, z: 0}) // Go to Second Level
    
    //Level 2
    create_portal(5, NOISEMAP, COLORMAP, {x: 393, y: 31.3, z: 0}) //First portal First Part-> 6
    create_portal(6, NOISEMAP,COLORMAP, {x: 425, y: 27, z: 0}, true, 1) //Second Portal with movement First Part -> 8
    create_portal(7, NOISEMAP, COLORMAP, {x: 593, y: 31.3, z: 0}) // First Portal Second part -> 4
    create_portal(8, NOISEMAP, COLORMAP, {x: 631.3, y: 18.5, z: 0}) // Second Portal Second part -> 5
    create_portal(9, NOISEMAP, COLORMAP, {x: 456, y: 2.5, z: 0}) // Third Portal First Part 
    create_portal(10, NOISEMAP, COLORMAP, {x: 466, y: 2.5, z: 0}) // Fourth Portal First Part 
    create_portal(11, NOISEMAP, COLORMAP, {x: 654.5, y: 12.8, z: 0}) // Third Portal Second Part
    create_portal(12, NOISEMAP, COLORMAP, {x: 666, y: 12.8, z: 0}) // WIN
}

function create_portal(portalCounter, texture1, texture2, portalPosition, move_portal = false, radius = 1.5) //Receive textures and position to create a portal
{
    //create shadermaterial for the portal 
    //Create portal material
    uniforms = 
    {
        time: { type: "f", value: 0.1 },
        noiseTexture: { type: "t", value: texture1 },
        glowTexture: { type: "t", value: texture2 }
    };

    uniforms.noiseTexture.value.wrapS = uniforms.noiseTexture.value.wrapT = THREE.RepeatWrapping;
    uniforms.glowTexture.value.wrapS = uniforms.glowTexture.value.wrapT = THREE.RepeatWrapping;

    uniformsArray.push(uniforms);

    let material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: document.getElementById( 'vertexShader' ).textContent,
        fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
        transparent: false
    } );

    //Create Portal mesh
    let geometry = new THREE.SphereGeometry(radius, 36, 36);
    let portal = new THREE.Mesh(geometry, material);

    portal.castShadow = true;
   
    portal.position.set( portalPosition.x, portalPosition.y, portalPosition.z );
    portal.rotation.x = Math.PI/2;

    if(move_portal == true){
        moving_portal.mesh = portal;
        moving_portal.body = addPhysicalBody(portalTag + portalCounter, portal, {mass: 0}, false);
        portalCounter+=1;
    } else {
        //Create portal cannon body
        addPhysicalBody(portalTag + portalCounter, portal, {mass: 0}, false);
        
    }
    

    //Add portal to scene
    scene.add(portal);
}

function create_enemies(){

    let positions_x = [664, 666, 668];
    let counter = 900;

    let objModelUrl = "models/Ghost.obj";
    
    positions_x.forEach(position_x => {
        //Create Evil Ghost mesh
        let evil_ghost = new Enemy(position_x, 29.6, 0);
        evil_ghost.load3dModel(objModelUrl, evil_ghosts);
        let geometry = new THREE.SphereGeometry(0.7, 36, 36);
        let enemy_mesh = new THREE.Mesh(geometry, {transparent:true});
        enemy_mesh.position.set( position_x, 29.6, 0 );
        //Create Evil Ghost cannon body
        enemy_body = addPhysicalBody(counter, enemy_mesh, {mass: 0}, false);
        enemy_body.velocity.x = 1;
        enemy = {mesh: enemy_mesh, body: enemy_body}
        enemies.push(enemy);
        //Add Evil Ghost to scene
        scene.add(enemy_mesh);
        counter++;
    })
}

function create_lava(){

    let counter = 2000; 

    let random_x1 = Math.floor(Math.random() * (409 - 390 + 1) + 390);
    let random_x2 = Math.floor(Math.random() * (424 - 439 + 1) + 439);
    let random_x3 = Math.floor(Math.random() * (454 - 468 + 1) + 468);

    let random_xs = [random_x1, random_x2, random_x3];

    random_xs.forEach(x => {
        let path = new THREE.Shape();
        path.absellipse(0,0,0.35,0.7,0, Math.PI*2, false,0);
        let geometry = new THREE.ShapeBufferGeometry( path );
        let ellipse_mesh = new THREE.Mesh( geometry, materials.lava );
        
        if(ellipse_mesh != null){
            let light = new THREE.PointLight( 0xBB2B2B, 10.0);
            ellipse_mesh.position.set(x, 40, 0 );
            let ellipse_body = addPhysicalBody(counter, ellipse_mesh, {mass: 0.1}, true);
            ellipse = {mesh: ellipse_mesh , body: ellipse_body}
            lava_ellipse = {lava_object: ellipse, lava_light: light};
            lava_ellipses.push(lava_ellipse);
            scene.add(ellipse_mesh);
            counter++;
        }
    })
}

function create_portal_movement(){
    let portal_x_movement = ["DontMove", "MoveLeft", "MoveRight", "MoveLeft", "MoveRight"];
    let portal_y_movement = ["DontMove", "MoveDown", "MoveUp", "MoveDown", "MoveUp"];
    //Choose  random movement in x and y from the arrays
    let random_x = Math.floor(Math.random() * 5);
    let random_y = Math.floor(Math.random() * 5);
    moving_portal.xMovement = portal_x_movement[random_x];
    moving_portal.yMovement = portal_y_movement[random_y];
}

