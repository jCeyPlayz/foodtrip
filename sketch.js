
//restart image
 var gameoverimg

//sword, fruit, alien images
var alienimg2
var alienimg
var fruitimg
var fruitimg2
var fruitimg3
var fruitimg4

//gamestates
var PLAY=1;
var END=0;
var gameState=PLAY;

//groups
var fruitGroup
var enemyGroup

//score
var score=0;

//knife/image
var sword
var swordimg 

//sound
var sound

function preload(){
  alienimg=loadImage("alien1.png")
  alienimg2=loadImage("alien2.png")
  fruitimg=loadImage("fruit1.png")
  fruitimg2=loadImage("fruit2.png")
  fruitimg3=loadImage("fruit3.png")
  fruitimg4=loadImage("fruit4.png")
  
  swordimg=loadImage("sword.png")
  
  gameoverimg=loadImage("gameover.png")
  
  sound=loadSound("gameover.mp3")
  sound2=loadSound("knifeSwooshSound.mp3")
}

function setup() {
   createCanvas(400, 400);
  //groups
    fruitGroup=createGroup();
    enemyGroup=createGroup();
    
  //knife stuff
    sword=createSprite(200,200)
    sword.addImage(swordimg)
    sword.scale=0.5
  
 score=0;
   
}

function draw(){
   background(135,206,235);
  //score text 
    text("score "+ score, 200, 20)
  
  
  
  
  if(gameState===PLAY){
    
  sword.addImage(swordimg)
  sword.scale=0.7
    
  //spawn fruits and enemies  
    enemy();
    fruits();
    
  //sword movement
    sword.y=World.mouseY
    sword.x=World.mouseX
  
  //fruit slashing
  if(sword.isTouching(fruitGroup)){
     sound2.play()
     score=score+2
     fruitGroup.destroyEach()
  }


         if(sword.isTouching(enemyGroup)){
     sound.play()
     gameState=END;
  }
  
  }

  if(gameState===END){
       
     enemyGroup.destroyEach();
     fruitGroup.destroyEach();
    
   //sword END
     sword.addImage(gameoverimg)
     sword.scale=1
     sword.x=200
     sword.y=200
    
   //RESET
    text("PRESS R TO RESTART", 200, 230)
   if(keyDown("R")){
      score=0;
      gameState=PLAY;
   }
  
  }
  drawSprites();
}

function fruits(){
  if(World.frameCount%80===0){
     fruit=createSprite(400, 200, 20,20)
  //fruit debug=true
    r=Math.round(random(1,4));
  if(r == 1){
      fruit.addImage(fruitimg);
    } else if (r == 2){
      fruit.addImage(fruitimg2);
    } else if (r == 3){
      fruit.addImage(fruitimg3);
    } else {
      fruit.addImage(fruitimg4);
    }
    fruit.y=Math.round(random(50, 340));
    fruit.scale=0.3
    fruit.velocityX=-7
    fruit.setLifetime=100;
    fruitGroup.add(fruit)
      
    position=Math.round(random(1,2));
    
    if (position==1)
      { 
      fruitGroup.x=400;
      fruitGroup.velocityX-(7+(score/4));
      }
      else
      {
        if(position==2){
           fruitGroup.x=0;
      
    //increases velocity of fruits
      fruitGroup.velocityX=(7+(score/4))
        }
      }       
  }
}

function enemy(){
  if (World.frameCount%200===0){
    monster=createSprite(400,200,20,20)
    monster.addAnimation("moving", alienimg)
    monster.y=Math.round(random(100,300));
    monster.velocityX=-(8+(score/10))
    monster.setLifetime= 50
    enemyGroup.add(monster)
  }
  
}