const bird = document.getElementById("bird");
const obstacles = document.getElementById("obstacles");
const scoreElement = document.getElementById("score");
let birdTop = 250;
let gravity = 2;
let score = 0;
let gameSpeed = 2;

// Гравитация
function applyGravity() {
  birdTop += gravity;
  bird.style.top = birdTop + "px";
  if (birdTop > 560 || birdTop < 0) {
    endGame();
  }
}

// Прыжок
function jump() {
  birdTop -= 60;
  bird.style.top = birdTop + "px";
}

// Обработка нажатия клавиши (для десктопов)
document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    jump();
  }
});

// Обработка касания (для мобильных устройств)
document.addEventListener("touchstart", () => {
  jump();
});

// Создание препятствий
function createObstacle() {
  const obstacle = document.createElement("div");
  obstacle.classList.add("obstacle");
  const obstacleHeight = Math.floor(Math.random() * 300) + 100;
  obstacle.style.height = obstacleHeight + "px";
  obstacle.style.left = "400px";
  obstacle.style.top = "0";
  obstacles.appendChild(obstacle);

  const gap = 150;
  const bottomObstacleHeight = 600 - obstacleHeight - gap;
  const bottomObstacle = document.createElement("div");
  bottomObstacle.classList.add("obstacle");
  bottomObstacle.style.height = bottomObstacleHeight + "px";
  bottomObstacle.style.left = "400px";
  bottomObstacle.style.bottom = "0";
  obstacles.appendChild(bottomObstacle);

  moveObstacle(obstacle, bottomObstacle);
}

function moveObstacle(obstacle, bottomObstacle) {
  let obstacleLeft = 400;
  const obstacleInterval = setInterval(() => {
    obstacleLeft -= gameSpeed;
    obstacle.style.left = obstacleLeft + "px";
    bottomObstacle.style.left = obstacleLeft + "px";

    if (obstacleLeft < -60) {
      clearInterval(obstacleInterval);
      obstacles.removeChild(obstacle);
      obstacles.removeChild(bottomObstacle);
      score++;
      scoreElement.innerText = "Счет: " + score;
    }

    if (
      obstacleLeft < 90 &&
      obstacleLeft > 50 &&
      (birdTop < obstacle.clientHeight ||
        birdTop > 600 - bottomObstacle.clientHeight - 40)
    ) {
      endGame();
    }
  }, 20);
}

// Завершение игры
function endGame() {
  alert("Игра окончена! Ваш счет: " + score);
  window.location.reload();
}

// Игровой цикл
setInterval(applyGravity, 20);
setInterval(createObstacle, 2000);
