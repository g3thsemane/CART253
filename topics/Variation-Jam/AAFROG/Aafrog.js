/**
 * Anti-Aircraft Frog
 * Benjamin Merhi
 * 
 * A game where a frog shoots rockets in order to destroy planes
 * 
 * Instructions:
 * - Move frog with mouse
 * - Click to launch rockets
 * - Destroy planes to score points 
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
        y: 720,
        size: 150
    },
    // The frog's tongue has a position, size, speed, and state
    tongue: {
        x: undefined,
        y: 480,
        size: 20,
        speed: 20,
        // Determines how the tongue moves each frame
        state: "idle" // State can be: idle, outbound, inbound
    }
};
const fly = {
    x: 0,
    y: 200, // Will be random
    size: 10,
    speed: 3
};


//Variable to hold plane data
let planeData;

//Variables to hold the specific, individual planes
let redPlane;
let bluePlane;
let greenPlane;



/**
 * Preloads assets to ensure they appear in the program. Includes data, images, and sounds. 
 */
function preload() {

    //Load plane data from JSON file
    planeData = loadJSON("ASSETS/Data/AAfrog.json");
}

/**
 * Creates the canvas, and assigning our plane variables to their respective data from the JSON file
 */
function setup() {
    createCanvas(840, 680);

    // Give the fly its first random position
    resetFly();

    //Assign individual plane variables to their respective data from the JSON file and certain properties
    redPlane = {

        //Since the red plane is the first plane in the JSON file, it is at index 0
        data: planeData.planes[0],
        //Assigning a negative X so that it begins off screen
        x: -10,
        //The plane will be at a random
        y: random(20, 300),
        speed: 5
    };

    bluePlane = {

        data: planeData.planes[1],
        x: -10,
        y: random(50, 300),
        speed: 7
    }

    greenPlane = {

        data: planeData.planes[2],
        x: -10,
        y: random(20, 300),
        speed: 9
    }

    resetFly();
}

function draw() {
    background("#87ceeb");
    moveFly();

    moveFrog();
    moveTongue();
    drawFrog();
    checkTongueFlyOverlap();
    movePlanes();
    drawPlanes(redPlane.data, redPlane.x, redPlane.y);

}

/**
 * Function in order to move the planes across the screen
 */
function movePlanes() {

    //Moving the planes by adding the speed to their X position
    redPlane.x += redPlane.speed;
    bluePlane.x += bluePlane.speed;
    greenPlane.x += greenPlane.speed;
}

/**
 * Function in order to draw the plane on the canvas, will be available/reusable for all planes
 */
function drawPlanes(plane, x, y) {

    push();

    translate(x, y);

    //Matching the scale from the JSON file
    scale(plane.scale || 1);

    const body = plane.body;
    const wings = plane.wings;
    const tail = plane.tail
    const prop = plane.propeller;

    //Body of the plane
    noStroke();
    fill(plane.color);
    rect(0, 0, body.width, body.length, 6);

    //Window of the plane
    fill(0, 50);
    ellipse(0, -body.length * 0.15, body.width * 0.08, body.length * 0.3);

    //Wings of the plane 
    fill(plane.color);
    rect(0, -body.length * 0.05, wings.span, wings.depth, 4);

    //Tail Fin
    rect(0, body.length * 0.3 - tail.depth * 0.8, tail.span * 0.3, tail.depth * 0.8);

    //Propeller 
    const noseY = -body.length / 2;
    fill(80);
    ellipse(0, noseY, prop.radius * 1.2, prop.radius * 1.2);

    //Spin propeller blades
    stroke(80);
    strokeWeight(2);
    const angle = frameCount * 20;
    const bladeLen = prop.radius * 2;

    line(0, noseY, bladeLen * cos(angle), noseY + bladeLen * sin(angle));
    line(0, noseY, bladeLen * cos(angle + 180), noseY + bladeLen * sin(angle + 180));
    pop();
}

function resetFly() {
    fly.x = 0;
    fly.y = random(0, 300);
}


/** 
 * Resets the fly to the left with a random y
 */
function resetPlanes() {


    fly.x = 0;
    fly.y = random(0, 300);
}

/**
 * Moves the frog to the mouse position on x
 */
function moveFrog() {
    frog.body.x = mouseX;
}

/**
 * Handles moving the tongue based on its state
 */
function moveTongue() {
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
function drawFrog() {
    // Draw the tongue tip
    push();
    fill("#ff0000");
    noStroke();
    ellipse(frog.tongue.x, frog.tongue.y, frog.tongue.size);
    pop();



    // Draw the frog's body
    push();
    fill("#00ff00");
    noStroke();
    ellipse(frog.body.x, frog.body.y, frog.body.size);
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