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

//Variable for screen selection
let whichScreen = "start"

// Our frog
const frog1 = {
    //Initial direction value
    direction: 90,
    // The frog's body has a position and size
    body: {
        x: 320,
        y: 460,
        size: 100
    },
    // The frog's tongue has a position, size, speed, and state
    tongue: {
        //Measuring distance of frog tongue, at 0, frogue tongue is fully retracted
        length: 0,
        //Maximum travel distance of the tongue
        maxLength: 200,
        size: 20,
        speed: 20,
        // Determines how the tongue moves each frame
        state: "idle" // State can be: idle, outbound, inbound
    },
    //The controls for the 1st frog, using WASD keys(keycodes)
    controls: {
        up: 87,
        down: 83,
        left: 65,
        right: 68
    }
};

//The second frog 
const frog2 = {
    //Initial direction value
    direction: 270,
    // The frog's body has a position and size
    body: {
        x: 1600,
        y: 460,
        size: 100
    },
    // The frog's tongue has a position, size, speed, and state
    tongue: {
        //Measuring distance of frog tongue, at 0, frogue tongue is fully retracted
        length: 0,
        //Maximum travel distance of the tongue
        maxLength: 200,
        size: 20,
        speed: 20,
        // Determines how the tongue moves each frame
        state: "idle" // State can be: idle, outbound, inbound
    },
    //The controls for the 2nd frog, using arrow keys(keycodes)
    controls: {
        up: 38,
        down: 40,
        left: 37,
        right: 39
    }
}


/**
 * Creates the canvas and initializes the fly
 */
function setup() {
    createCanvas(1920, 920);
    //Making the angle mode degrees
    angleMode(DEGREES);
}


function draw() {

    if (whichScreen === "start") {
        startScreen();
        return;
    }

    if (whichScreen !== "game") {
        return;
    }

    background("#87ceeb");

    //Logic
    moveFrog(frog1);
    moveFrog(frog2);
    moveTongue(frog1);
    moveTongue(frog2);
    //Draw 
    drawFrog(frog1);
    drawFrog(frog2);

    //Checking if frog1 hit frog2 and calling the reset function to reset them to original positions
    if (tongueHit(frog1, frog2)) {
        //Frog is reset to original coordinates and angle
        resetFrog(frog2, 1600, 460, 270);
        resetFrog(frog1, 320, 460, 90);
    }
    //Checking if frog2 hit frog1 and calling the reset function to reset them to original positions
    if (tongueHit(frog2, frog1)) {
        //Frog is reset to original coordinates and angle
        resetFrog(frog2, 1600, 460, 270);
        resetFrog(frog1, 320, 460, 90);
    }
}

/**
 * Function for the creation of the start screen
 */
function startScreen() {
    background("#886fb1ff");
    textAlign(CENTER, CENTER);
    textSize(60);
    fill(0);
    textFont('ARIAL');
    textStyle(BOLD);

    //Title
    text("Sword Frog", width / 2, height / 2);

    //Prompt
    textStyle(NORMAL);
    textSize(20);
    text("Click to Start", width / 2, height / 2 + 200);

}

/**
 * Resetting the frog upon a hit
 */
function resetFrog(frog, x, y, direction) {

    frog.body.x = x;
    frog.body.y = y;
    frog.direction = direction;

    frog.tongue.length = 0;
    frog.tongue.state = "idle";
}

/**
 * Function to get location of tongue tip for collision
 */
function locateTip(frog) {

    const angle = frog.direction - 90;
    const tipX = frog.body.x + cos(angle) * frog.tongue.length;
    const tipY = frog.body.y + sin(angle) * frog.tongue.length;
    return { x: tipX, y: tipY };
}

/**
 * Checking for tongue and frog overlap
 */
function tongueHit(attacker, target) {

    if (attacker.tongue.state === "idle") return false;

    const tip = locateTip(attacker);
    const frogRadius = target.body.size / 2;
    const d = dist(tip.x, tip.y, target.body.x, target.body.y);

    return d < frogRadius;
}

/**
 * Moves the frog based on WASD keys or arrow keys. General function so that it can take both frogs
 */
function moveFrog(frog) {

    //Speed for the frog
    const speed = 6;

    //When "W" key is down, frog moves upwards and faces upwards
    if (keyIsDown(frog.controls.up)) {
        frog.direction = 0;
        frog.body.y -= speed
    };
    //When the "A" is down, frog moves to the left and faces the left
    if (keyIsDown(frog.controls.left)) {
        frog.direction = 270;
        frog.body.x -= speed
    };
    //When the "S" key is down, frog moves downwards and faces downwards
    if (keyIsDown(frog.controls.down)) {
        frog.direction = 180;
        frog.body.y += speed
    };
    //When the "D" key is down, frog moves to the right and faces the right
    if (keyIsDown(frog.controls.right)) {
        frog.direction = 90;
        frog.body.x += speed
    }
}

/**
 * Handles moving the tongue based on its state
 */
function moveTongue(frog) {
    // If the tongue is idle, it doesn't do anything
    if (frog.tongue.state === "idle") {
        //Tongue is stored
        frog.tongue.length = 0;
    }
    // If the tongue is outbound, it moves up
    else if (frog.tongue.state === "outbound") {
        frog.tongue.length += frog.tongue.speed;
        // The tongue bounces back once max length is achieved
        if (frog.tongue.length >= frog.tongue.maxLength) {
            frog.tongue.state = "inbound";
        }
    }
    // If the tongue is inbound, it moves down
    else if (frog.tongue.state === "inbound") {
        frog.tongue.length -= frog.tongue.speed;
        //Frog tongue is idle when it's length is equal to zero
        if (frog.tongue.length <= 0) {
            frog.tongue.length = 0;
            frog.tongue.state = "idle";
        }
    }
}

/**
 * Displays the tongue (tip and line connection) and the frog (body). General frog function
 */
function drawFrog(frog) {


    // Draw the frog's body
    push();
    //Drawing at the origin of the frog, rather than the canvas, just easier
    translate(frog.body.x, frog.body.y);
    //Corresponds to setup(), angles are tracked in degrees
    angleMode(DEGREES);
    rotate(frog.direction)

    //Drawing the tongue tip and tongue so that it corresponds with frog rotation
    const lngth = frog.tongue.length;

    fill("#ff0000");
    noStroke();
    ellipse(0, -lngth, frog.tongue.size);

    stroke("#ff0000");
    strokeWeight(frog.tongue.size);
    line(0, 0, 0, -lngth);

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
 * Handling the different tongue launching for both frogs
 */
function keyPressed() {
    //Spacebar launches frog1 tongue
    if (key === ' ') {
        if (frog1.tongue.state === "idle") frog1.tongue.state = "outbound";
    }
    //Enter launches frog2 tongue
    if (keyCode === ENTER) {
        if (frog2.tongue.state === "idle") frog2.tongue.state = "outbound";
    }
}

/**
 * Alternating between different screens
 */
function mousePressed() {

    //Transfer from start screen to game
    if (whichScreen === "start") {
        whichScreen = "game";
    }
}