const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 300;

const paddleLeft = new Paddle({
    position: {
        x: 5,
        y: (canvas.height / 2) - ((canvas.height / 5) / 2)
    },
});

const paddleRight = new Paddle({
    position: {
        x: canvas.width - 15,
        y: (canvas.height / 2) - ((canvas.height / 5) / 2)
    },
});

const ball = new Ball({
    position: {
        x: canvas.width / 2 - 4,
        y: canvas.height / 2 - 4
    },
});

function animate() {
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.width);
    paddleLeft.update();
    paddleRight.update();
    ball.update();
}

let isPaused = false;
let isGameOver = false;

function loop() {
    if (isPaused) {
        return
    }
    animate();
    window.requestAnimationFrame(loop)
}

function start() {
    isPaused = false;
    c.clearRect(0, 0, canvas.width, canvas.height)
    canvas.style.opacity = 1;
    loop();
}

function stop() {
    isPaused = true;
    canvas.style.opacity = .7;
    c.font = "50px verdana";
    c.fillStyle = 'whitesmoke';
    c.textAlign = 'center';
    c.textBaseline = 'center';
    c.fillText('Paused', canvas.width / 2, canvas.height / 2)
}

function gameOver() {
    isGameOver = true;
    canvas.style.opacity = .7;
    c.font = "50px verdana";
    c.fillStyle = 'whitesmoke';
    c.textAlign = 'center';
    c.textBaseline = 'center';
    c.fillText('Game Over', canvas.width / 2, canvas.height / 2)
}

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
        case 'n':
            null;
            break;
    }
    
    if (event.key === " ") {
            if (!isPaused && !isGameOver) {
                stop();
            } else {
                start();
            }
        }
});

loop();

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
