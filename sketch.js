//Create variables here
var dogImg,happyDog,foodS,db;
var dog,dogSound,addFood;
var lastFed;
var foodCount;

function preload()
{
	//load images here
  happyDog=loadImage("images/dogImg1.png");
  dogImg=loadImage("images/dogImg.png");
  dogSound=loadSound("dogsound.mp3");
}

function setup() {
	createCanvas(1000, 700);

  dog=createSprite(650,350,10,10);
  dog.addImage(dogImg);
  dog.scale=0.3;

  db= firebase.database();
 
  db.ref('Food').on("value",readStock);
  

  food1= new Food();

  addfood= createButton("Add Food For The dog");
  addfood.position(500,100);
  addfood.mousePressed(addFoods);

  feedDog1= createButton("Feed The Dog");
  feedDog1.position(650,100);
  feedDog1.mousePressed(feedDog);
  
  dogName= createInput("Write Your Dog Name");
  dogName.position(500,150);

  //now < 1619202600000
  //"now < 1619202600000
}


function draw() {  

  background(46,139,86);

 feedTime=db.ref('FeedTime');
 feedTime.on("value",(data)=>{
   lastFed=data.val();
 })

food1.display();
 
  //add styles here

  textSize(20);
  fill("white");

  if(lastFed>=12){
    text("Last Fed=" + lastFed%12+ "PM", 500,100 );
  }
  else if(lastFed===0){
    text("Last Fed= 12 AM" ,500, 100 );
  }
  else{
    text("Last Fed= " +lastFed +"AM",500,100);
  }
 // text("Note: Press 'UP' Arrow Key To feed milk to Drago",width/2-200,50);
 // text("Food Remaining="+foodS,width/2+50,height/2-50);
 drawSprites();
}

function addFoods() {
  foodCount++;
  //food1.getFoodStock();
 
  //food1.updateFoodStock(); 
  db.ref('/').update({
    Food: foodCount
  })
 }
 
function feedDog() {
  food1.getFoodStock();
  foodCount--;
  dog.addImage(happyDog);
  dogSound.play();
  db.ref('/').update({FeedTime:hour(),
  Food: food1.getFoodStock()
});

  if(food1.getFoodStock() === 0) {
    food1.updateFoodStock(food1.getFoodStock()*0) ;
  
    dog.addImage(dogImg);
  } else {

    food1.updateFoodStock(food1.getFoodStock()-1);
   
  }
}
 function readStock(data){

  foodCount=data.val();
  food1.updateFoodStock(foodCount);

}






