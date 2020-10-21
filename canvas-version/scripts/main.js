let canvas, ctx, W, H, column, row, fps = 6, run;
let snake, food, dir = "RIGHT", score, scoreDom;
let snakeBodySize = 35, snakeHeadColor = "lightgreen";

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
    scoreDom = document.getElementById("score");
    score = 0;

    // creating snake
    snake = new Snake();

    // creating snake food
    makeFood();

    //drawing function
    run = setInterval(draw, 1000 / fps);
}

function draw() {
    //clearing canvas
    ctx.fillStyle = '#333333';
    ctx.fillRect(0, 0, W, H);

    // grid
    // for (let i = 0; i < column; i++) {
    //     for (let j = 0; j < row; j++) {
    //         let obj = {
    //             x: i * snakeBodySize,
    //             y: j * snakeBodySize,
    //         }
    //         drawRect(obj, "#333");
    //     }

    // }

    // snake animation
    snake.update();
    if (snake.collision()) {
        clearInterval(run);
    }
    drawRect(food, "#ff1c4a");
    for (let i = 0; i < snake.tail.length; i++) {
        if (i == 0) {
            drawRect(snake.tail[i], snakeHeadColor);
        } else {
            drawRect(snake.tail[i]);
        }

    }

    //  requestAnimationFrame(draw);
}


const makeFood = () => {
    food = {
        x: ran(0, column - 1) * snakeBodySize,
        y: ran(0, row - 1) * snakeBodySize,
    }
}