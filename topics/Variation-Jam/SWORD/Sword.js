/**
 * Frogfrogfrog
 * Pippin Barr
 * 
 * A game of catching flies with your frog-tongue
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

// Our frog
const frog = {
    // The frog's body has a position and size
    body: {
        x: 320,
        y: 520,
        size: 100
    },
    // The frog's tongue has a position, size, speed, and state
    tongue: {
        //Maximum travel distance of the tongue
        maxLength: 300,
        size: 20,
        speed: 20,
        // Determines how the tongue moves each frame
        state: "idle" // State can be: idle, outbound, inbound
    }
};

// Our fly
// Has a position, size, and speed of horizontal movement
const fly = {
    x: 0,
    y: 200, // Will be random
    size: 10,
    speed: 3
};

/**
 * Creates the canvas and initializes the fly
 */
function setup() {
    createCanvas(1920, 920);
    //Making the angle mode degrees
    angleMode(DEGREES);
    // Give the fly its first random position
    resetFly();
}

function draw() {
    background("#87ceeb");
    moveFly();
    drawFly();
    moveFrog();
    moveTongue();
    drawFrog();
    checkTongueFlyOverlap();
}

/**
 * Moves the fly according to its speed
 * Resets the fly if it gets all the way to the right
 */
function moveFly() {

    //Direction angel for the frog
    fly.direction = 0;
    //Speed for the frog
    const speedFly = 6;

    //When "W" key is down, frog moves upwards and faces upwards
    if (keyIsDown(38)) {
        fly.direction = 0;
        fly.y -= speedFly
    };
    //When the "A" is down, frog moves to the left and faces the left
    if (keyIsDown(37)) {
        fly.direction = 270;
        fly.x -= speedFly
    };
    //When the "S" key is down, frog moves downwards and faces downwards
    if (keyIsDown(40)) {
        fly.direction = 180;
        fly.y += speedFly
    };
    //When the "D" key is down, frog moves to the right and faces the right
    if (keyIsDown(39)) {
        fly.direction = 80;
        fly.x += speedFly

    }
}

/**
 * Draws the fly as a black circle
 */
function drawFly() {
    push();
    noStroke();
    fill("#000000");
    ellipse(fly.x, fly.y, fly.size);
    pop();
}

/**
 * Resets the fly to the left with a random y
 */
function resetFly() {
    fly.x = 0;
    fly.y = random(0, 300);
}

/**
 * Moves the frog based on WASD keys
 */
function moveFrog() {

    //Direction angel for the frog
    frog.direction = 0;
    //Speed for the frog
    const speed = 6;

    //When "W" key is down, frog moves upwards and faces upwards
    if (keyIsDown(87)) {
        frog.direction = 0;
        frog.body.y -= speed
    };
    //When the "A" is down, frog moves to the left and faces the left
    if (keyIsDown(65)) {
        frog.direction = 270;
        frog.body.x -= speed
    };
    //When the "S" key is down, frog moves downwards and faces downwards
    if (keyIsDown(83)) {
        frog.direction = 180;
        frog.body.y += speed
    };
    //When the "D" key is down, frog moves to the right and faces the right
    if (keyIsDown(68)) {
        frog.direction = 80;
        frog.body.x += speed
    }
}

/**
 * Handles moving the tongue based on its state
 */
function moveTongue() {
    // If the tongue is idle, it doesn't do anything
    if (frog.tongue.state === "idle") {
        //Tongue is stored
        frog.tongue.length = 0;
    }
    // If the tongue is outbound, it moves up
    else if (frog.tongue.state === "outbound") {
        frog.tongue.length += -frog.tongue.speed;
        // The tongue bounces back once max length is achieved
        if (frog.tongue.length >= frog.tongue.maxLength) {
            frog.tongue.state = "inbound";
        }
    }
    // If the tongue is inbound, it moves down
    else if (frog.tongue.state === "inbound") {
        frog.tongue.length -= frog.tongue.speed;
        // The tongue stops if it hits the bottom
        if (frog.tongue.length <= 0) {
            frog.tongue.length = 0;
            frog.tongue.state = "idle";
        }
    }
}

/**
 * Displays the tongue (tip and line connection) and the frog (body)
 */
function drawFrog() {
    // Draw the tongue tip
    push();
    fill("#ff0000");
    noStroke();
    ellipse(frog.tongue.x, frog.tongue.y, frog.tongue.size);
    pop();

    // Draw the rest of the tongue
    push();
    stroke("#ff0000");
    strokeWeight(frog.tongue.size);
    line(frog.tongue.x, frog.tongue.y, frog.body.x, frog.body.y);
    pop();

    // Draw the frog's body
    push();
    translate(frog.body.x, frog.body.y);

    //Corresponds to setup(), angles are tracked in degrees
    angleMode(DEGREES);
    rotate(frog.direction)
    fill("#0fbd0fff");
    noStroke();

    //Centering at origin
    ellipse(0, 0, frog.body.size);

    //Eye offsets so that they rotate and follow frog
    const eyeOffsetX = frog.body.size * 0.2;
    const eyeOffsetY = -frog.body.size * 0.2;
    const eyeSize = frog.body.size * 0.2;
    const pupilSize = eyeSize * 0.5;
    const eyeAreaSize = eyeSize * 1.3

    //Eye area(bulges)
    fill("#0fbd0fff")
    ellipse(-eyeOffsetX - 10, eyeOffsetY - 20, eyeAreaSize)
    ellipse(eyeOffsetX + 10, eyeOffsetY - 20, eyeAreaSize)

    //Eyes
    fill(255);
    ellipse(-eyeOffsetX - 10, eyeOffsetY - 20, eyeSize);
    ellipse(eyeOffsetX + 10, eyeOffsetY - 20, eyeSize);

    //Pupils
    fill(0);
    ellipse(-eyeOffsetX - 10, eyeOffsetY - 20, pupilSize);
    ellipse(eyeOffsetX + 10, eyeOffsetY - 20, pupilSize);

    pop();
}

/**
 * Handles the tongue overlapping the fly
 */
function checkTongueFlyOverlap() {
    // Get distance from tongue to fly
    const d = dist(frog.tongue.x, frog.tongue.y, fly.x, fly.y);
    // Check if it's an overlap
    const eaten = (d < frog.tongue.size / 2 + fly.size / 2);
    if (eaten) {
        // Reset the fly
        resetFly();
        // Bring back the tongue
        frog.tongue.state = "inbound";
    }
}

/**
 * Launch the tongue on click (if it's not launched yet)
 */
function mousePressed() {
    if (frog.tongue.state === "idle") {
        frog.tongue.state = "outbound";
    }
}