let renderer = null,    // Object in charge of drawing a scene
scene = null,           
camera = null,
uniforms = null,
orbitControls = null;

let duration = 5000; // ms
let currentTime = Date.now();

function animate() 
{
    let now = Date.now();
    let deltat = now - currentTime;
    currentTime = now;
    let fract = deltat / duration;
   
    uniforms.time.value += fract;

}

function run() {

    requestAnimationFrame(function() { run(); });
    
    // Render the scene
    renderer.render( scene, camera );

    // Spin 
    animate();

    // Update the camera controller
    orbitControls.update();

}
    
function scene_setup(canvas)
{
    console.log(THREE.REVISION);

    // Create the Three.js renderer and attach it to our canvas. Different renderes can be used, for example to a 2D canvas.
    renderer = new THREE.WebGLRenderer( { canvas: canvas, antialias: true } );

    // Set the viewport size.
    renderer.setSize(canvas.width, canvas.height);

    // Create a new Three.js scene.
    scene = new THREE.Scene();
    
    // Add  a camera so we can view the scene. Three js uses these values to create a projection matrix.
    camera = new THREE.PerspectiveCamera( 45, canvas.width / canvas.height, 1, 40 );
    camera.position.set(0, 2, -8);
    scene.add(camera);

    // Add light
    // Add a directional light to show off the object
    let directionalLight = new THREE.DirectionalLight( 0xffffff, 1);
    directionalLight.position.set(0, 1, 2);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    Portals = new THREE.Object3D();

    create_portal();

    scene.add(Portals);

    //initiate orbitcontroller
    orbitControls = new THREE.OrbitControls(camera, renderer.domElement);

}

function create_portal()
{
    //create shadermaterial for the portal 
    let COLORMAP = new THREE.TextureLoader().load("images/whirlpool.jpg");
    let NOISEMAP = new THREE.TextureLoader().load("images/color_clouds.jpg");

    
    uniforms = 
    {
        time: { type: "f", value: 0.1 },
        noiseTexture: { type: "t", value: NOISEMAP },
        glowTexture: { type: "t", value: COLORMAP }
    };

    uniforms.noiseTexture.value.wrapS = uniforms.noiseTexture.value.wrapT = THREE.RepeatWrapping;
    uniforms.glowTexture.value.wrapS = uniforms.glowTexture.value.wrapT = THREE.RepeatWrapping;

    let material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: document.getElementById( 'vertexShader' ).textContent,
        fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
        transparent: false
    } );

    
    let geometry = new THREE.SphereGeometry(2, 36, 36);

    let portal = new THREE.Mesh(geometry, material);
    portal.rotation.x = Math.PI/1.7;

    Portals.add(portal);

    
}
