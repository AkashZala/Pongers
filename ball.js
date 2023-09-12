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

    clear() {
        c.clearRect(0, 0, canvas.width, canvas.height)
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

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

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

        if (leftBall < paddleLeft.position.x + (paddleLeft.width / 2)) {
            this.velocity.x = -Infinity;
            if (this.velocity.y > 0) {
                this.velocity.y = Infinity;
            } else {
                this.velocity.y = -Infinity;
            }
            gameOver()
        }

        if (rightBall > paddleRight.position.x + (paddleRight.width / 2)) {
            this.velocity.x = Infinity;
            if (this.velocity.y > 0) {
                this.velocity.y = Infinity;
            } else {
                this.velocity.y = -Infinity;
            }
            gameOver()
            
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

    }
}