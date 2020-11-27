function load_map(){ //Load level plane grounds (boxes)

    //Create planes for the floor 1st Level

    //Call function with parameters (Geometry, Position, Material) to Create Meshes
    create_ground({x: 8, y: 2, z: 5}, {x: -4, y: -2, z: 0}, materials.blue);
    create_ground({x: 12, y: 2, z: 5}, {x: 6, y: -2, z: 0}, materials.water); //Water
    create_ground({x: 6, y: 2, z: 5}, {x: 15, y: -2, z: 0}, materials.blue);
    create_ground({x: 2, y: 1, z: 5}, {x: 26, y: 3, z: 0}, materials.blue);
    create_ground({x: 2, y: 1, z: 5}, {x: 37, y: 3, z: 0}, materials.blue);
    create_ground({x: 32, y: 2, z: 5}, {x: 34, y: -2, z: 0}, materials.water); //Water
    create_ground({x: 10, y: 2, z: 5}, {x: 55, y: -2, z: 0}, materials.blue);
    create_ground({x: 8, y: 2, z: 5}, {x: 64, y: -2, z: 0}, materials.blue);
    create_ground({x: 4, y: 2, z: 5}, {x: 81, y: -2, z: 0}, materials.blue);
    create_ground({x: 4, y: 2, z: 5}, {x: 93, y: -2, z: 0}, materials.blue);

    //Call function with parameters (Geometry, Position, Material) to Create Meshes
    create_ground({x: 8, y: 2, z: 5}, {x: -204, y: -2, z: 0}, materials.level1);
    create_ground({x: 12, y: 2, z: 5}, {x: 206, y: -2, z: 0}, materials.water); //Water
    create_ground({x: 6, y: 2, z: 5}, {x: 215, y: -2, z: 0}, materials.level1);
    create_ground({x: 2, y: 1, z: 5}, {x: 226, y: 3, z: 0}, materials.level1);
    create_ground({x: 2, y: 1, z: 5}, {x: 237, y: 3, z: 0}, materials.level1);
    create_ground({x: 32, y: 2, z: 5}, {x: 234, y: -2, z: 0}, materials.water); //Water
    create_ground({x: 10, y: 2, z: 5}, {x: 255, y: -2, z: 0}, materials.level1);
    create_ground({x: 8, y: 2, z: 5}, {x: 264, y: -2, z: 0}, materials.orange);
    create_ground({x: 4, y: 2, z: 5}, {x: 281, y: -2, z: 0}, materials.orange);
    create_ground({x: 4, y: 2, z: 5}, {x: 293, y: -2, z: 0}, materials.orange);

    //Add physical body to each mesh and add mesh to scene
    for(let i = 0; i<level1Grounds.length; i++){
        addPhysicalBody(level1Grounds[i], {mass: 0}, true);
        scene.add(level1Grounds[i]);
    }
}

function create_ground(groundGeometry, groundPosition, material){

    let gGeometry = new THREE.BoxGeometry(groundGeometry.x, groundGeometry.y, groundGeometry.z);
    ground = new THREE.Mesh( gGeometry, material );
    ground.position.set(groundPosition.x, groundPosition.y, groundPosition.z);
    level1Grounds.push(ground);
}

function create_portals(){ //Create many portals

    let COLORMAP = new THREE.TextureLoader().load("images/whirlpool.jpg");
    let NOISEMAP = new THREE.TextureLoader().load("images/color_clouds.jpg");

    create_portal(NOISEMAP, COLORMAP, {x: 6, y: 3, z: 0})
    create_portal(COLORMAP, NOISEMAP, {x: 206, y: 3, z: 0})
    create_portal(COLORMAP, NOISEMAP, {x: 255, y: 3, z: 0})
    create_portal(NOISEMAP, COLORMAP, {x: 55, y: 3, z: 0})
}

function create_portal(texture1, texture2, portalPosition) //Receive textures and position to create a portal
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

    let material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: document.getElementById( 'vertexShader' ).textContent,
        fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
        transparent: false
    } );

    //Create Portal mesh
    let geometry = new THREE.SphereGeometry(1.5, 36, 36);
    let portal = new THREE.Mesh(geometry, material);
    portal.position.set( portalPosition.x, portalPosition.y, portalPosition.z );
    portal.rotation.x = Math.PI/2;

    //Create portal cannon body
    addPhysicalBody(portal, {mass: 0}, false);

    //Add portal to scene
    scene.add(portal);
}