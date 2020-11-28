
function innitCannon(){
    world = new CANNON.World();
    world.quatNormalizeSkip = 0;
    world.quatNormalizeFast = false;

    var solver = new CANNON.GSSolver();

    world.defaultContactMaterial.contactEquationStiffness = 1e9;
    world.defaultContactMaterial.contactEquationRelaxation = 4;

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

addPhysicalBody = function (tag, mesh, bodyOptions, collision) {
    var shape;
    // create a Sphere shape for spheres and thorus knots,
    // a Box shape otherwise
    if (mesh.geometry.type === 'SphereGeometry' ||
    mesh.geometry.type === 'ThorusKnotGeometry') {
        mesh.geometry.computeBoundingSphere();
        shape = new CANNON.Sphere(mesh.geometry.boundingSphere.radius);
    }
    else {
        shape = createBoxShape(mesh);
    }

    var body = new CANNON.Body(bodyOptions);
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
        body.collisionFilterMask = 200; // It can only collide with group 200 (Player)
    } else if (tag == 0){ // Player tag
        body.collisionFilterGroup = 200; //Assign to group 200
    } else if (tag >20 && tag < 40 || tag == 100){ // Portals and Ground tag
        body.collisionFilterMask = 200; // It can only collide with group 200 (Player)
    }

    world.addBody(body);

    return body;
};

function createBoxShape (mesh){

    mesh.geometry.computeBoundingBox();
    var box = mesh.geometry.boundingBox;
    shape = new CANNON.Box(new CANNON.Vec3(
        (box.max.x - box.min.x) / 2,
        (box.max.y - box.min.y) / 2,
        (box.max.z - box.min.z) / 2
    ));

    return shape;
}