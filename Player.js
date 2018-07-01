

var Player = function(container){
  this.x=0;
  this.y=0;
  this.container=container;
  this.render=function(){
    push();
    this.update();
    translate(200, 200);
    ellipse(this.x, this.y, 10, 10);
    pop();
  };

  this.update = function(){
    if(!((Math.abs(this.x)+this.container.width/2>(150+this.container.width/10)) && (Math.abs(this.x+x))>(150+this.container.width/10))){
      if(Math.abs(x)>200)
        x=0;
      this.x+=(x/this.container.width)*this.container.speedFactor*0.8;
    }

    // For mouse Y
    if(!((Math.abs(this.y)+this.container.width/2>(150+this.container.width/10))  && (Math.abs(this.y+y))>(150+this.container.width/10))){
      if(Math.abs(y)>200)
        y=0;
      this.y+=(y/this.container.width)*this.container.speedFactor*0.8;
    }
  };
};

export {Player};