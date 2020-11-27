class Turtle
{
    constructor(mesh, body, speed = 0.1)
    {
        this.mesh = mesh;
        this.body = body;
        this.speed = speed;
        this.grabbed = false;
        this.animations = false;
        this.grabAnimations = false;
        this.turtleObject = null;
    }

    promisifyLoader ( loader, onProgress ) 
    {
        function promiseLoader ( url ) {
    
        return new Promise( ( resolve, reject ) => {
    
            loader.load( url, resolve, onProgress, reject );
    
        } );
        }
    
        return {
        originalLoader: loader,
        load: promiseLoader,
        };
    }


    async loadObj(objModelUrl, group)
    {
        const objPromiseLoader = promisifyLoader(new THREE.OBJLoader());

        try {
            const object = await objPromiseLoader.load(objModelUrl.obj);
            
            object.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });

            object.scale.set(0.007, 0.007, 0.007);
            object.position.set(1, -1, 0);
            object.rotation.y = Math.PI*2;
            object.name = "Turtle";
            this.turtleObject = object;
            group.add(object);
            console.log("Turtle:", group);
            scene.add(group);
        }
        catch (err) {
            return onError(err);
        }
    }
   

    grab(){
        this.body.position.y += 0.1;
        this.body.mass = 0;
        turtle.grabbed = true;
    }

    ungrab(){
        this.body.position.y -= 0;
        this.body.mass = 1;
        turtle.grabbed = false;
    }
}

function playAnimations()
{
    
    TurtleAnimator = new KF.KeyFrameAnimator;
    TurtleAnimator.init({ 
        interps:
            [
                { 
                    keys:[.7, .14, .28, .35, .42, .49, .56, .63, .7, .77, .84, .91, 1], 
                    
                    values:[
                            { x: 206},
                            { x: 207},
                            { x: 208},
                            { x: 209},
                            { x: 210},
                            { x: 211},
                            { x: 212},
                            { x: 211},
                            { x: 210},
                            { x: 209},
                            { x: 208},
                            { x: 207},
                            { x: 206},
                            ],
                    
                    target:turtleBody.position,
                },
                { 
                    keys:[.7, .14, .28, .35, .42, .49, .56, .63, .7, .77, .84, .91, 1],
                    
                    values:[
                        { y: 0},
                        { y: 0},
                        { y: 0},
                        { y: 0},
                        { y: 0},
                        { y: 0},
                        { y : Math.PI/2},
                        { y: Math.PI},
                        { y: Math.PI},
                        { y: Math.PI},
                        { y: Math.PI},
                        { y: Math.PI/2},
                        { y: 0},
                        ],

                    target:group.rotation,
                },
                { 
                    keys:[0, .04, .08, .12, .16, .20, .24, .28, .32, .36, .40, .44, .48, .52, .56, .60, .64, .68, .72, .76, .80, .84, .88, .95, 1], 
                    
                    values:[
                            { x: 0 , z : 0},
                            { x: Math.PI / 85, z : Math.PI / 42},
                            { x: 0, z : 0},
                            { x: -Math.PI / 85, z : -Math.PI / 42},
                            { x:0, z : 0},
                            { x: 0 , z : 0},
                            { x: Math.PI / 85, z : Math.PI / 42},
                            { x: 0, z : 0},
                            { x: -Math.PI / 85, z : -Math.PI / 42},
                            { x:0, z: 0},
                            { x: 0 , z : 0},
                            { x: Math.PI / 85, z : Math.PI / 42},
                            { x: 0, z : 0},
                            { x: -Math.PI / 85, z : -Math.PI / 42},
                            { x:0, z : 0},
                            { x: 0 , z : 0},
                            { x: Math.PI / 85, z : Math.PI / 42},
                            { x: 0, z : 0},
                            { x: -Math.PI / 85, z : -Math.PI / 42},
                            { x:0, z : 0},
                            { x: 0 , z : 0},
                            { x: Math.PI / 85, z : Math.PI / 42},
                            { x: 0, z : 0},
                            { x: -Math.PI / 85, z : -Math.PI / 42},
                            { x:0, z : 0},
                            ],
                    target:group.rotation,
                },
            ],

        loop: true,
        duration:duration * 1000,     
        easing:TWEEN.Easing.Linear.InOut,

    });

    TurtleAnimator.start();
    
} 

function load_turtle()
{
    group  = new THREE.Object3D;

    //Create turtle mesh
    let turtleGeometry = new THREE.BoxGeometry(1, 0.5, 1);
    let turtleMaterial = new THREE.MeshBasicMaterial( {color: 0x00fff0, opacity: 0.0} );
    let turtleMesh = new THREE.Mesh(turtleGeometry, turtleMaterial);

    let objModelUrl = {obj:'Models/Turtle2.obj'};

    //Create turtle object
    turtleBody = addPhysicalBody(turtleMesh, {mass: 1}, true)
    turtle = new Turtle(turtleMesh, turtleBody, 0.1);

    turtle.loadObj(objModelUrl, group);

    turtleMesh.position.set( 206, 0, 0 );
    turtleBody.position.set( 206, 0, 0 );
    scene.add(turtle.mesh);
}