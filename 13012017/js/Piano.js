// Piano
var Piano = function(ctx,width,height){
  this.ctx = ctx;
  this.width = width;
  this.height = height;
  this.touche = {"nbr":22,"w":width/33};
  this.allFinger = [];
  this.allKeys = [];
  for(var i = 0;i<=this.touche.nbr;i++){
    var key = new Key(ctx,i*this.touche.w*1.5,0,this.touche.w,Math.random()*this.height/2+this.height/10,this.height);
    this.allKeys.push(key);
    var finger = new Finger(ctx,(i-1)*this.touche.w*1.5 - (this.touche.w/4), this.height, this.touche.w*1.5,Math.random()*(this.height/2-this.height/4)+this.height/3);
    finger.originalHeight = this.height;
    this.allFinger.push(finger);
  }
}

Piano.prototype = {

  update:function(){

  },

  play:function(e){
    if(e.type =="keydown"){
      this.allFinger[Math.floor(Math.random()*this.allFinger.length)].play();
    }else{
      //find which finger is the nearest
      //
      //tempo solution
      this.allFinger[Math.floor(Math.random()*this.allFinger.length)].play();
    }
  },

  draw:function(){
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(0,0,this.width,this.height);

    for(var i = 0;i<=this.touche.nbr;i++){
      //KEYS
      this.allKeys[i].draw();
      //FINGERS
      this.allFinger[i].draw();
    }
  }



}
