/**
 * Allegory of The Frog
 * Benjamin Merhi
 * 
 * Find enlightenment
 * 
 * Instructions:
 * - Move the frog with your mouse
 * - Click to launch the tongue
 * - Catch flies
 * 
 * Made with p5
 * https://p5js.org/
 */

"use strict";

//Variable for screens
let whichScreen = "start"

//Boolean for enlightment phase
let enlightened = false;

//Variable to count score of shadow flies eaten
let shadowScore = 0;

// Our frog
const shadowFrog = {
    // The frog's body has a position and size
    body: {
        color: "#3a3a3aff",
        x: 320,
        y: 520,
        size: 150
    },
    // The frog's tongue has a position, size, speed, and state
    tongue: {
        color: "#252525ff",
        x: undefined,
        y: 480,
        size: 20,
        speed: 20,
        // Determines how the tongue moves each frame
        state: "idle" // State can be: idle, outbound, inbound
    }
};

// Our frog
const realFrog = {
    // The frog's body has a position and size
    body: {
        color: "#234423ff",
        x: 320,
        y: 520,
        size: 150
    },
    // The frog's tongue has a position, size, speed, and state
    tongue: {
        color: "#851919ff",
        x: undefined,
        y: 480,
        size: 20,
        speed: 20,
        // Determines how the tongue moves each frame
        state: "idle" // State can be: idle, outbound, inbound
    }
};

//The Shadow fly and its properties
const shadowFly = {
    color: "#1f1f1fff",
    x: 0,
    y: 200, // Will be random
    size: 15,
    speed: 3
};

//The real fly and it's properties
const realFly = {
    color: "rgba(0, 0, 0, 1)",
    x: 0,
    y: 200,
    size: 10,
    speed: 3
}

/**
 * Creates the canvas and initializes the fly
 */
function setup() {
    createCanvas(640, 480);

    // Give the fly its first random position
    resetFly(shadowFly);
    resetFly(realFly);
}

/**
 *Draw function going through the different screens
 */
function draw() {

    //Different screens, returning so they don't run all at once
    if (whichScreen === "start") {
        startScreen();
        return;
    }

    if (whichScreen === "cave") {
        drawCave();
        return;
    }

    if (whichScreen === "real") {
        drawReal();
        return;
    }
}

function startScreen() {
    background("#000000");
    textAlign(CENTER, CENTER);
    textFont("Arial");
    fill(255);
    textSize(40);
    text("Allegory of the Frog", width / 2, height / 2 - 40);

    textSize(18);
    text("Click to begin", width / 2, height / 2 + 50);
}

/**
 * Function to make up the first portion of the game, the inside of the cave
 */
function drawCave() {

    background("#4b3917ff");

    moveFly(shadowFly);
    drawFly(shadowFly);

    moveFrog(shadowFrog);
    moveTongue(shadowFrog);
    drawFrog(shadowFrog);
    checkTongueFlyOverlap(shadowFrog, shadowFly);
}

/**
 * Function to draw the enlightened, real world
 */
function drawReal() {

    background("#87ceeb")

    moveFly(realFly);
    drawFly(realFly);

    moveFrog(realFrog);
    moveTongue(realFrog);
    drawFrog(realFrog);
    checkTongueFlyOverlap(realFrog, realFly);
}

/**
 * Moves the fly according to its speed
 * Resets the fly if it gets all the way to the right
 */
function moveFly(fly) {
    // Move the fly
    fly.x += fly.speed;
    // Handle the fly going off the canvas
    if (fly.x > width) {
        resetFly(fly);
    }
}

/**
 * Draws the fly as a black circle
 */
function drawFly(fly) {
    push();
    noStroke();
    fill(fly.color);
    ellipse(fly.x, fly.y, fly.size);
    pop();
}

/**
 * Resets the fly to the left with a random y
 */
function resetFly(fly) {
    fly.x = 0;
    fly.y = random(0, 300);
}

/**
 * Moves the frog to the mouse position on x
 */
function moveFrog(frog) {
    frog.body.x = mouseX;
}

/**
 * Handles moving the tongue based on its state
 */
function moveTongue(frog) {
    // Tongue matches the frog's x
    frog.tongue.x = frog.body.x;
    // If the tongue is idle, it doesn't do anything
    if (frog.tongue.state === "idle") {
        // Do nothing
    }
    // If the tongue is outbound, it moves up
    else if (frog.tongue.state === "outbound") {
        frog.tongue.y += -frog.tongue.speed;
        // The tongue bounces back if it hits the top
        if (frog.tongue.y <= 0) {
            frog.tongue.state = "inbound";
        }
    }
    // If the tongue is inbound, it moves down
    else if (frog.tongue.state === "inbound") {
        frog.tongue.y += frog.tongue.speed;
        // The tongue stops if it hits the bottom
        if (frog.tongue.y >= height) {
            frog.tongue.state = "idle";
        }
    }
}

/**
 * Displays the tongue (tip and line connection) and the frog (body)
 */
function drawFrog(frog) {
    // Draw the tongue tip
    push();
    fill(frog.tongue.color);
    noStroke();
    ellipse(frog.tongue.x, frog.tongue.y, frog.tongue.size);

    // Draw the rest of the tongue
    push();
    stroke(frog.tongue.color);
    strokeWeight(frog.tongue.size);
    line(frog.tongue.x, frog.tongue.y, frog.body.x, frog.body.y);

    // Draw the frog's body
    fill(frog.body.color);
    noStroke();
    ellipse(frog.body.x, frog.body.y, frog.body.size);

    //Eye offsets so that they rotate and follow frog
    const eyeOffsetX = frog.body.size * 0.2;
    const eyeOffsetY = -frog.body.size * 0.2;
    const eyeSize = frog.body.size * 0.2;
    const pupilSize = eyeSize * 0.5;
    const eyeAreaSize = eyeSize * 1.3

    //Eye area(bulges)
    fill(frog.body.color);
    ellipse(frog.body.x - eyeOffsetX - 10, frog.body.y + eyeOffsetY - 30, eyeAreaSize);
    ellipse(frog.body.x + eyeOffsetX + 10, frog.body.y + eyeOffsetY - 30, eyeAreaSize);

    //Eyes
    fill(255);
    ellipse(frog.body.x - eyeOffsetX - 10, frog.body.y + eyeOffsetY - 30, eyeSize);
    ellipse(frog.body.x + eyeOffsetX + 10, frog.body.y + eyeOffsetY - 30, eyeSize);

    //Pupils
    fill(0);
    ellipse(frog.body.x - eyeOffsetX - 10, frog.body.y + eyeOffsetY - 30, pupilSize);
    ellipse(frog.body.x + eyeOffsetX + 10, frog.body.y + eyeOffsetY - 30, pupilSize);


    pop();
}

/**
 * Handles the tongue overlapping the fly
 */
function checkTongueFlyOverlap(frog, fly) {
    // Get distance from tongue to fly
    const d = dist(frog.tongue.x, frog.tongue.y, fly.x, fly.y);
    // Check if it's an overlap
    const eaten = (d < frog.tongue.size / 2 + fly.size / 2);
    if (eaten) {
        // Reset the fly
        resetFly(fly);
        // Bring back the tongue
        frog.tongue.state = "inbound";
        if (whichScreen === "cave") {
            shadowScore++;

            if (shadowScore >= 10 && !enlightened) {
                enlightened = true;
                whichScreen = "real";
            }
        }
    }
}

/**
 * Launch the tongue on click (if it's not launched yet)
 */
function mousePressed() {
    //Switching to start screen
    if (whichScreen === "start") {
        shadowScore = 0;
        enlightened = false;
        resetFly(shadowFly);
        resetFly(realFly);
        shadowFrog.tongue.state = "idle";

        whichScreen = "cave";
    }
    //Switch to the cave
    else if (whichScreen === "cave") {
        if (shadowFrog.tongue.state === "idle") {
            shadowFrog.tongue.state = "outbound";
        }
    }
    //Switch to reality
    else if (whichScreen === "real") {
        if (realFrog.tongue.state === "idle") {
            realFrog.tongue.state = "outbound";
        }
    }
}