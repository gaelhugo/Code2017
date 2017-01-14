var canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height= window.innerHeight;
var ctx = canvas.getContext("2d");

var allEyes = [];
var eyesAngle = 10;
var eyesNbr = 40;
var mouse = {"x":0,"y":0};
var clicked = false;
var rows = 12;
var _event = {"click":null,"move":null};
function setup(){

  if ("ontouchstart" in document.documentElement){
    _event.click = "touchend";
    _event.move = "touchmove";
  }else{
    _event.click = "click";
    _event.move = "mousemove";
  }

  for(var i = 0;i<eyesNbr*rows;i++){
    var eye = new Eye(ctx);
    eye.angle =i*0.6;
    allEyes.push(eye);
  }
  eyesAngle = Math.round(360 / eyesNbr);
  document.addEventListener(_event.move,onmove,false);
  document.addEventListener(_event.click,onclick,false);
  draw();
}

function onmove(e){
  mouse.x = e.pageX;
  mouse.y = e.pageY;
}

function onclick(e){
  clicked = true;
}

function draw(){
  ctx.fillStyle = "black";
  ctx.fillRect(0,0,window.innerWidth,window.innerHeight);
  var radius = 50;
  for(var j = 0;j<rows;j++){
    for(var i = 0;i<allEyes.length/rows;i++){
      ctx.save();
      ctx.translate(window.innerWidth/2,window.innerHeight/2);
      ctx.rotate(eyesAngle * i * Math.PI/180);
      ctx.translate(0,radius);
      allEyes[i*j].ratio = 0.2*j;
      if(clicked){
        allEyes[i*j].setBlink();
      }
      allEyes[i*j].update(mouse);
      allEyes[i*j].draw();
      ctx.restore();
    }
    radius +=15+(allEyes[0].height*allEyes[0].ratio);
  }
  clicked = false;
  requestAnimationFrame(draw);
}

setup();
