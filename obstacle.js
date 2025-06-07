class Obstacle {
  constructor() {
    this.r = Math.floor(random(30, 70)); // Random size for the obstacle
    this.x = width; // Start at the right edge of the screen
    this.y = height - this.r - groundHeight; // groundHeight is a global variable from sketch.js
    this.speed = 6; // How fast the obstacle moves
  }

  move() {
    this.x -= this.speed;
  }

  show() {
    fill(200, 50, 50); // Obstacle color
    rectMode(CORNER); // Ensure rectangles are drawn from the corner
    // Draw a simple rectangle as an obstacle
    // Later we can use sprites or more complex shapes
    rect(this.x, this.y, this.r, this.r);
  }
}
