class Snake {
    constructor() {
        this.velocityX = 1;
        this.velocityY = 0;
        this.tail = [];
        let head = {
            x: 0,
            y: 0,
        }
        this.tail.push(head);
    }

    update = () => {
        let currentHead = this.tail[0];
        let newHead = {
            x: 0,
            y: 0,
        };

        if (currentHead.x == food.x && currentHead.y == food.y) {
            score++;
            scoreDom.innerText = "Score :  " + score;
            makeFood();
        } else {
            newHead = this.tail.pop();
        }
        newHead.x = currentHead.x + this.velocityX * snakeBodySize;
        newHead.y = currentHead.y + this.velocityY * snakeBodySize;

        if (newHead.x >= column * snakeBodySize) {
            newHead.x = 0;
        } else if (newHead.x < 0) {
            newHead.x = (column - 1) * snakeBodySize;
        }
        if (newHead.y >= row * snakeBodySize) {
            newHead.y = 0;
        } else if (newHead.y < 0) {
            newHead.y = (row - 1) * snakeBodySize;
        }
        this.tail.unshift(newHead);
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

    collision = () => {
        for (let i = 1; i < this.tail.length; i++) {
            let head = this.tail[0];
            if (head.x == this.tail[i].x && head.y == this.tail[i].y) {
                return true;
            }
        }
    }
}

const drawRect = (obj, color = "#fff") => {
    ctx.beginPath();
    ctx.lineWidth = "1";
    ctx.strokeStyle = "#262626";
    ctx.fillStyle = color;
    ctx.rect(obj.x, obj.y, snakeBodySize, snakeBodySize);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}

const ran = (min = 0, max = 1) => {
    return Math.floor(Math.random() * (max - min) + min);
}
