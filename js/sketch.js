let img;
let posterImg;
let spookyFont;
let spawnInterval = 1000;
let ghosts = [];
let maxGhosts = 30;  // Maximum number of ghosts allowed

let textY = 100;  // Starting Y position of the text
let textVisible = true;  // Flag to check if text is still visible
let textStartTime;  // Variable to store the time when the text starts


function preload() {
  img = loadImage("pumkin.png");
  posterImg = loadImage("poster.png");
  spookyFont = loadFont("Minecrafter.ttf"); // Load the custom font
}

function setup() {
  createCanvas(848, 1200, document.getElementById('canvas-ar'))
  pixelDensity(1)
  background(220);
  image(posterImg, 0, 0);

  setInterval(spawn, spawnInterval); // Spawn a new ghost every second

  // Text settings
  textFont(spookyFont);
  textSize(24);
  fill(50, 205, 50);  // Lime green color for the text
  textAlign(CENTER);

  textStartTime = millis();  // Record the time when the sketch starts
}

function draw() {
  // Draw the background image
  image(posterImg, 0, 0);

  // Check if 3 seconds have passed, and if so, move the text off the screen
  if (millis() - textStartTime < 3000) {
    // Display the introductory text at the start for 3 seconds
    text("Spooky HalfTerm Workshops", width / 2, textY);
    text("Now Available at Science Zone", width / 2, textY + 40);
    text("First, Kill the Pumpkins!", width / 2, textY + 80);
  } else {
    // Gradually move the text off the screen by reducing the Y position
    if (textY > -200) {  // Move until the text is off the top of the canvas
      textY -= 2;  // Move text upward
      text("Spooky HalfTerm Workshops", width / 2, textY);
      text("Now Available at Science Zone", width / 2, textY + 40);
      text("First, Kill the Pumpkins!", width / 2, textY + 80);
    }
  }

  // Filter out ghosts that have moved off the screen
  ghosts = ghosts.filter(ghost => ghost.y < height + 50);

  // Loop through the ghosts array and display each ghost
  ghosts.forEach((ghost) => {
    ghost.y += ghost.speed;  // Move the ghost by its speed

    if (ghost.y > height) {
      ghost.y = -50;  // Reset the ghost to the top if it moves off the bottom
    }

    tint(255, 255, 100);  // Apply yellowish tint to the ghost
    image(img, ghost.x, ghost.y, 50, 50);  // Draw the ghost
    noTint();  // Remove the tint after drawing
  });
}

// Function to spawn new ghosts with random positions and speeds
function spawn() {
  // Remove the oldest ghost if the array exceeds maxGhosts
  if (ghosts.length >= maxGhosts) {
    ghosts.shift();  // Remove the first element (oldest ghost)
  }

  let ghost = {
    x: random(0, width - 50),  // Random x position within canvas width
    y: random(0, height - 50),  // Random y position within canvas height
    speed: random(1, 3)  // Random speed between 1 and 3
  };
  ghosts.push(ghost);  // Add new ghost to the array
}

// Function to remove a ghost when clicked
function mousePressed() {
  ghosts = ghosts.filter(ghost => {
    let d = dist(mouseX, mouseY, ghost.x + 25, ghost.y + 25); // Check if mouse is near ghost
    return d > 25;  // Keep ghost if distance is greater than 25 (radius of 50px ghost)
  });
}
