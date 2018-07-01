
var projectionFore;
var projectionBack;
var projectionDistant;
var player;
var x=0;
var y=0;
function setup(){
  createCanvas(400, 400);
  projectionFore = new Projection(50,1);
  projectionBack = new Projection(200,0.2);
  projectionDistant = new Projection(20, 0.5);
  player = new Player(projectionFore);
}


function draw(){
  background(20);
  checkInput();
  // console.log("X:",x," Y:",y);
  projectionFore.render();
  player.render();
  projectionBack.render();
  projectionDistant.render();
  connectingLines(projectionFore, projectionBack);
  connectingLines(projectionFore, projectionDistant);

  blockOutside(projectionBack);
  fill(255);
  text("X: "+x, 300, 340, 400, 400);
  text("Y: "+y, 300, 350, 400, 400);
}


// ===============================
// Function to connect the lines
// ===============================
function connectingLines(rect1, rect2){
  push();
  translate(200, 200);
  stroke(255);
  // top right
  line(rect1.tr[0], rect1.tr[1], rect2.tr[0], rect2.tr[1]);
  // top left
  line(rect1.tl[0], rect1.tl[1], rect2.tl[0], rect2.tl[1]);
  // bottom right
  line(rect1.br[0], rect1.br[1], rect2.br[0], rect2.br[1]);
  // bottom left
  line(rect1.bl[0], rect1.bl[1], rect2.bl[0], rect2.bl[1]);
  pop();
}

function blockOutside(biggerRect){
  push();
  translate(200, 200);
  fill(255);
  // block top
  beginShape();
  vertex(-200,-200);
  vertex(200,-200);
  vertex(biggerRect.tr[0], biggerRect.tr[1]);
  vertex(biggerRect.tl[0], biggerRect.tl[1]);
  endShape();

  // block Right
  beginShape();
  vertex(-200,-200);
  vertex(-200,200);
  vertex(biggerRect.bl[0], biggerRect.bl[1]);
  vertex(biggerRect.tl[0], biggerRect.tl[1]);
  endShape();

  fill(0);
  // block Bottom
  beginShape();
  vertex(-200,200);
  vertex(200,200);
  vertex(biggerRect.br[0], biggerRect.br[1]);
  vertex(biggerRect.bl[0], biggerRect.bl[1]);
  endShape();

  // block right
  beginShape();
  vertex(200,200);
  vertex(200,-200);
  vertex(biggerRect.tr[0], biggerRect.tr[1]);
  vertex(biggerRect.br[0], biggerRect.br[1]);
  endShape();

  pop();
}

// =============
// Player Object
// =============
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
      this.x+=(x/this.container.width)*this.container.speedFactor*Math.min(Math.abs(this.container.tr[0]-this.x),Math.abs(this.container.tl[0]-this.x))*0.1+(this.container.x-this.x)*0.05;
    }

    // For mouse Y
    if(!((Math.abs(this.y)+this.container.width/2>(150+this.container.width/10))  && (Math.abs(this.y+y))>(150+this.container.width/10))){
      if(Math.abs(y)>200)
        y=0;
      this.y+=(y/this.container.width)*this.container.speedFactor*Math.min(Math.abs(this.container.tr[1]-this.y),Math.abs(this.container.br[1]-this.y))*0.1+(this.container.y-this.y)*0.05;
    }
  };
};

// =================
// Projection Object
// =================
var Projection = function(width, speedFactor){
  // Speedfactor doesnt seem to change anything when reciprocal fractions are involved eg 0.5 and 2 acts as same
  // Fix that
  this.speedFactor=speedFactor;
  this.x=0;
  this.y=0;
  this.width=width;

  this.tr=[this.x+this.width/2, this.y-this.width/2];
  this.tl=[this.x-this.width/2, this.y-this.width/2];
  this.br=[this.x+this.width/2, this.y+this.width/2];
  this.bl=[this.x-this.width/2, this.y+this.width/2];

  this.render = function(){
    push();
    this.update();
    noFill();
    stroke(255, 255, 255);
    translate(200-this.width/2, 200-this.width/2);
    rect(this.x, this.y, this.width, this.width);
    pop();
  };

  this.changeVertex = function(){
    this.tr=[this.x+this.width/2, this.y-this.width/2];
    this.tl=[this.x-this.width/2, this.y-this.width/2];
    this.br=[this.x+this.width/2, this.y+this.width/2];
    this.bl=[this.x-this.width/2, this.y+this.width/2];
  };
  this.update = function(){
    fill(255);
    // transformedMouseX = map(mouseX, 0, 400, -200, 200);
    // transformedMouseY = map(mouseY, 0, 400, -200, 200);

    // Code for mouse only
    // if(Math.abs(transformedMouseX-this.x)<5 && Math.abs(transformedMouseY-this.y)<5)
    //   return;
    // For mouse X
    if(!((Math.abs(this.x)+this.width/2>(150+this.width/10)) && (Math.abs(this.x+x))>(150+this.width/10))){
      if(Math.abs(x)>200)
        x=0;
      // this.x+=transformedMouseX/this.width*this.speedFactor;
      this.x+=(x/this.width)*this.speedFactor;
    }


    // For mouse Y
    if(!((Math.abs(this.y)+this.width/2>(150+this.width/10))  && (Math.abs(this.y+y))>(150+this.width/10))){
      if(Math.abs(y)>200)
        y=0;
      // this.y+=transformedMouseY/this.width*this.speedFactor;
      this.y+=(y/this.width)*this.speedFactor;
    }
    this.changeVertex();
  };
};


function checkInput(){
  if(keyIsDown(RIGHT_ARROW)){
    x+=2;
    if(keyIsDown(UP_ARROW))
      y-=1;
    else if(keyIsDown(DOWN_ARROW))
      y+=1;
    else 
     y=0;
  }
  else if(keyIsDown(LEFT_ARROW)){
    x-=2;
    if(keyIsDown(UP_ARROW))
      y-=1;
    else if(keyIsDown(DOWN_ARROW))
      y+=1;
    else 
      y=0;
  }
  else if(keyIsDown(UP_ARROW)){
    y-=2;
    if(keyIsDown(LEFT_ARROW))
      x-=1;
    else if(keyIsDown(RIGHT_ARROW))
      x+=1;
    else
      x=0;
  }
  else if(keyIsDown(DOWN_ARROW)){
    y+=2;
    if(keyIsDown(LEFT_ARROW))
      x-=1;
    else if(keyIsDown(RIGHT_ARROW))
      x+=1;
    else
      x=0;
  }
  else{
    x=0;
    y=0;
  }
}

// function keyPressed(){
//   if(key==='w' || key==='W')
//     y-=20;
//   else if(key==='s' || key==='S')
//     y+=20;
//   else if(key==='a' || key==='A')
//     x-=20;
//   else if(key==='d' || key==='D')
//     x+=20;
//   else
//     return;
// }