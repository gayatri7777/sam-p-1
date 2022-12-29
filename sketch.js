var shuttle, shuttleImg;
var bg,bgImg;
var enemy1,enemy1Img,enemy2,enemy2Img;
var beamImg,beam;
var score;
var Play = 1;
var End = 2;
var gameOver,gameOverImg;
var restart,restartImg;
var gameState = Play;

function preload(){
  bgImg = loadImage("./assets/bg.png");
  shuttleImg = loadImage("./assets/shuttle.png");
  enemy1Img = loadImage("./assets/enemy1.png");
  enemy2Img = loadImage("./assets/enemy2.png");
  beamImg = loadImage("./assets/beam.png");
  gameOverImg = loadImage("./assets/gameOver.png");
  restartImg = loadImage("./assets/restart.png");
}

function setup() {
  createCanvas(800,400);
 // createSprite(400, 200, 50, 50);

    shuttle = createSprite(400,300,20,20);
    shuttle.addImage(shuttleImg);
    shuttle.scale =0.15;

    gameOver = createSprite(300,300,60,60);
    gameOver.addImage(gameOverImg);
    gameOver.scale = 1;

    restart = createSprite(500,500,50,59);
    restart.addImage(restartImg);
    restart.scale = 1; 
    
    
    enemy1G = new Group();
    enemy2G = new Group();
    beamG = new Group();
    score = 0;


}

function draw() {
  background(bgImg);  
 
  fill("red");
  stroke("black");
  text("score:"+score,700,30);
  

  if (gameState === Play){
      
    gameOver.visible = false;
    restart.visible = false;

    if (keyDown("left")){
      shuttle.x = shuttle.x-2;
     }
     if (keyDown("right")){
      shuttle.x = shuttle.x+10;
     }
     if (keyDown("space")){
      createBeams();
     }
     if(beamG.isTouching(enemy1G)){
       enemy1G.destroyEach();
       beamG.destroyEach();
       score += 1
     }
    
    if(beamG.isTouching(enemy2G)){
      enemy2G.destroyEach();
      beamG.destroyEach();
      score += 1
    }
  
    
  }

  if (gameState === 2){
    
    
    enemy1G.setVelocityXEach(0);
    enemy2G.setVelocityXEach(0);
    gameOver.visible = true;
    restart.visible = true;
 }

 if (mousePressedOver(restart)){
  reset();
}


shuttle.depth = shuttle.depth+1;

   spawnEnemy1();
   spawnEnemy2();
 
  drawSprites();
}

function spawnEnemy1(){
  if (frameCount % 500 === 0){
      enemy1 = createSprite(800,random(300,400),20,30);
      enemy1.velocityY = +5;
      enemy1.addImage(enemy1Img);
      enemy1.scale = 0.001;
      enemy1G.add(enemy1);
  }
}

function spawnEnemy2(){
  if (frameCount % 500 === 0){
      enemy2 = createSprite(800,random(20,500),20,30);
      enemy2.velocityY = +5;
      enemy2.addImage(enemy2Img);
      enemy2.scale = 0.2;
      enemy2G.add(enemy2);
  }
}

function createBeams(){
  beam = createSprite(shuttle.x+20,shuttle.y-30,20,20);
     beam.addImage(beamImg);
     beam.scale =0.1;
     beam.velocityY = -9;
     beamG.add(beam);
     
 }
 function reset(){
   gameState = Play;
   enemy1G.destroyEach();
   enemy2G.destroyEach();
   gameOver.visible = false;
   restart.visible = false;
   score = 0;
 }
 