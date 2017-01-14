var Eye = function(ctx){
  this.ctx = ctx;
  this.x = 0;
  this.y = 0;
  this.height = 7;
  this.ratio = 1;
  this.width = 15;
  this.angle = 0;
  this.blink = false;
}

Eye.prototype = {

  setup:function(){
    this.ctx.strokeStyle = "black";
  },

  setBlink:function(){
    if(Math.random()>0.95){
      this.blink = true;
      this.blinkAngle = 0;
    }
  },

  update:function(mouse){
    //this.angle+=0.01;
    var diffX = (mouse.x-window.innerWidth/2)/100;
    this.deltaEye = Math.sin(this.angle+diffX);

    //blinking
    if(this.blink){
      this.blinkAngle+=(this.ratio*4);
      this.point = (this.y+ Math.cos(this.blinkAngle*Math.PI/180)*this.height )*this.ratio;
      if(this.blinkAngle>=360){
        this.blink = false;
        this.limit = Math.round(Math.random()*10);
      }
    }else{
      this.point = (this.y+this.height)*this.ratio;
    }
  },

  draw:function(){

    //drawOutline
    this.ctx.beginPath();
    this.ctx.fillStyle = "white";
    this.ctx.moveTo((this.x-this.width/2)*this.ratio,this.y);
    this.ctx.quadraticCurveTo(this.x,(this.y-this.height)*this.ratio,(this.x+this.width/2)*this.ratio,this.y);
    this.ctx.quadraticCurveTo(this.x,this.point,(this.x-this.width/2)*this.ratio,this.y);
    this.ctx.stroke();
    this.ctx.fill();
    this.ctx.closePath();

    //drawPupile
    this.ctx.beginPath();
    this.ctx.fillStyle = "black";
    this.ctx.arc(this.x + this.deltaEye*(this.width/3)*this.ratio,this.y,(this.height/3)*this.ratio,0,Math.PI*2,false);
    this.ctx.fill();
    this.ctx.closePath();

  }

}
