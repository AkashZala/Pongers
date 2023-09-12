class Paddle {
    constructor({ position }) {
        this.position = position;
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 10;
        this.height = canvas.height / 5;
    }

    clear() {
        c.clearRect(0, 0, canvas.width, canvas.height)
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