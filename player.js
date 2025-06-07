class Player {
  constructor() {
    this.r = 60; // Radius of the player
    this.x = 50;
    this.y = height - this.r - groundHeight; // Start on the ground line (groundHeight is global)
    this.vy = 0; // Velocity y
    this.gravity = 2;
  }

  jump() {
    // Ensure this.y is compared against the correct ground position
    if (this.y >= height - this.r - groundHeight) {
      this.vy = -30; // Jump strength
    }
  }

  hits(obstacle) {
    // Get the bounding box for the player (ellipse)
    let playerX1 = this.x - this.r / 2;
    let playerY1 = this.y - this.r / 2;
    let playerX2 = this.x + this.r / 2;
    let playerY2 = this.y + this.r / 2;

    // Get the bounding box for the obstacle (rectangle)
    // Obstacle's x and y are its top-left corner
    let obstacleX1 = obstacle.x;
    let obstacleY1 = obstacle.y;
    let obstacleX2 = obstacle.x + obstacle.r; // obstacle.r is its width and height
    let obstacleY2 = obstacle.y + obstacle.r;

    // Check for overlap
    if (playerX2 >= obstacleX1 && playerX1 <= obstacleX2 &&
        playerY2 >= obstacleY1 && playerY1 <= obstacleY2) {
      return true;
    }
    return false;
  }

  move() {
    this.y += this.vy;
    this.vy += this.gravity;
    // Constrain player to the screen, considering groundHeight
    this.y = constrain(this.y, 0, height - this.r - groundHeight);
  }

  show() {
    fill(50, 50, 200); // Player color
    ellipseMode(CENTER); // Ensure ellipse is drawn from its center
    ellipse(this.x, this.y, this.r, this.r);
  }
}
