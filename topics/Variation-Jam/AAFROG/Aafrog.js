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
    body: {
        x: 320,
        y: 700,
        size: 150
    },
    // The frog's rocket has a position, size, speed, and state
    rocket: {
        x: undefined,
        y: 480,
        size: 20,
        speed: 20,
        // Determines how the rocket moves each frame
        state: "idle" // State can be: idle, outbound, inbound
    }
};



//Variable to hold plane data
let planeData;

//Variables to hold the specific, individual planes
let redPlane;
let bluePlane;
let greenPlane;

//Variable for the different screens of the game
let whichScreen = "start";

//Empty array for clouds
let clouds = [];

//Timer regarding the spawning of clouds




/**
 * Preloads assets to ensure they appear in the program. Includes data, images, and sounds. 
 */
function preload() {

    //Load plane data from JSON file (assets are at project root)
    planeData = loadJSON("../ASSETS/Data/AAfrog.json");
}

/**
 * Creates the canvas, and assigning our plane variables to their respective data from the JSON file
 */
function setup() {
    createCanvas(840, 680);
    // Tailplane (horizontal rear wing)
    rectMode(CENTER);
    //Angle mode in degrees for plane propeller rotation
    angleMode(DEGREES);
    //Assign individual plane variables to their respective data from the JSON file and certain properties
    redPlane = {

        //Since the red plane is the first plane in the JSON file, it is at index 0
        data: planeData.planes[0],
        //Assigning a negative Y so that it begins off screen
        y: -200,
        //The plane will be at a random X position in the canvas
        x: random(20, 820),
        speed: 2
    };

    bluePlane = {

        data: planeData.planes[1],
        x: random(20, 820),
        y: -100,
        speed: 4
    }

    greenPlane = {

        data: planeData.planes[2],
        x: -100,
        y: random(20, 300),
        speed: 9
    }
}

/**
 * Draws the background, and the various functions which make up the program
 */
function draw() {

    background("#87ceeb");

    //Calling various functions to make up the game
    moveFrog();
    moverocket();
    drawFrog();
    movePlanes();
    drawPlanes(redPlane.data, redPlane.x, redPlane.y);
    drawPlanes(bluePlane.data, bluePlane.x, bluePlane.y);

    checkCollision();

    //If statement to handle the different screens
    if (whichScreen === "start") {
        startScreen();
    }


}

/**
 * Function for the creatin of the start screen
 */
function startScreen() {
    background("#ffffffff");
    textAlign(CENTER, CENTER);
    textSize(60);
    fill(0);
    textFont('IMPACT');
    textStyle(BOLD);

    //Title
    text("ANTI-AIRCRAFT FROG", width / 2, height / 2);

    //Prompt
    textStyle(NORMAL);
    textSize(20);
    text("Click to Start", width / 2, height / 2 + 80);

}

/**
 * Creating a cloud that is pushed into the clouds array
 */
function createCloud() {

    let cloud = {

        x: -100,
        y: random(20, 120),
        size: random(40, 100),
        speed: random(0.3, 1.2),
        //Random transparency/opacity
        alpha: random(60, 200);
    };
}

/**
 * Function in order to move the planes across the screen
 */
function movePlanes() {

    //Moving the planes by adding the speed to their X position
    redPlane.y += redPlane.speed;
    bluePlane.y += bluePlane.speed;
    greenPlane.y += greenPlane.speed;

    //If the plane passes the height of the canvas, call on the resetPlanes function. Separate if statements for each plane
    if (redPlane.y > height + 50) {
        resetRedPlane();
    }
    if (bluePlane.y > height + 20) {
        resetBluePlane();
    }
}


/** 
 * Resets the red plane to original position, relies on movePlanes function
 */
function resetRedPlane() {

    redPlane.x = random(20, 820);
    redPlane.y = -150
}

/**
 * Resets the blue plane to original position, relies on movePlanes function. 
 */
function resetBluePlane() {

    bluePlane.x = random(20, 820);
    bluePlane.y = -150
}

/**
 * Function to gather the radius of the planes for collision purposes. Will be treating the plane as a circle, and returning its radius based on the length of the constants that make up the plane such as the body, wings, etc.
 */
function planeRadius(plane) {

    //Main & largest components of the plane
    const body = plane.body;
    const wings = plane.wings;

    const s = planeData.scale || 1;

    //Calculating the half length of the span and length in order to accquire a radius. Body and wings are multiplied by the scale, so it's accurate, and then halved for the radius.
    const halfLength = (body.length * s) / 2;
    const halfSpan = (wings.span * s) / 2;

    //Using the larger of the length or the span to return a radius the cover the entire plane
    return max(halfLength, halfSpan);
}

/**
 * Detection of rocket and plane overlap. planeInstance refers to an individual plane.
 */
function planeHit(rocket, planeInstance) {

    //Rocket radius acquisition
    const rocketRadius = rocket.size / 2;

    //Plane radius
    const planeRad = planeRadius(planeInstance.data);

    //Overlap verification
    const d = dist(rocket.x, rocket.y, planeInstance.x, planeInstance.y);

    //True or false return, dependant on overlap detection
    return d <= rocketRadius + planeRad;

}

/**
 * Checking the collisions of the rocket and plane, and giving the collision a result
 */
function checkCollision() {

    //Collision for the red plane, causes rocket to return and resets plane
    if (planeHit(frog.rocket, redPlane)) {
        resetRedPlane();
        frog.rocket.state = "inbound"
    }

    //Blue plane
    if (planeHit(frog.rocket, bluePlane)) {
        resetBluePlane();
        frog.rocket.state = "inbound"
    }
}


/**
 * Function in order to draw the plane on the canvas, will be available/reusable for all planes
 */
function drawPlanes(plane, x, y) {

    push();
    //Alters the origin to the plane's position
    translate(x, y);
    //Matching the scale from the JSON file
    scale(plane.scale || 1);
    //Rotating the place to appear more logical when moving
    rotate(180);

    //Constant varaibles pertaining to different parts of the plane
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
    ellipse(0, -body.length * 0.15, body.width * 0.8, body.length * 0.3);

    //Wings of the plane 
    fill(plane.color);
    rect(0, -body.length * 0.05, wings.span, wings.depth, 4);

    //Tail 
    rect(0, body.length * 0.3, tail.span, tail.depth, 4);

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


/**
 * Moves the frog to the mouse position on x
 */
function moveFrog() {
    frog.body.x = mouseX;
}

/**
 * Handles moving the rocket based on its state
 */
function moverocket() {
    // rocket matches the frog's x
    frog.rocket.x = frog.body.x;
    // If the rocket is idle, it doesn't do anything
    if (frog.rocket.state === "idle") {
        // Do nothing
    }
    // If the rocket is outbound, it moves up
    else if (frog.rocket.state === "outbound") {
        frog.rocket.y += -frog.rocket.speed;
        // The rocket bounces back if it hits the top
        if (frog.rocket.y <= 0) {
            frog.rocket.state = "inbound";
        }
    }
    // If the rocket is inbound, it moves down
    else if (frog.rocket.state === "inbound") {
        frog.rocket.y += frog.rocket.speed;
        // The rocket stops if it hits the bottom
        if (frog.rocket.y >= height) {
            frog.rocket.state = "idle";
        }
    }
}



/**
 * Displays the various parts of the frog
 */
function drawFrog() {
    // Draw the rocket tip
    push();
    fill("#ff0000");
    noStroke();
    ellipse(frog.rocket.x, frog.rocket.y, frog.rocket.size);
    pop();

    // Draw the frog's body
    push();
    fill("#044904ff");
    noStroke();
    ellipse(frog.body.x, frog.body.y, frog.body.size);
    pop();

    //Adding modifications to make the frog look more like a frog by adding eyes, pupils, a stomach, and a smile
    push();

    //Eyes
    fill("#ffffff");
    noStroke();
    ellipse(frog.body.x - 30, frog.body.y - 65, frog.body.size / 6);
    ellipse(frog.body.x + 30, frog.body.y - 65, frog.body.size / 6);

    //Pupils
    fill("#000000");
    ellipse(frog.body.x - 30, frog.body.y - 65, frog.body.size / 8);
    ellipse(frog.body.x + 30, frog.body.y - 65, frog.body.size / 8);
    pop();

    //Adding a belly to the frog
    push();
    fill("#ecee88ff");
    noStroke();
    ellipse(frog.body.x, frog.body.y - 5, frog.body.size / 1.5, frog.body.size / 1.8);
    pop();

    //Adding a smile to the frog
    push();
    noFill();
    stroke("#000000");
    strokeWeight(4);
    arc(frog.body.x, frog.body.y - 40, frog.body.size / 4, frog.body.size / 5, 20, 160);
    pop();

    //Adding nostrils to the frog
    push();
    fill("#000000");
    noStroke();
    ellipse(frog.body.x - 10, frog.body.y - 50, frog.body.size / 30);
    ellipse(frog.body.x + 10, frog.body.y - 50, frog.body.size / 30);
    pop();
}


/**
 * Launch the rocket on click (if it's not launched yet)
 */
function mousePressed() {
    if (frog.rocket.state === "idle") {
        frog.rocket.state = "outbound";
    }

    if (whichScreen === "start") {
        whichScreen = "game";
    }
}