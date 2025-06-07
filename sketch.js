let player;
const groundHeight = 20;
let obstacles = [];
let spawnInterval = 120; // Slightly increased for better initial playability
let frameCounter = 0;
// let gameIsOver = false; // We'll replace this with gameState

// Game States
const MENU = 0;
const PLAYING = 1;
const GAME_OVER = 2;
let gameState = MENU; // Start with the menu state

let score = 0; // Initialize score, will be used in a later step

function setup() {
  createCanvas(800, 400);
  player = new Player(); // Player is created once
  textAlign(CENTER, CENTER);
  textSize(30); // Adjusted default text size
}

function keyPressed() {
  if (gameState === MENU) {
    if (key === ' ' || keyCode === UP_ARROW) {
      startGame();
    }
  } else if (gameState === PLAYING) {
    if (key === ' ' || keyCode === UP_ARROW) {
      player.jump();
    }
  } else if (gameState === GAME_OVER) {
    if (key === ' ' || keyCode === UP_ARROW) {
      resetGame();
    }
  }
}

function mousePressed() { // Adding mouse press for jump and starting game
  if (gameState === MENU) {
      startGame();
  } else if (gameState === PLAYING) {
      player.jump();
  } else if (gameState === GAME_OVER) {
      resetGame();
  }
}


function startGame() {
  gameState = PLAYING;
  score = 0; // Reset score when starting a new game
  frameCounter = 0; // Reset frame counter for obstacle spawning
  // Player is already created in setup, ensure it's reset if needed
  player = new Player(); // Reset player state (position, velocity)
  obstacles = []; // Clear any existing obstacles
}

function resetGame() {
  gameState = MENU; // Go back to menu after game over
  // Score is preserved to be shown on menu/game over screen if desired, or reset in startGame
}

function draw() {
  background(220);
  drawGround();

  if (gameState === MENU) {
    displayMenu();
  } else if (gameState === PLAYING) {
    runGame();
  } else if (gameState === GAME_OVER) {
    displayGameOver();
  }
}

function drawGround() {
  fill(100);
  rect(0, height - groundHeight, width, groundHeight);
}

function displayMenu() {
  fill(0);
  text("Endless Runner", width / 2, height / 2 - 40);
  textSize(20);
  text("Press Space, Up Arrow, or Click to Start", width / 2, height / 2 + 10);
  textSize(30); // Reset text size for other uses
}

function runGame() {
  player.move();
  player.show();

  // Obstacle spawning logic
  frameCounter++;
  if (frameCounter % spawnInterval === 0) {
    obstacles.push(new Obstacle());
  }

  // Iterate over obstacles array
  for (let i = obstacles.length - 1; i >= 0; i--) {
    obstacles[i].move();
    obstacles[i].show();

    if (player.hits(obstacles[i])) {
      gameState = GAME_OVER;
      // No need to call noLoop() here, the draw loop will switch to displayGameOver()
      break;
    }

    if (obstacles[i].x + obstacles[i].r < 0) {
      obstacles.splice(i, 1);
      score++; // Increment score when an obstacle is successfully passed
    }
  }

  // Display score during gameplay
  fill(0);
  textAlign(LEFT, TOP);
  textSize(24);
  text("Score: " + score, 10, 10);
  textAlign(CENTER, CENTER); // Reset alignment
  textSize(30); // Reset text size
}

function displayGameOver() {
  fill(255, 0, 0);
  text("GAME OVER", width / 2, height / 2 - 40);
  textSize(20);
  text("Your Score: " + score, width / 2, height / 2);
  text("Press Space, Up Arrow, or Click to Return to Menu", width / 2, height / 2 + 30);
  textSize(30); // Reset text size
}

// Ensure Player class constructor and methods use groundHeight correctly
// No changes needed in player.js or obstacle.js for this step,
// but ensure their y positions are relative to 'height' and 'groundHeight'.
// For Player: this.y = height - this.r - groundHeight;
// For Obstacle: this.y = height - this.r - groundHeight;
// These should already be correct from previous steps.
