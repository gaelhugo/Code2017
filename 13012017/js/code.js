var camera, controls, scene, renderer,container,texture,geometry;
var mesh;
var tick = 0,
gridNbr = 40,
gridSize = 600,
gridSizeY = 400,
originalVertices = [],
mouse = {"x":1062,"y":725},//{"x":338,"y":579},
piano,
step = 0;
var allSounds = [];
var _event = {"click":null,"move":null};

function setup(){

  if ("ontouchstart" in document.documentElement){
    _event.click = "touchend";
    _event.move = "touchmove";
  }else{
    _event.click = "click";
    _event.move = "mousemove";
  }

  container = document.getElementById( 'container' );
  camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 20000 );
	scene = new THREE.Scene();
  renderer = new THREE.WebGLRenderer();
  //controls = new THREE.OrbitControls( camera );
	renderer.setClearColor( 0x000000 );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.innerHTML = "";
	container.appendChild( renderer.domElement );
  camera.position.z = 280;

  geometry = new THREE.PlaneGeometry(gridSize,gridSize-200,gridNbr,gridNbr);
  geometry.dynamic = true
  step = gridSize/gridNbr;
  for(var i = 0;i<geometry.vertices.length;i++){
    originalVertices.push({"x":geometry.vertices[i].x,"y":geometry.vertices[i].y});
  }
  texture = new THREE.CanvasTexture( generateTexture(2048,2048) );
  texture.wrapS = THREE.ClampToEdgeWrapping;
	texture.wrapT = THREE.ClampToEdgeWrapping;
  var material = new THREE.MeshBasicMaterial({map:texture,wireframe:false});
  var plane = new THREE.Mesh(geometry, material);
  scene.add(plane);

  //sounds
  for(var i=1;i<20;i++){
        var audio = document.createElement('audio');
        audio.src = "sound/chimes_"+((i<10)?"0":"")+i+".mp3";
        audio.preload = true;
        audio.loop = false;
        audio.load();
        document.body.appendChild(audio);
        allSounds.push(audio);
    }

  document.addEventListener(_event.click,onkeydown);
  document.addEventListener("mousemove",onmousemove);
  document.addEventListener("keydown",onkeydown);
  window.addEventListener( 'resize', onWindowResize, false );
  piano.draw();
  draw();
}
function onmousemove(e){
  // mouse.x = e.pageX;
  // mouse.y = e.pageY;
  console.log(mouse.x,mouse.y); // 3
}
function onkeydown(e){
  piano.play(e);
  piano.draw();
  var s = allSounds[Math.floor(Math.random()*allSounds.length)];
  s.load();
  s.play();
}

function generateTexture(width,height){
  var canvas = document.getElementById( 'canvas' );
	canvas.width = width;
	canvas.height = height;
  ctx = canvas.getContext( '2d' );
  piano = new Piano(ctx,width,height);
  return canvas;
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}



function render() {
  //controls.update();
  piano.update();
  texture.needsUpdate = true;
  tick++;
  var _angle = 0;
  for(var i = 0;i<geometry.vertices.length;i++){
    _angle+=mouse.x - window.innerWidth/2 /mouse.y *0.1;
    geometry.vertices[i].x = originalVertices[i].x + Math.cos((tick+_angle)*Math.PI/180)*step*0.5;
    geometry.vertices[i].y = originalVertices[i].y + Math.sin((tick+_angle)*Math.PI/180)*step*0.5;
  }
  geometry.verticesNeedUpdate = true;
	renderer.render( scene, camera );
}
function draw(){
  // piano.draw();
  render();
  requestAnimationFrame(draw);
}

setup();
