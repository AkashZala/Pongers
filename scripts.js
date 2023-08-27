const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 500;
canvas.height = 300;

class Paddle {
    constructor({ position }) {
        this.position = position;
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 10;
        this.height = 75;
    }

    draw() {
        c.fillStyle = 'whitesmoke';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    };

    update() {
        this.draw()

        if (this.position.y + this.velocity.y > 0 && this.position.y + this.height + this.velocity.y < canvas.height) {
            this.position.y += this.velocity.y;
        }
    }
}

class Ball {
    constructor({ position }) {
        this.position = position;

        const speed = 2;
        const direction = {
            x: Math.random() - .5 >= 0 ? -speed : speed,
            y: Math.random() - .5 >= 0 ? -speed : speed
        }
        this.velocity = {
            x: direction.x,
            y: direction.y

        }
        this.height = 8;
        this.width = 8;
    }
    draw() {
        c.beginPath();
        c.arc(this.position.x + 3, this.position.y + 4, 4, 0, Math.PI * 2);
        c.fillStyle = 'whitesmoke';
        c.strokeStyle = 'whitesmoke';
        c.stroke();
        c.fill();
        c.closePath();

        //  if you want a square "ball" 
        //  c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.draw();

        const rightBall = this.position.x + this.velocity.x + this.width
        const leftBall = this.position.x + this.velocity.x
        const bottomBall = this.position.y + this.height;
        const topBall = this.position.y;

        // Paddle collision
        if (rightBall >= paddleRight.position.x &&
            bottomBall >= paddleRight.position.y &&
            topBall <= paddleRight.position.y + paddleRight.height
        ) {
            this.velocity.x = -this.velocity.x;
        }

        if (leftBall <= paddleLeft.position.x + paddleLeft.width &&
            bottomBall >= paddleLeft.position.y &&
            topBall <= paddleLeft.position.y + paddleLeft.height
        ) {
            this.velocity.x = -this.velocity.x;
        }

        if (rightBall < paddleLeft.position.x) {
            this.velocity.x = -Infinity;
            if (this.velocity.y > 0) {
                this.velocity.y = Infinity;
            } else {
                this.velocity.y = -Infinity;
            }
        }

        if (leftBall > paddleRight.position.x + paddleRight.width) {
            this.velocity.x = Infinity;
            if (this.velocity.y > 0) {
                this.velocity.y = Infinity;
            } else {
                this.velocity.y = -Infinity;
            }
        }

        // Top and Bottom wall collision
        if (this.position.y + this.velocity.y + this.height >= canvas.height ||
            this.position.y + this.velocity.y <= 0) {
            this.velocity.y = -this.velocity.y;
        }

        // OOB ball stop
        if (rightBall < -5 || leftBall >= canvas.width + 5) {
            this.velocity.x = 0;
            this.velocity.y = 0;
        }

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}

const paddleLeft = new Paddle({
    position: {
        x: 5,
        y: (canvas.height / 2) - 37
    },
});

const paddleRight = new Paddle({
    position: {
        x: canvas.width - 15,
        y: (canvas.height / 2) - 37
    },
});

const ball = new Ball({
    position: {
        x: canvas.width / 2 - 4,
        y: canvas.height / 2 - 4
    },
});

function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.width);
    paddleLeft.update();
    paddleRight.update();

    ball.update();
}

animate();

addEventListener('keydown', (event) => {
    const speed = 5;
    switch (event.key) {
        case 'w':
            paddleLeft.velocity.y = -speed;
            break;
        case 's':
            paddleLeft.velocity.y = speed;
            break;
        case 'ArrowUp':
            paddleRight.velocity.y = -speed;
            break;
        case 'ArrowDown':
            paddleRight.velocity.y = speed;
            break;
        case ' ':
            location.reload()
            break;
    }
});

addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'w':
            paddleLeft.velocity.y = 0;
            break;
        case 's':
            paddleLeft.velocity.y = 0;
            break;
        case 'ArrowUp':
            paddleRight.velocity.y = 0;
            break;
        case 'ArrowDown':
            paddleRight.velocity.y = 0;
            break;
    }
});

