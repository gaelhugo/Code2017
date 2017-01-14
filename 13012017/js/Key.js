var Key = function(ctx,x,y,width,height,wh){
  this.ctx = ctx;
  this.x = x;
  this.y = y;
  this.width=width;
  this.height=height;
  this.originalHeight=wh;
}

Key.prototype = {

  draw:function(){
    this.ctx.fillStyle = "black";
    this.ctx.beginPath();
    this.ctx.fillRect(this.x,0,this.width,this.height);
    this.ctx.fillRect(this.x - this.width,0,2,this.originalHeight);
    this.ctx.closePath();
  }
}
