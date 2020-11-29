//setup physics
function innitCannon(){
    world = new CANNON.World(); //initialize cannon js world 
    world.quatNormalizeSkip = 0;
    world.quatNormalizeFast = false;

    var solver = new CANNON.GSSolver();

    world.defaultContactMaterial.contactEquationStiffness = 1e9; //contact material stiffness
    world.defaultContactMaterial.contactEquationRelaxation = 4; //contact material relaxation

    solver.iterations = 7;
    // solver.tolerance = 0.1;
    var split = true;
    if(split)
        world.solver = new CANNON.SplitSolver(solver);
    else
        world.solver = solver;

    world.gravity.set(0,-9.81,0);
    world.broadphase = new CANNON.NaiveBroadphase();
}

addPhysicalBody = function (tag, mesh, bodyOptions, collision, isTurtle=false) {
    var shape;
    // create a Sphere shape for spheres and thorus knots,
    // a Box shape otherwise
    if (mesh.geometry.type === 'SphereGeometry') {
        mesh.geometry.computeBoundingSphere();
        shape = new CANNON.Sphere(mesh.geometry.boundingSphere.radius);
    }
    else {  //if not turtle return standard size physcis body, else resize for bigger turtle body
        if(!isTurtle){
            shape = createBoxShape(mesh);
        }
        else{
            shape = createBoxShape(mesh, true);
        }
    }

    var body = new CANNON.Body(bodyOptions); //create physics body
    body.addShape(shape);
    body.position.copy(mesh.position);
    body.computeAABB();
    
    // disable collision response so objects don't move when they collide
    // against each other
    body.collisionResponse = collision;
    // keep a reference to the mesh so we can update its properties later
    body.mesh = mesh;
    body.tag = tag;

    // Lava can collide only with the player
    if (tag >= 2000){ // Lava_ellipses tag
        body.collisionFilterGroup = 1; //Assign to group 1
        body.collisionFilterMask = 8; // It can only collide with group 200 (Player)
    } else if (tag == 0 ){ // Player tag
        body.collisionFilterGroup = 8; //Assign to group 200
        body.collisionFilterMask = 1 | 16;
    }else if (tag == 3){ // Turtle tag
        body.collisionFilterGroup=16;
        body.collisionFilterMask = 8 | 1; //Assign to group 200
    }else if (tag>=20 && tag < 40|| (tag >= 900 && tag <= 904) || tag == 100 || tag == 600 || tag == 3){ // Portals and Ground tag
        body.collisionFilterGroup = 1;
        body.collisionFilterMask = 8 | 16; // It can only collide with group 200 (Player)
    }

    world.addBody(body);
    //return physics body
    return body;
};

function createBoxShape (mesh, ifTurtle=false){

    mesh.geometry.computeBoundingBox();
    var box = mesh.geometry.boundingBox;
    //if object is not turtle compute normal bounding cannon body, else resize turtle body
    if(!ifTurtle){
        shape = new CANNON.Box(new CANNON.Vec3(
            (box.max.x - box.min.x) / 2,
            (box.max.y - box.min.y) / 2,
            (box.max.z - box.min.z) / 2
        ));
    }
    else{
        shape = new CANNON.Box(new CANNON.Vec3(
            ((box.max.x - box.min.x) / 2)*7,
            ((box.max.y - box.min.y) / 2)*10,
            ((box.max.z - box.min.z) / 2)*7
        ));
    }
    //return physics geometry
    return shape;
}