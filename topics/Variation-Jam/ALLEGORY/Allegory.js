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

//Typed input variable for keyTyped function
let typedInput = "";

// Our frog
const shadowFrog = {
    // The frog's body has a position and size
    body: {
        color: "#3a3a3aff",
        x: 320,
        y: 500,
        size: 150
    },
    // The frog's tongue has a position, size, speed, and state
    tongue: {
        color: "#252525ff",
        x: undefined,
        y: 480,
        size: 20,
        speed: 20,
        vx: 0,
        vy: 0,
        maxDistance: 460,
        traveled: 0,
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
        y: 500,
        size: 150
    },
    // The frog's tongue has a position, size, speed, and state
    tongue: {
        color: "#851919ff",
        x: undefined,
        y: 480,
        size: 20,
        speed: 20,
        vx: 0,
        vy: 0,
        maxDistance: 460,
        traveled: 0,
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

    if (whichScreen === "instructions") {
        instructionsScreen();
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
 * Instructions screen
 */
function instructionsScreen() {

    background("#000000");
    textAlign(CENTER, CENTER);
    textSize(30);
    fill(255);
    textFont('Arial');

    //Instructions Title
    textStyle(BOLD);
    text("Instructions", width / 2, 100);

    //Actual Instructions
    textStyle(NORMAL);
    textSize(20);
    textWrap(WORD);
    const instr = "You press inspect and get a glimpse of the true world";
    const boxW = 500;
    text(instr, width / 2 - boxW / 2, height / 2, boxW);
    textSize(20);
    text("Click to continue", width / 2, 350);
}

/**
 * Function to make up the first portion of the game, the inside of the cave
 */
function drawCave() {

    background("#292319ff");

    //Draw
    drawFly(shadowFly);
    drawFrog(shadowFrog);
    //Logic
    moveFrog(shadowFrog);
    moveTongue(shadowFrog);
    moveFly(shadowFly);
    checkTongueFlyOverlap(shadowFrog, shadowFly);
}

/**
 * Function to draw the enlightened, real world
 */
function drawReal() {

    background("#87ceeb")

    //Sun
    noStroke();
    fill("#FF0")
    ellipse(0, 0, 100, 100)

    //Hill
    noStroke();
    fill("#0a960aff");
    ellipse(width + 100, height + 50, width * 3, 300);

    //Tree trunk
    fill("#5b3a1b");
    rectMode(CENTER);
    rect(550, 350, 30, 120);

    //Tree foliage
    fill("#2f6b2f");
    ellipse(550, 270, 120, 90);

    //Logic
    moveFly(realFly);
    drawFly(realFly);
    moveFrog(realFrog);
    moveTongue(realFrog);
    checkTongueFlyOverlap(realFrog, realFly);
    //Draw
    drawFrog(realFrog);
    drawFly(realFly);

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
 * Moves the frog with the "A" and "D"
 */
function moveFrog(frog) {

    //Assigning a speed to the key movement
    const speed = 9

    //When the "A" is down, negative speed is produced, bringing the frog to the left
    if (keyIsDown(65)) {
        frog.body.x -= speed;
    }

    //When the "D" is down, positive speed is produced, bringing the frog to the right
    if (keyIsDown(68)) {
        frog.body.x += speed;
    }

    //Preventing the frog from leaving the canvas with a constrain 
    frog.body.x = constrain(frog.body.x, 0, width)
}

/**
 * Handles moving the tongue based on its state
 */
function moveTongue(frog) {
    //Centering tongue at frogue body
    const mouthX = frog.body.x;
    const mouthY = frog.body.y - 40;
    //When idle, the tongue is stuck to the body of the frog and doesn't move
    if (frog.tongue.state === "idle") {
        frog.tongue.x = mouthX;
        frog.tongue.y = mouthY;
        frog.tongue.traveled = 0;
    }
    //If the tongue is outbound, it moves up. Velocity and speed are added
    else if (frog.tongue.state === "outbound") {
        frog.tongue.x += frog.tongue.vx;
        frog.tongue.y += frog.tongue.vy;
        frog.tongue.traveled += frog.tongue.speed;
        //The tongue bounces back if it reaches too far
        if (
            frog.tongue.x < 0 || frog.tongue.x > width ||
            frog.tongue.y < 0 || frog.tongue.y > height ||
            frog.tongue.traveled >= frog.tongue.maxDistance
        ) {
            frog.tongue.state = "idle";
            frog.tongue.traveled = 0;
        }
    }
}

/**
 * Multi directional launch of the tongue, same as AAfrog.js
 */
function launchTongue(frog) {
    //If tongue is not idle do nothing
    if (frog.tongue.state !== "idle") return;

    //Tongue is launched from constants that are in line with the frog's body
    const mouthX = frog.body.x;
    const mouthY = frog.body.y - 40;
    //Displacement of mouth to mouse
    let dx = mouseX - mouthX;
    let dy = mouseY - mouthY;
    //Pythagorean to accquire distance
    const d = sqrt(dx * dx + dy * dy);
    //Turned into a unit direction vector, directly from mouse to mouth
    if (d > 0) {

        dx /= d;
        dy /= d;
    }
    //Tongue position
    frog.tongue.x = mouthX;
    frog.tongue.y = mouthY;
    //Moving the tongue
    frog.tongue.vx = dx * frog.tongue.speed;
    frog.tongue.vy = dy * frog.tongue.speed;
    frog.tongue.traveled = 0;
    frog.tongue.state = "outbound";

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
    pop();

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
        frog.tongue.state = "idle";
        frog.tongue.traveled = 0;
        if (whichScreen === "cave") {
            shadowScore++;
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
        whichScreen = "instructions";
    } else if (whichScreen === "instructions") {
        whichScreen = "cave"
    }
    //Switch to the cave
    else if (whichScreen === "cave") {
        //Calling launch tongue function for shadow frog
        launchTongue(shadowFrog);
    }
    //Switch to reality
    else if (whichScreen === "real") {
        //Calling launch tongue function for real frog
        launchTongue(realFrog);
    }
}

/**
 * Making the "reality" only appear when the word "reality" is typed
 */
function keyTyped() {
    //Only active during cave screen
    if (whichScreen !== "cave") return;

    //Characters are automatically lower cased, just in case
    typedInput += key.toLowerCase();

    //If not enlightened screen and the word "enlightenment" is typed out, enlightment becomes a reality
    if (!enlightened && typedInput.includes("enlightenment")) {
        enlightened = true;
        whichScreen = "real";
    }
}
