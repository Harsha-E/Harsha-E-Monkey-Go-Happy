
var monkey , monkey_running;
var bananaSprite ,bananaImage, obstacleSprite, obstacleImage;
var BananaGroup, obstacleGroup;
var Score;
var wonimg;
var land;
var overimg;
var bg, bgimg;

function preload(){
  
  
  monkey_running =            loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  
  wonimg = loadImage("wonimg.png");
  
  overimg = loadImage("gameover.jpg");
  
  bg = loadImage("bg.jpg");
  
  land = loadImage("land.png");
}

function setup() {

  bgimg = createSprite(400,430,900,10);
  bgimg.addImage(bg);
  bgimg.scale = 2.2;
  bgimg.velocityX=-4;
  
  ground = createSprite(400,525,900,10);
  ground.addImage(land);
  ground.scale = 4;
  ground.velocityX=-4;
  ground.x=ground.width/2; 

  var survivalTime=0;
  
  //creating monkey
   monkey=createSprite(100,315,20,20);
   monkey.addAnimation("moving", monkey_running);
  // monkey.addImage(bananaImage)
   monkey.scale=0.1
  
  BananaGroup = new Group();
  ObstaclesGroup = new Group();

  score = 0;
 
  
}


function draw() {
  
  background(bg);
  
    if (bgimg.x < 0){
      bgimg.x = bgimg.width/2;
      console.log("bgimg");
    }
  
    if (ground.x < 0){
      ground.x = ground.width/2;
      console.log("ground");
    }
  
  if(keyDown("H")){
    monkey.scale= 0.12500000;
  }  
  
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  if(monkey.isTouching(BananaGroup)){
    monkey.scale = monkey.scale + 0.0102;
    BananaGroup.destroyEach();
  }
  
  
  if(monkey.isTouching(ObstaclesGroup)){
  //  monkey.scale = monkey.scale - 0.011;
    
    ObstaclesGroup.destroyEach();
  }
   
    if(keyDown("space") && monkey.y >= 300) {
       if(monkey.scale <= 0.35){
      monkey.velocityY = -13;
    }}
    monkey.velocityY = monkey.velocityY + 0.5;
    
    monkey.collide(ground);   
    spawnBanana();
    spawnObstacles();
 
  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);        
  
  
    if(ObstaclesGroup.isTouching(monkey)){
        monkey.scale = monkey.scale -11122124490;
        ground.velocityX = 0;
        monkey.velocityY = 0;
        ObstaclesGroup.setVelocityXEach(0);
        BananaGroup.setVelocityXEach(0);
        ObstaclesGroup.setLifetimeEach(-1);
        BananaGroup.setLifetimeEach(-1);
        text(score,200,200);
    
    }
  
  stroke("black");
  textSize(20);
  fill("white");
  survivalTime=Math.round(frameCount/66) 
  text("Survival Time: "+ survivalTime, 200,35);
  
  
  if(monkey.scale >= 0.1320000){
   //monkey.addImage(wonimg);
   //monkey.x=200;
   //monkey.y=200;
    
    background(wonimg);
    
       BananaGroup.velocityX = 5;
    
    ObstaclesGroup.velocityX = 5;
    
    survivalTime = 0;
    
       BananaGroup.destroyEach();
    
    ObstaclesGroup.destroyEach();
    }
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  if(monkey.scale < 0.089){
   //monkey.addImage(wonimg);
   //monkey.x=200;
   //monkey.y=200;
    
    background(overimg);
    
       BananaGroup.velocityX = 5;
    
    ObstaclesGroup.velocityX = 5;
    
    survivalTime = 0;
    
       BananaGroup.destroyEach();
    
    ObstaclesGroup.destroyEach();
    }
  }



function spawnBanana() {
  //write code here to spawn the Food
  if (frameCount % 80 === 0) {
    bananaSprite = createSprite(600,250,40,10);
    bananaSprite.y = random(120,200);    
    bananaSprite.velocityX = -6;
    
     //assign lifetime to the variable
    bananaSprite.lifetime = 300;
    monkey.depth = bananaSprite.depth + 1;
    
    //add image of banana
     bananaSprite.addImage(bananaImage);
     bananaSprite.scale=0.05;
    
    //add each banana to the group
    BananaGroup.add(bananaSprite);
  }
}

function spawnObstacles() {
  if(frameCount % 150 === 0) {
    obstacleSprite = createSprite(800,320,10,40);
    obstacleSprite.velocityX = -6;
    
    //add image to the obstacle 
    obstacleSprite.addImage(obstaceImage);
    obstacleSprite.scale=0.15;
    
    //lifetime to the obstacle     
    obstacleSprite.lifetime = 300;
    
    //add each obstacle to the group
    ObstaclesGroup.add(obstacleSprite);
  }
}
