function load_map(){ //Load level plane grounds (boxes)

    //Create planes for the floor 1st Level

    //Call function with parameters (Geometry, Position, Material) to Create Meshes
    create_ground({x: 8, y: 2, z: 5}, {x: -4, y: -2, z: 0}, materials.blue);
    create_ground({x: 6, y: 2, z: 5}, {x: 15, y: -2, z: 0}, materials.blue);
    create_ground({x: 2, y: 1, z: 5}, {x: 26, y: 3, z: 0}, materials.blue);
    create_ground({x: 2, y: 1, z: 5}, {x: 37, y: 3, z: 0}, materials.blue);
    create_ground({x: 10, y: 2, z: 5}, {x: 55, y: -2, z: 0}, materials.blue);
    create_ground({x: 8, y: 2, z: 5}, {x: 64, y: -2, z: 0}, materials.blue);
    create_ground({x: 4, y: 2, z: 5}, {x: 81, y: -2, z: 0}, materials.blue);
    create_ground({x: 4, y: 2, z: 5}, {x: 93, y: -2, z: 0}, materials.blue);
    
    create_ground({x: 12, y: 2, z: 5}, {x: 6, y: -2, z: 0}, materials.water,"water"); //Water
    create_ground({x: 32, y: 2, z: 5}, {x: 34, y: -2, z: 0}, materials.water, "water"); //Water
    create_ground({x: 12, y: 2, z: 5}, {x: 206, y: -2, z: 0}, materials.water, "water"); //Water
    create_ground({x: 32, y: 2, z: 5}, {x: 234, y: -2, z: 0}, materials.water, "water"); //Water

    //Call function with parameters (Geometry, Position, Material) to Create Meshes
    create_ground({x: 8, y: 2, z: 5}, {x: -204, y: -2, z: 0}, materials.level1);
    create_ground({x: 6, y: 2, z: 5}, {x: 215, y: -2, z: 0}, materials.level1);
    create_ground({x: 2, y: 1, z: 5}, {x: 226, y: 3, z: 0}, materials.level1);
    create_ground({x: 2, y: 1, z: 5}, {x: 237, y: 3, z: 0}, materials.level1);
    create_ground({x: 10, y: 2, z: 5}, {x: 255, y: -2, z: 0}, materials.level1);
    create_ground({x: 8, y: 2, z: 5}, {x: 264, y: -2, z: 0}, materials.orange);
    create_ground({x: 4, y: 2, z: 5}, {x: 281, y: -2, z: 0}, materials.orange);
    create_ground({x: 4, y: 2, z: 5}, {x: 293, y: -2, z: 0}, materials.orange);
    
    // Create 2nd Level 
    create_ground({x: 22, y: 2, z: 5}, {x: 400, y: -2, z: 0}, materials.purple);
    create_ground({x: 18, y: 2, z: 5}, {x: 432, y: -2, z: 0}, materials.purple);
    create_ground({x: 16, y: 2, z: 5}, {x: 461, y: -2, z: 0}, materials.purple);
    
    //Floating platforms Ordered by position y
    //Left part
    create_ground({x: 5, y: 1, z: 5}, {x: 403, y: 2.5, z: 0}, materials.purple);
    create_ground({x: 4, y: 1, z: 5}, {x: 394, y: 3.5, z: 0}, materials.purple);
    create_ground({x: 4, y: 1, z: 5}, {x: 394, y: 3.5, z: 0}, materials.purple);
    create_ground({x: 2, y: 1, z: 5}, {x: 409, y: 5.5, z: 0}, materials.purple);
    create_ground({x: 1.5, y: 1, z: 5}, {x: 398.5, y: 7.5, z: 0}, materials.purple);
    create_ground({x: 1.5, y: 1, z: 5}, {x: 403.5, y: 9.5, z: 0}, materials.purple);
    create_ground({x: 3.5, y: 1, z: 5}, {x: 393, y: 9.5, z: 0}, materials.purple);
    create_ground({x: 1, y: 1, z: 5}, {x: 409.5, y: 12, z: 0}, materials.purple);
    create_ground({x: 2, y: 1, z: 5}, {x: 392, y: 14, z: 0}, materials.purple);
    create_ground({x: 4.5, y: 1, z: 5}, {x: 403, y: 15, z: 0}, materials.purple);
    create_ground({x: 2.5, y: 1, z: 5}, {x: 398, y: 18, z: 0}, materials.purple);
    create_ground({x: 1.8, y: 1, z: 5}, {x: 408.5, y: 19.5, z: 0}, materials.purple);
    create_ground({x: 1, y: 1, z: 5}, {x: 391, y: 20.5, z: 0}, materials.purple);
    create_ground({x: 1, y: 1, z: 5}, {x: 394, y: 20.5, z: 0}, materials.purple);
    create_ground({x: 5.5, y: 1, z: 5}, {x: 402.5, y: 23.5, z: 0}, materials.purple);
    create_ground({x: 4, y: 1, z: 5}, {x: 393, y: 28.3, z: 0}, materials.purple);
    //Lava
    create_ground({x: 12, y: 40, z: 5}, {x: 417, y: 17, z: 0}, materials.red, "lava");
    create_ground({x: 12, y: 40, z: 5}, {x: 447, y: 17, z: 0}, materials.red, "lava"); 
    //Middle part
    create_ground({x: 2.5, y: 1, z: 5}, {x: 427, y: 13, z: 0}, materials.purple);
    create_ground({x: 3, y: 1, z: 5}, {x: 436, y: 14, z: 0}, materials.purple);
    create_ground({x: 2, y: 1, z: 5}, {x: 431, y: 16, z: 0}, materials.purple);
    create_ground({x: 1.5, y: 1, z: 5}, {x: 439, y: 17.5, z: 0}, materials.purple);
    create_ground({x: 1.8, y: 1.5, z: 5}, {x: 426, y: 18.5, z: 0}, materials.purple);
    create_ground({x: 2, y: 1.5, z: 5}, {x: 435, y: 21, z: 0}, materials.purple);
    create_ground({x: 2, y: 1.5, z: 5}, {x: 435, y: 21, z: 0}, materials.purple);
    create_ground({x: 1.7, y: 1, z: 5}, {x: 439, y: 24, z: 0}, materials.purple);
    create_ground({x: 1.5, y: 1, z: 5}, {x: 430, y: 22.5, z: 0}, materials.purple);
    create_ground({x: 1.5, y: 1, z: 5}, {x: 425, y: 24.5, z: 0}, materials.purple);

    //Second part
    create_ground({x: 38, y: 31.5, z: 5}, {x: 609, y: 13, z: 0}, materials.light_blue);
    create_ground({x:6, y: 19, z: 5}, {x: 631, y: 6.75, z: 0}, materials.light_blue);
    create_ground({x: 18, y: 31.5, z: 5}, {x: 643, y: 13, z: 0}, materials.light_blue);
    create_ground({x: 18, y: 13, z: 5}, {x: 661, y: 3.7, z: 0}, materials.light_blue);
    create_ground({x: 18, y: 8, z: 5}, {x: 661, y: 24.75, z: 0}, materials.light_blue);
    create_ground({x: 80, y: 1, z: 5}, {x: 630, y: 34, z: 0}, materials.light_blue);


    
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
        //body2mesh(lavabody,true);
        scene.add(ground);
        lava_counter+=1;
    }
    
}

function body2mesh(body, wireframe) {
    console.log("CALCULANDO")
    var wireframe = wireframe || true;
    var obj = new THREE.Object3D();
  
    for (var l = 0; l < body.shapes.length; l++) {
      var shape = body.shapes[l];
  
      var mesh;
  
      switch(shape.type){
  
      case CANNON.Shape.types.SPHERE:
        var sphere_geometry = new THREE.SphereGeometry( shape.radius, 8, 8);
        mesh = new THREE.Mesh( sphere_geometry, this.currentMaterial );
        break;
  
      case CANNON.Shape.types.PARTICLE:
        mesh = new THREE.Mesh( this.particleGeo, this.particleMaterial );
        var s = this.settings;
        mesh.scale.set(s.particleSize,s.particleSize,s.particleSize);
        break;
  
      case CANNON.Shape.types.PLANE:
        var geometry = new THREE.PlaneGeometry(10, 10, 4, 4);
        mesh = new THREE.Object3D();
        var submesh = new THREE.Object3D();
        var ground = new THREE.Mesh( geometry, this.currentMaterial );
        ground.scale.set(100, 100, 100);
        submesh.add(ground);
  
        ground.castShadow = true;
        ground.receiveShadow = true;
  
        mesh.add(submesh);
        break;
  
      case CANNON.Shape.types.BOX:
        var box_geometry = new THREE.BoxGeometry(  shape.halfExtents.x*2,
                              shape.halfExtents.y*2,
                              shape.halfExtents.z*2 );
        mesh = new THREE.Mesh( box_geometry, this.currentMaterial );
        break;
  
      case CANNON.Shape.types.CONVEXPOLYHEDRON:
        var geo = new THREE.Geometry();
  
        // Add vertices
        for (var i = 0; i < shape.vertices.length; i++) {
          var v = shape.vertices[i];
          geo.vertices.push(new THREE.Vector3(v.x, v.y, v.z));
        }
  
        for(var i=0; i < shape.faces.length; i++){
          var face = shape.faces[i];
  
          // add triangles
          var a = face[0];
          for (var j = 1; j < face.length - 1; j++) {
            var b = face[j];
            var c = face[j + 1];
            geo.faces.push(new THREE.Face3(a, b, c));
          }
        }
        geo.computeBoundingSphere();
        geo.computeFaceNormals();
        mesh = new THREE.Mesh( geo, this.currentMaterial );
        break;
  
      case CANNON.Shape.types.HEIGHTFIELD:
        var geometry = new THREE.Geometry();
  
        var v0 = new CANNON.Vec3();
        var v1 = new CANNON.Vec3();
        var v2 = new CANNON.Vec3();
        for (var xi = 0; xi < shape.data.length - 1; xi++) {
          for (var yi = 0; yi < shape.data[xi].length - 1; yi++) {
            for (var k = 0; k < 2; k++) {
              shape.getConvexTrianglePillar(xi, yi, k===0);
              v0.copy(shape.pillarConvex.vertices[0]);
              v1.copy(shape.pillarConvex.vertices[1]);
              v2.copy(shape.pillarConvex.vertices[2]);
              v0.vadd(shape.pillarOffset, v0);
              v1.vadd(shape.pillarOffset, v1);
              v2.vadd(shape.pillarOffset, v2);
              geometry.vertices.push(
                new THREE.Vector3(v0.x, v0.y, v0.z),
                new THREE.Vector3(v1.x, v1.y, v1.z),
                new THREE.Vector3(v2.x, v2.y, v2.z)
              );
              var i = geometry.vertices.length - 3;
              geometry.faces.push(new THREE.Face3(i, i+1, i+2));
            }
          }
        }
        geometry.computeBoundingSphere();
        geometry.computeFaceNormals();
        mesh = new THREE.Mesh(geometry, this.currentMaterial);
        break;
  
      case CANNON.Shape.types.TRIMESH:
        var geometry = new THREE.Geometry();
  
        var v0 = new CANNON.Vec3();
        var v1 = new CANNON.Vec3();
        var v2 = new CANNON.Vec3();
        for (var i = 0; i < shape.indices.length / 3; i++) {
          shape.getTriangleVertices(i, v0, v1, v2);
          geometry.vertices.push(
            new THREE.Vector3(v0.x, v0.y, v0.z),
            new THREE.Vector3(v1.x, v1.y, v1.z),
            new THREE.Vector3(v2.x, v2.y, v2.z)
          );
          var j = geometry.vertices.length - 3;
          geometry.faces.push(new THREE.Face3(j, j+1, j+2));
        }
        geometry.computeBoundingSphere();
        geometry.computeFaceNormals();
        mesh = new THREE.Mesh(geometry, this.currentMaterial);
        break;
  
      default:
        throw "Visual type not recognized: "+shape.type;
      }
  
      mesh.receiveShadow = true;
      mesh.castShadow = true;
      if(mesh.children){
        for(var i=0; i<mesh.children.length; i++){
          mesh.children[i].castShadow = true;
          mesh.children[i].receiveShadow = true;
          if(mesh.children[i]){
            for(var j=0; j<mesh.children[i].length; j++){
              mesh.children[i].children[j].castShadow = true;
              mesh.children[i].children[j].receiveShadow = true;
            }
          }
        }
      }
  
      var o = body.shapeOffsets[l];
      var q = body.shapeOrientations[l];
      mesh.position.set(400, 0  , 0);
      mesh.quaternion.set(q.x, q.y, q.z, q.w);
  
      obj.add(mesh);
    }

    scene.add(obj)
  
    return obj;
   };

function create_portals(){ //Create many portals

    let COLORMAP = new THREE.TextureLoader().load("images/whirlpool.jpg");
    let NOISEMAP = new THREE.TextureLoader().load("images/color_clouds.jpg");

    create_portal(0, NOISEMAP, COLORMAP, {x: 6, y: 3, z: 0})
    create_portal(1, COLORMAP, NOISEMAP, {x: 206, y: 3, z: 0})
    create_portal(2, COLORMAP, NOISEMAP, {x: 255, y: 3, z: 0})
    create_portal(3, NOISEMAP, COLORMAP, {x: 55, y: 3, z: 0})
    create_portal(4, NOISEMAP, COLORMAP, {x: 393, y: 31.3, z: 0})
    create_portal(5, NOISEMAP,COLORMAP, {x: 425, y: 27, z: 0}, true, 1) //Portal with movement
    create_portal(6, NOISEMAP, COLORMAP, {x: 593, y: 31.3, z: 0})
    // create_portal(NOISEMAP, COLORMAP, {x: 431, y: 18.5, z: 0})
    create_portal(7, NOISEMAP, COLORMAP, {x: 631.3, y: 18.5, z: 0})
    create_portal(8, NOISEMAP, COLORMAP, {x: 654.5, y: 12.8, z: 0})
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

    let positions_x = [664, 666, 668]
    let counter = 900;
    
    positions_x.forEach(position_x => {
        //Create Portal mesh
        let geometry = new THREE.SphereGeometry(0.7, 36, 36);
        let enemy_mesh = new THREE.Mesh(geometry, materials.red);
        enemy_mesh.position.set( position_x, 29.6, 0 );
        //Create portal cannon body
        enemy_body = addPhysicalBody(counter, enemy_mesh, {mass: 0}, false);
        enemy_body.velocity.x = 1;
        enemy = {mesh: enemy_mesh, body: enemy_body}
        enemies.push(enemy);
        //Add portal to scene
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
        let ellipse_mesh = new THREE.Mesh( geometry, materials.orange );
        
        if(ellipse_mesh != null){
            ellipse_mesh.position.set(x, 40, 0 );
            let ellipse_body = addPhysicalBody(counter, ellipse_mesh, {mass: 0.1}, true, 200);
            ellipse = {mesh: ellipse_mesh , body: ellipse_body}
            lava_ellipses.push(ellipse);
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

