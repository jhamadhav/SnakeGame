const snakeBodySize = 40;
class Snake {
    constructor() {
        this.velocityX = 1;
        this.velocityY = 0;
        this.tail = [];
        let head = {
            x: 0,
            y: 0,
            bodyType: "head",
            color: "#fff"
        }
        this.tail.push(head);
    }

    update = () => {
        let currentHead = this.tail[0];
        let newHead;
        if (currentHead.x == food.x && currentHead.y == food.y) {
            newHead = {
                x: food.x * snakeBodySize,
                y: food.y * snakeBodySize,
                bodyType: "head",
                color: "#fff"
            }
            food = {
                x: ran(0, column - 1),
                y: ran(0, row - 1),
                color: "#ff1c4a"
            }
            this.tail.push(newHead)
        } else {
            newHead = this.tail.pop();
            newHead.x += this.velocityX * snakeBodySize;
            newHead.y += this.velocityY * snakeBodySize;
        }
        if (newHead.x >= W) {
            newHead.x = 0;
        } else if (newHead.x < 0) {
            newHead.x = W - snakeBodySize;
        }
        if (newHead.y >= H) {
            newHead.y = 0;
        } else if (newHead.y < 0) {
            newHead.y = H - snakeBodySize;
        }
        this.tail.push(newHead);
    }

    changeVelocity = (value) => {
        if (value == "LEFT") {
            this.velocityX = -1;
            this.velocityY = 0;
        } else if (value == "RIGHT") {
            this.velocityX = 1;
            this.velocityY = 0;
        }

        if (value == "UP") {
            this.velocityX = 0;
            this.velocityY = -1;
        } else if (value == "DOWN") {
            this.velocityX = 0;
            this.velocityY = 1;
        }
    }
}

const drawRect = (obj) => {
    ctx.beginPath();
    ctx.lineWidth = "1";
    ctx.strokeStyle = "#262626";
    ctx.fillStyle = obj.color;
    ctx.rect(obj.x, obj.y, snakeBodySize, snakeBodySize);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}

const ran = (min = 0, max = 1) => {
    return Math.random() * (max - min) + min;
}