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
    // The frog's rocket has a position, size, speed, and state. Will be modified so that it is treated more like a projectile
    rocket: {
        x: undefined,
        y: 480,
        size: 20,
        speed: 20,
        //X and Y velocities
        vx: 0,
        vy: 0,
        //Maximum reach of a given
        maxDistance: 800,
        traveled: 0,
        // Determines how the rocket moves each frame
        state: "idle"
    }
};



//Variable to hold plane data
let planeData;

//Variables to hold the specific, individual planes
let redPlane;
let bluePlane;
let greenPlane;
let yellowPlane;

//Variable for the different screens of the game
let whichScreen = "start";

//Empty array for clouds
let clouds = [];

//Timer regarding the spawning of clouds
let cloudSpawner = 0;

//Empty array for bombs
let bombs = [];

//Timer for bombs
let bombTimer = 0;



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

    //Creates our canvas to work on
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
        x: random(20, 820),
        //The plane will be at a random X position in the canvas
        y: -200,
        speed: 2
    };

    bluePlane = {

        data: planeData.planes[1],
        x: random(20, 820),
        y: -185,
        speed: 3
    }

    greenPlane = {

        data: planeData.planes[2],
        x: random(20, 820),
        y: -175,
        speed: 4.5
    }


    yellowPlane = {

        data: planeData.planes[3],
        x: random(20, 300),
        y: -2500,
        speed: 1.5
    }
}

/**
 * Draws the background, and the various functions which make up the program
 */
function draw() {

    //Giving the canvas a background
    background("#87ceeb");

    //Game logic functions
    moveFrog();
    moveRocket();
    movePlanes();
    moveBombs();
    checkCollision();

    //Draw functions, to make things appear
    drawSun()
    drawFrog();
    drawBombs();
    drawPlanes(redPlane.data, redPlane.x, redPlane.y);
    drawPlanes(bluePlane.data, bluePlane.x, bluePlane.y);
    drawPlanes(greenPlane.data, greenPlane.x, greenPlane.y);
    drawPlanes(yellowPlane.data, yellowPlane.x, yellowPlane.y)



    //If statement to handle the different screens
    if (whichScreen === "start") {
        startScreen();
    }

    //Cloud spawn logic, calls the creatCloud function 
    cloudSpawner--;
    if (cloudSpawner <= 0) {
        createCloud();
        //The cloud will spawn every 40 to 150 frames 
        cloudSpawner = int(random(40, 150));
    };


    //Array going downwards, to not break the loop and in correspondance with the clouds.splice()
    for (let i = clouds.length - 1; i >= 0; i--) {

        //For namesake purposes. Writing c is easier than clouds[i]
        let c = clouds[i];

        c.x += c.speed;

        //Drawing the clouds
        push();
        fill(255, 255, 255, c.alpha);
        noStroke();
        ellipse(c.x, c.y, c.size * 1.4, c.size);
        ellipse(c.x + c.size * 0.4, c.y - 10, c.size, c.size * 0.7);
        ellipse(c.x + c.size * 0.8, c.y, c.size * 1.2, c.size * 0.8);

        //Removes the cloud when it passes the width and reinserts it into the array
        if (c.x > width + 100) {
            clouds.splice(i, 1);
        }
    }
}

/**
 * SUN
 */
function drawSun() {

    //Drawing a sun in the corner
    push();
    noStroke();
    fill("#FFDE21");
    ellipse(0, 0, 100);
    pop();
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

    //A cloud that will make up the clouds in the array
    let cloud = {

        x: -100,
        y: random(20, 120),
        size: random(40, 100),
        speed: random(0.3, 1.2),
        //Random transparency/opacity
        alpha: random(60, 200)
    };

    //Actually pushing the cloud variable into the array
    clouds.push(cloud);
}



/**
 * Function to gather the radius of the planes for collision purposes. Will be treating the plane as a circle, and returning its radius based on the length of the constants that make up the plane such as the body, wings, etc.
 */
function planeRadius(plane) {

    //Main & largest components of the plane
    const body = plane.body;
    const wings = plane.wings;

    //Scale matches JSON file data
    const s = plane.scale || 1;

    //Calculating the quarter length of the span and length in order to accquire a radius. Body and wings are multiplied by the scale, so it's accurate, and then quartered for the radius.
    const quartLength = (body.length * s) / 4;
    const quartSpan = (wings.span * s) / 4;

    //Using the larger of the length or the span to return a radius the cover the entire plane
    return max(quartLength, quartSpan);
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
        frog.rocket.state = "idle"
        frog.rocket.traveled = 0;
    }

    //Blue plane
    if (planeHit(frog.rocket, bluePlane)) {
        resetBluePlane();
        frog.rocket.state = "idle"
        frog.rocket.traveled = 0;
    }

    //Green plane
    if (planeHit(frog.rocket, greenPlane)) {
        resetGreenPlane();
        frog.rocket.state = "idle"
        frog.rocket.traveled = 0;
    }

    //Yellow Plane
    if (planeHit(frog.rocket, yellowPlane)) {
        resetYellowPlane();
        frog.rocket.state = "idle"
        frog.rocket.traveled = 0;
    }
}

/**
 * Function to create a bomb and push it into the arrray
 */
function dropBomb() {

    //Creating a constant for the bomb
    const bomb = {

        x: redPlane.x,
        y: redPlane.y,
        size: 20,
        speed: 4,
    }

    //Pushing it into the array
    bombs.push(bomb);

    //Making sure that bombs only drop if the plane is near the canvas
    if (redPlane.y < -50 || redPlane.y > height + 50) return;
}

/** 
 * Resets the red plane to original position, relies on movePlanes function
 */
function resetRedPlane() {

    redPlane.x = random(20, 820);
    redPlane.y = -200
}

/**
 * Resets the blue plane to original position, relies on movePlanes function. 
 */
function resetBluePlane() {

    bluePlane.x = random(20, 820);
    bluePlane.y = -150
}

/**
 * Resets the green plane to original position, relies on movePlanes fucntion
 */
function resetGreenPlane() {

    greenPlane.x = random(20, 820)
    greenPlane.y = -275
}

/**
 * Resets the yellow plane to original position, relies on movePlanes fucntion
 */
function resetYellowPlane() {

    yellowPlane.x = random(20, 820)
    yellowPlane.y = -2000
}

function moveBombs() {

    //Backwards loop
    for (let i = bombs.length - 1; i >= 0; i--) {

        //Constant attached to indexes in array, for easier writing purposes
        const b = bombs[i];

        //Speed of the bombs
        b.y += b.speed;

        //Removing the bomb if it goes off of the screen 
        if (b.y > height + b.size) {
            bombs.splice(i, 1)
        }
    }
}

/**
 * Function in order to move the planes across the screen
 */
function movePlanes() {

    //Moving the planes by adding the speed to their X position
    redPlane.y += redPlane.speed;
    bluePlane.y += bluePlane.speed;
    greenPlane.y += greenPlane.speed;
    yellowPlane.y += yellowPlane.speed;

    //Timer & logic for bomb dropping
    bombTimer--;
    if (bombTimer <= 0) {
        dropBomb();
        //Dropping a bomb every 20-65 frames
        bombTimer = int(random(20, 65));
    }

    //If the plane passes the height of the canvas, call on the resetPlanes function. Separate if statements for each plane
    if (redPlane.y > height + 50) {
        resetRedPlane();
    }
    if (bluePlane.y > height + 20) {
        resetBluePlane();
    }
    if (greenPlane.y > height + 20) {
        resetGreenPlane();
    }
    if (yellowPlane.y > height + 50) {
        resetYellowPlane();
    }
}


/**
 * Moves the frog with the "A" and "D"
 */
function moveFrog() {

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
 * Handles moving the rocket based on its state. Rocket will be treated as a projectile
 */
function moveRocket() {

    //Constants for matching the location of the rocket to the frog's body so that when idle, it is stored "in" the body
    const rocketX = frog.body.x
    const rocketY = frog.body.y

    // If the rocket is idle, it doesn't do anything
    if (frog.rocket.state === "idle") {
        //Positioning the rocket in the frog
        frog.rocket.x = rocketX;
        frog.rocket.y = rocketY;
        //0 distance if rocket is idle
        frog.rocket.traveled = 0;
    }
    // If the rocket is outbound, it moves up
    else if (frog.rocket.state === "outbound") {

        //When fired/outbound, velocity and speed are counted for
        frog.rocket.x += frog.rocket.vx;
        frog.rocket.y += frog.rocket.vy;
        frog.rocket.traveled += frog.rocket.speed;

        //Despawning the rocket if it leaves the canvas, or when it has reached the max distance
        if (frog.rocket.y < 0 || frog.rocket.y > height || frog.rocket.x < 0 || frog.rocket.x > width || frog.rocket.traveled >= frog.rocket.maxDistance) {
            frog.rocket.state = "idle";
            frog.rocket.traveled = 0;
        }
    }

}



/**
 * Function to draw the bombs from the array
 */
function drawBombs() {

    //Drawing for the individual bombs in the array
    for (let b of bombs) {

        push();
        noStroke();

        //Main body of the bomb
        fill(50);
        ellipse(b.x, b.y, b.size, b.size);
        //Fuse cap
        fill(30);
        ellipse(b.x, b.y - b.size * 0.4, b.size * 0.4, b.size * 0.4);
        //Ignited fuse
        fill(255, 165, 0);
        ellipse(b.x, b.y - b.size * 0.6, b.size * 0.2, b.size * 0.2);
        pop();
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
    //Rotating the plane to appear more logical when moving
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
    const bladeLen = prop.radius * 1.5;

    line(0, noseY, bladeLen * cos(angle), noseY + bladeLen * sin(angle));
    line(0, noseY, bladeLen * cos(angle + 180), noseY + bladeLen * sin(angle + 180));
    pop();
}

/**
 * Displays the various parts of the frog
 */
function drawFrog() {
    // Draw the rocket tip
    push();
    fill("#464646ff");
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
 * Launch the rocket on mouse click, and cycle through game screens
 */
function mousePressed() {

    //Transfer from start screen to game
    if (whichScreen === "start") {
        whichScreen = "game";
    }

    //Firing the tongue and acquiring direction for launch,
    if (whichScreen === "game" && frog.rocket.state === "idle") {

        //Determining where rocket launches from using constants that match the frog body
        const mouthX = frog.body.x
        const mouthY = frog.body.y - 40;

        //Acquiring direction of the mouse to the mouth so that launch goes from mouth to mouse
        let dx = mouseX - mouthX
        let dy = mouseY - mouthY

        //Using Pythagorean to actually acquire the distance
        const d = sqrt(dx * dx + dy * dy);

        //Vector normalized through division, resulting in a vector length of 1. Helps in directional consistency of the projectile regardless of mouse position
        if (d > 0) {
            dx /= d;
            dy /= d;
        }

        //Rocket starting position
        frog.rocket.x = mouthX;
        frog.rocket.y = mouthY;

        //Rocket movement
        frog.rocket.vx = dx * frog.rocket.speed;
        frog.rocket.vy = dy * frog.rocket.speed;

        //Reset travel distance after every shot
        frog.rocket.traveled = 0;

        //Firing the rocket
        frog.rocket.state = "outbound"
    }

}