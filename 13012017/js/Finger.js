CanvasRenderingContext2D.prototype.roundRect =
function(x, y, width, height, radius, fill, stroke) {
  if (typeof stroke == "undefined" ) {
    stroke = true;
  }
  if (typeof radius === "undefined") {
    radius = 5;
  }
  this.beginPath();
  this.moveTo(x + radius, y);
  this.lineTo(x + width - radius, y);
  this.quadraticCurveTo(x + width*0.8, y, x + width*0.8, y + radius);
  //this.lineTo(x + width, y + height - radius);
  this.quadraticCurveTo(x + width*0.8, y + height, x + (width - radius), y + height);
  //this.lineTo(x + radius, y + height);
  this.quadraticCurveTo(x+width*0.2, y + height, x+width*0.2, y + height - radius);
  //this.lineTo(x, y + radius);
  this.quadraticCurveTo(x, y, x + radius, y);
  this.closePath();
  if (stroke) {
    this.stroke();
  }
  if (fill) {
    this.fill();
  }
}


var Finger = function(ctx,x,y,width,height){
  this.ctx = ctx;
  this.originalHeight;
  this.fact = (10-Math.random()*20);
  this.setSize(x,y,width,height);
}

Finger.prototype = {

  setSize:function(x,y,width,height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  },

  play:function(){
    var height = this.originalHeight;
    this.height = Math.random()*(height/2)+height/6;
    this.fact = (10-Math.random()*20);
    this.draw();
  },

  draw:function(){
    this.ctx.fillStyle = "lightPink";
    this.ctx.strokeStyle = "black";
    this.ctx.lineWidth = 3;
    this.ctx.beginPath();
    this.ctx.moveTo(this.x,this.y);
    this.ctx.lineTo(this.x,this.y-this.height/8);
    this.ctx.quadraticCurveTo(this.x+this.fact , this.y-this.height, this.x + this.width/2, this.y-this.height);
    this.ctx.lineTo(this.x+this.width/2,this.y-this.height);
    this.ctx.quadraticCurveTo(this.x+this.width-this.fact , this.y-this.height, this.x + this.width, this.y-this.height/8);
    this.ctx.lineTo(this.x+this.width,this.y);
    this.ctx.closePath();
    this.ctx.stroke();
    this.ctx.fill();


    this.ctx.fillStyle = "red";
    this.ctx.roundRect(this.x+this.width/5,this.y-this.height,this.width*2/3,this.width,30,true,true);

  }

}
