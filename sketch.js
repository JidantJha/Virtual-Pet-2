var dog,dogImage,happydogImage,food,foodStock;
var feed,addfood;
var feedTime,lastFeed;
var FoodObj;

function preload()
{
  dogImage=loadImage("images/dogImg.png");
  happydogImage=loadImage("images/dogImg1.png");
}
function setup() {
  createCanvas(800, 700);
  database = firebase.database();
  
  foodObj=new Food();

  dog=createSprite(250,350,10,60);
  dog.addImage(dogImage);
  dog.scale=0.2;

  feed=createButton("Add Food");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addfood)
}



function draw() {  
  background("green");

  foodTime=database.ref("FoodTime");
  foodTime.on("value",function(data){
    lastFood=data.val()
  })

  
    
    fill(255);
    textSize(20);
    if(lastFeed>=12){
      text("Last Feed:"+lastFeed%12+"PM",350,30);
    }else if(lastFeed==0){
      text("Last Feed:12 AM",350,30)
    }else{
      text("Last Feed:"+lastFeed+"AM",350,30);
    }
  FoodObj.display();
  drawSprites();

}

function readStock(data){
   food=data.val();
   foodObj.updateFoodStock(food);
}

function feedDog(){
   dog.addImage(happydogImage);
   foodObj.updateFoodStock(foodObj.getFoodObj()-1)
   database.ref("/").update({
     Food:foodObj.getFoodObj(),
     feedTime:hour()
   })
}

function addFood(){
  food++;
  database.ref("/").update({
  Food:food
  })
}