//important variables
var canvas,ctx,h,w;
var box = 30,fps = 4;
var foodPic = new Image() ;
var dir = "RIGHT" ;
var point = 0; var run;
var music,eat,lose;
var count = false ;

//change in direction on keyboard keypress
document.addEventListener("keydown",direction);

function direction(event) {
    var key = event.keyCode;
    if(key == 37 && dir != "RIGHT") {
        dir = "LEFT";
    } else if(key == 38 && dir != "DOWN") {
        dir = "UP";
    } else if(key == 39 && dir != "LEFT") {
        dir = "RIGHT";
    }else if(key == 40&&dir!= "UP") {
        dir = "DOWN";
    }
}


window.onload = function () {
    
    //canvas work
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    w = canvas.width = Math.floor(window.innerWidth/box)*box - 2*box; 
    h = canvas.height = Math.floor(window.innerHeight/box)*box- 4*box;
   
   //to draw food getting image
   var img =  document.getElementsByTagName("img")[1];
    foodPic.src = img.src;
    
//the score board    
 var  score  = document.getElementById("score");
 
 //design,muisc and animation
music = document.getElementById("music");
eat = document.getElementById("eat");
lose = document.getElementById("lose"); 

//for swiping actions
/*  actual swipe capture */
canvas.addEventListener('touchstart', handleTouchStart, false);

canvas.addEventListener('touchmove', handleTouchMove, false); 

var xDown = null, yDown = null;
 
function getTouches(evt) { 
    return evt.touches  ||  
    evt.originalEvent.touches;
    } 

function handleTouchStart(evt) { 
    const firstTouch = getTouches(evt)[0]; 
    xDown = firstTouch.clientX; 
    yDown = firstTouch.clientY; 
    }
    
function handleTouchMove(evt)   { 
    
    if ( ! xDown || ! yDown ) 
    {  return;  } 
        
    var xUp = evt.touches[0].clientX; 
    var yUp = evt.touches[0].clientY; 
    var xDiff = xDown - xUp; 
    var yDiff = yDown - yUp; 
    
    if ( Math.abs( xDiff ) > Math.abs( yDiff ) )     {
    
    /*Response part*/ 
    
        if ( xDiff>0&&dir!="RIGHT") {
            /* left swipe */ 
           dir = "LEFT";
       } else if ( xDiff<0&&dir!="LEFT") { 
           /* right swipe */ 
           dir = "RIGHT";
       } 
    } 
    else { 
        if ( yDiff >0&&dir!="DOWN") { 
            /* up swipe */ 
            dir = "UP";
        } else  if ( yDiff <0&&dir!="UP") { 
            /* down swipe */ 
            dir = "DOWN";
        } 
    } 
 /* reset values */ 
 xDown = null; yDown = null; 
}

/* end */        
};

//snake body
var snake = [] ;
snake[0] = {
    x:box*3 + box/2,
    y:box*3 + box/2,
};
snake[1] = {
    x:box*2+ box/2,
    y:box*3 + box/2,
};

//new head part
var snakeX = snake[0].x ;
var snakeY = snake[0].y ;

//food location
var food = {
     x : box*5,
     y : box*5,
};

//function to draw everything
function draw()  {
    drawGrid();
    if(count) {
        music.volume = 1;
    }
    
    //draw snake
    for(var i=0;i<snake.length;i++) {
     
 var color = (i===0)?"teal":"#FFDC3F";
   drawArc(snake[i].x,snake[i].y,color);
   
    }    
    
    //directions
    if(dir=="LEFT") {snakeX -= box ;}
    if(dir=="RIGHT") {snakeX += box ;}
    if(dir=="UP") {snakeY -= box ;}
    if(dir=="DOWN") {snakeY += box ;}
    
    // new head co-ordinates
    var newHead = {
       x : snakeX ,
       y : snakeY,
    };
    
     //adding new head
    snake.unshift(newHead);
    
    //increment of point if yes we add tail else we dont
    if(food.x==snake[0].x - box/2 && food.y==snake[0].y - box/2 ) {
     point++;
     score.innerText = point ;
     if(count) {    
     eat.volume = 1; eat.play();
     }
    }else{
        snake.pop();
    }
        
    //draw food
    drawFood();
    
    //check for game over conditions
    if(snakeX < 0||snakeX > w||snakeY < 0||snakeY > h||collision(snake)){
        clearInterval(run);

document.getElementById("playAgain").style.transform="scale(1)";
document.getElementById("playAgain").style.animation="pop .4s linear";
document.getElementById("canvas").style.filter="blur(1px)"; 


if(count) {    
     lose.volume = 1; lose.play();
     music.volume = 0;
     }

    }    
    
}

//function to draw grid
function drawGrid() { 

//to clear the canvas
ctx.fillStyle = "#37474F";
ctx.fillRect(0, 0, w, h);

for(var i = 0;i<=h/box ;i++)  {
  //vertical lines
     ctx.setLineDash([1, 0.5]);        
     ctx.beginPath(); 
     ctx.strokeStyle = "#efefef";
     ctx.moveTo(0,box*i); 
     ctx.lineTo(w,box*i); 
     ctx.stroke();
     ctx.closePath();
 
  }
for(var i = 0;i<=w/box ;i++) {
    //horizontal lines     
     ctx.beginPath(); 
     ctx.strokeStyle = "#efefef";
     ctx.moveTo(box*i,0); 
     ctx.lineTo(box*i,h); 
     ctx.stroke();
}  

}
//function to draw snake body
function drawArc(x, y, color){
    var r = box/2 - 4;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x,y,r,0,Math.PI*2,true);
    ctx.closePath();
    ctx.fill();
}

//function to draw food
function drawFood () {
        
    var isOkay = true ;
    //to check if food is not being printing on the snake
    for(var i=1;i<snake.length;i++) {
     
       if(food.x==snake[i].x - box/2 && food.y==snake[i].y - box/2 ) {
           isOkay = false ; break;
       }
    }
    
    //if all fine then draw else change co ordinates
    if(isOkay ) {
    ctx.drawImage(foodPic,food.x,food.y); } else {
    food.x =  Math.floor(Math.random()*((w/box)-1))*box;
     food.y =  Math.floor(Math.random()*((h/box)-1))*box;
        drawFood ();
    }
}

//to check if snake collides with its body
function collision(array){
    for(let i = 1; i < array.length; i++){
        if(array[0].x == array[i].x && array[0].y == array[i].y){
            return true;
        }
    }
    return false;
}

//to start the game
function game() {
    run = setInterval(draw,1000/fps);
    document.getElementById("instruction").style.transform="scale(0)";
document.getElementsByClassName("container")[0].style.filter="blur(0)";        
}
//to play again
function playAgain() {

dir = "RIGHT" ; point = 0; 
//snake body
snake = [] ;
snake[0] = {
    x:box*3 + box/2,
    y:box*3 + box/2,
};
snake[1] = {
    x:box*2+ box/2,
    y:box*3 + box/2,
};

//new head part
snakeX = snake[0].x ;
snakeY = snake[0].y ;

//food location
food = {
     x : box*5,
     y : box*5,
};
 run = setInterval(draw,1000/fps);
    document.getElementById("playAgain").style.transform="scale(0)";   
document.getElementById("canvas").style.filter="blur(0)"; 
}

//To control sound
function playSound() {
   count = true;
    music.play();
    eat.play();   eat.volume = 0;
    lose.play();  lose.volume = 0;
    document.getElementById("sound").style.visibility="visible";
document.getElementById("nosound").style.visibility="hidden";    
}
function noPlaySound() {
   count = false;
   music.volume = 0;
   eat.volume = 0;
   lose.volume = 0;
   document.getElementById("sound").style.visibility="hidden";
document.getElementById("nosound").style.visibility="visible";   
}


