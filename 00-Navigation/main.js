const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scale = 20;
const rows = canvas.height / scale;
const cols = canvas.width / scale;
let snake = [{ x: 10 * scale, y: 10 * scale }];
let food = {
  x: Math.floor(Math.random() * cols) * scale,
  y: Math.floor(Math.random() * rows) * scale,
};
let dx = scale;
let dy = 0;
let changingDirection = false;
let score = 0;

function drawSnake() {
  ctx.fillStyle = "lime";
  for (let segment of snake) {
    ctx.fillRect(segment.x, segment.y, scale, scale);
  }
}

function drawFood() {
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, scale, scale);
}

function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    food = {
      x: Math.floor(Math.random() * cols) * scale,
      y: Math.floor(Math.random() * rows) * scale,
    };
  } else {
    snake.pop();
  }
}

function update() {
  if (!changingDirection) {
    moveSnake();
  }
  changingDirection = false;
  checkCollision();
  draw();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawSnake();
  drawFood();
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 20);
}

function checkCollision() {
  const head = snake[0];
  if (
    head.x < 0 ||
    head.x >= canvas.width ||
    head.y < 0 ||
    head.y >= canvas.height
  ) {
    gameOver();
  }

  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      gameOver();
    }
  }
}

function gameOver() {
  ctx.fillStyle = "white";
  ctx.font = "40px Arial";
  ctx.fillText("Game Over", canvas.width / 4, canvas.height / 2);
  clearInterval(gameLoop);
}

function changeDirection(event) {
  if (changingDirection) return;
  changingDirection = true;

  const keyPressed = event.keyCode;
  if (keyPressed === A && dx === 0) {
    // Left arrow
    dx = -scale;
    dy = 0;
  } else if (keyPressed === W && dy === 0) {
    // Up arrow
    dx = 0;
    dy = -scale;
  } else if (keyPressed === D && dx === 0) {
    // Right arrow
    dx = scale;
    dy = 0;
  } else if (keyPressed === S && dy === 0) {
    // Down arrow
    dx = 0;
    dy = scale;
  }
}

// Debugging: Log key presses
document.addEventListener("keydown", function (event) {
  console.log("Key pressed:", event.keyCode);
  changeDirection(event);
});

const gameLoop = setInterval(update, 100);
