// game.js
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const zombieCounter = document.getElementById("zombie-counter");
const message = document.getElementById("message");

const heroImg = new Image();
heroImg.src = "images/hero.png";

const zombieImg = new Image();
zombieImg.src = "images/zombie.png";

const biryaniImg = new Image();
biryaniImg.src = "images/biryani.png";

const biryani = {
  x: canvas.width / 2 - 40,
  y: canvas.height - 75,
  width: 80,
  height: 60
};

const hero = { x: 450, y: 620, width: 70, height: 100, speed: 8 };

const bullets = [];
const zombies = [];
let keys = {};
let score = 0;
let gameOver = false;
let gameStarted = false;
let spawnInterval;
let zombieSpeedRange = [0.8, 1.4];
let spawnRate = 1500;
let maxZombies = 3;

function spawnZombie() {
  if (zombies.length < maxZombies) {
    const x = Math.random() * (canvas.width - 60);
    const speed = zombieSpeedRange[0] + Math.random() * (zombieSpeedRange[1] - zombieSpeedRange[0]);
    zombies.push({ x, y: -60, width: 60, height: 80, speed });
  }
}

function drawHero() {
  ctx.drawImage(heroImg, hero.x, hero.y, hero.width, hero.height);
}

function drawZombies() {
  zombies.forEach(z => {
    ctx.drawImage(zombieImg, z.x, z.y, z.width, z.height);

    // Colisión con el biryani
    if (z.y + z.height > biryani.y && !gameOver) {
      endGame(false);
    }
  });
}


function drawBullets() {
  ctx.fillStyle = "#ff0";
  bullets.forEach(b => ctx.fillRect(b.x, b.y, b.width, b.height));
}

function drawBiryani() {
  ctx.drawImage(biryaniImg, biryani.x, biryani.y, biryani.width, biryani.height);
}

function update() {
  if (gameOver) return;

  if (keys["ArrowLeft"] && hero.x > 0) hero.x -= hero.speed;
  if (keys["ArrowRight"] && hero.x < canvas.width - hero.width) hero.x += hero.speed;

  bullets.forEach(b => b.y -= 8);
  zombies.forEach(z => z.y += z.speed);

  bullets.forEach((b, bi) => {
    zombies.forEach((z, zi) => {
      if (b.x < z.x + z.width && b.x + b.width > z.x && b.y < z.y + z.height && b.y + b.height > z.y) {
        bullets.splice(bi, 1);
        zombies.splice(zi, 1);
        score++;
        zombieCounter.textContent = `Zombis eliminados: ${score}`;
        if (score >= 69) endGame(true);
      }
    });
  });

  for (let i = bullets.length - 1; i >= 0; i--) {
    if (bullets[i].y + bullets[i].height < 0) bullets.splice(i, 1);
  }
}

function draw() {
  if (gameOver) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBiryani();
  drawHero();
  drawBullets();
  drawZombies();
}

function gameLoop() {
  update();
  draw();
  if (!gameOver) requestAnimationFrame(gameLoop);
}

function endGame(won) {
  gameOver = true;

  // Detener spawn de zombis
  if (spawnInterval) clearInterval(spawnInterval);

  const resultMessage = won
    ? `🎉 <strong>¡Feli cumpleañito!</strong><br>Ke prohacker has matao to lo sombis! 🍛🦸‍♂️`
    : `☠️ <strong>¡NOOOOOOOOOO CAGASTE!</strong><br>Se comieron tu biryani por lento puto... 😱`;

  // Mostrar mensaje y botón de reinicio
  message.innerHTML = `
    ${resultMessage}
    <br><br>
    <button onclick="resetGame()">🔁 Jugar de nuevo</button>
  `;
  message.style.display = "block";
}


function startGame() {
  if (gameStarted) return;
  gameStarted = true;

  const level = document.getElementById("difficulty").value;
  switch (level) {
    case "easy":
      zombieSpeedRange = [0.8, 1.4];
      spawnRate = 1500;
      maxZombies = 2;
      break;
    case "medium":
      zombieSpeedRange = [0.9, 1.7];
      spawnRate = 1250;
      maxZombies = 4;
      break;
    case "hard":
      zombieSpeedRange = [1.2, 2.0];
      spawnRate = 800;
      maxZombies = 6;
      break;
    case "hardcore":
      zombieSpeedRange = [1.7, 3.0];
      spawnRate = 600;
      maxZombies = 9;
      break;
    case "muyhardcore":
      zombieSpeedRange = [2.0, 5.5];
      spawnRate = 400;
      maxZombies = 25;
      break;
  }

  message.style.display = "none";
  spawnInterval = setInterval(() => { if (!gameOver) spawnZombie(); }, spawnRate);
  gameLoop();
}

function resetGame() {
  zombies.length = 0;
  bullets.length = 0;
  score = 0;
  gameOver = false;
  gameStarted = false;

  hero.x = 450;
  hero.y = 620;

  zombieCounter.textContent = "Zombis eliminados: 0";

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  message.innerHTML = `
    <h2>🧟 MataSombi o BiryaniDie 🍛</h2>
    <p>💥 Muévete con ← →<br>
    🔫 Dispara con la barra espaciadora<br><br>
    🎯 Elimina 69 zombis para ganar<br>
    ❌ Si un zombi entra en la zona del biryani... ¡Pierdes PUTO!</p>
    <p>
      Dificultad:
      <select id="difficulty">
        <option value="easy" selected>Fácil</option>
        <option value="medium">Media</option>
        <option value="hard">Difícil</option>
        <option value="hardcore">MUY Difícil</option>
        <option value="muyhardcore">HARDCORE</option>
      </select>
    </p>
    <button onclick="startGame()">Comenzar juego</button>
  `;

  message.style.display = "block";
}



window.addEventListener("keydown", e => {
  keys[e.key] = true;
  if (e.key === " ") {
    bullets.push({
      x: hero.x + hero.width / 2 - 2,
      y: hero.y,
      width: 4,
      height: 10
    });
  }
});

window.addEventListener("keyup", e => {
  keys[e.key] = false;
});
