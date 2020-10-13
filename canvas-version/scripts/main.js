var canvas, ctx, W, H, column, row, fps = 5;
var snake, food, dir = "RIGHT";

//event listeners for onload & resize
window.addEventListener('resize', init);
window.addEventListener('load', init);

//change in direction on keyboard keypress
document.addEventListener("keydown", direction);

function direction(event) {
    var key = event.keyCode;
    if (key == 37 && dir != "RIGHT") {
        dir = "LEFT";
    } else if (key == 38 && dir != "DOWN") {
        dir = "UP";
    } else if (key == 39 && dir != "LEFT") {
        dir = "RIGHT";
    } else if (key == 40 && dir != "UP") {
        dir = "DOWN";
    }
    snake.changeVelocity(dir);
    console.log(snake.velocityY);
}
//initial function,
function init() {
    //setting things up
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    column = Math.floor(W / snakeBodySize);
    row = Math.floor(H / snakeBodySize);

    // creating snake
    snake = new Snake();
    console.log(snake.velocityY)

    // creating snake
    food = {
        x: 0,
        y: 0,
        color: "#ff1c4a"
    }
    //drawing function
    setInterval(draw, 1000 / fps);
}

function draw() {
    //clearing canvas
    ctx.fillStyle = '#333333';
    ctx.fillRect(0, 0, W, H);

    // snake animation
    snake.update();
    for (let i = 0; i < snake.tail.length; i++) {
        drawRect(snake.tail[i]);
    }
    drawRect(food);
    // requestAnimationFrame(draw);
}
