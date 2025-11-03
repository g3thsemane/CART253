/**
 * Frogfrogfrog
 * Pippin Barr
 * Modifications done by Benjamin Merhi
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
        size: 150
    },
    // The frog's tongue has a position, size, speed, and state
    tongue: {
        x: undefined,
        y: 480,
        size: 20,
        speed: 30,
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
    //Adding speedX and speedY for modifications to the fly's flight path
    speedX: 3,
    speedY: 1,
};

//Creating a new array for the fly, so that there can be multiple flies on screen
let flies = [];
//Declaring the amount of possible flies
const nFlies = 10;

//Creating a secondly fly variable that will forgive some sins. eating this fly will deduct points. This fly follows the original design of Pippin's fly
const flyForgiveness = {

    x: 0,
    y: 175,
    size: 5,

    speedX: 8,
    speedY: 2,
};



//Varialbe to track screens
let whichScreen = "start";

//Varbiables for sound effects
let flyAte;
let yumYum;
let rainSong;
let img1;
let laughEvil;
let holySound;

//Variable for the score
let score = 0;

//Variable to let the gameover screen fade in
let gameoverFade = 0;

//Variable to track if the maximum number of flies has been eaten, in order to commence the descent into hell
let scoreMax = false;

//Array for rain 
//let = rain[];


/**
 * Creates the canvas and initializes the fly
 */
function setup() {
    createCanvas(640, 480);

    // Give the fly its first random position
    resetFly();

    //Array, as declared earlier
    flies = [];

    //Introducing a loop that will "repeat" the amount of flies I want present on my canvas. As long as "i" is less than nFlies(10), there will be one fly added through the i++
    for (let i = 0; i < nFlies; i++) {

        //Push in order to add to the array, until loop is complete
        flies.push({
            x: 0,
            y: random(0, 300),
            size: 10,
            speedX: 3,
            speedY: 1,
        });
    }

}

//Preload function load sound and image files before the program begins
function preload() {

    //Sound when a fly is ate
    flyAte = loadSound('assets/sounds/flyAte.wav');
    //Sound frog makes when fly is ate
    yumYum = loadSound('assets/sounds/yumYum.mp3');
    //Background song
    rainSong = loadSound('assets/sounds/rainSong.ogg');
    //Image for game over screen
    img1 = loadImage('assets/images/thirdcircle.webp');
    //Evil laugh when game over
    laughEvil = loadSound('assets/sounds/laughEvil.wav');
    //Sound for fly of forgiveness
    holySound = loadSound('assets/sounds/holySound.mp3')
}

function draw() {

    background("#87ceeb");
    moveFlies();
    drawFlies();
    moveFlyForgiveness();
    drawFlyForgivness();
    moveFrog();
    moveTongue();
    drawFrog();
    checkTongueFliesOverlap();
    checkTongueFlyForgivenessOverlap();

    //Creating the if statements to for the different screens: Start, Instructions, and Game Over. After many trials and tribulations, it was learn that the actual "game screen" has to be left out in order for the program to work properly.

    if (whichScreen === "start") {
        startScreen();
    } else if (whichScreen === "instructions") {
        instructionsScreen();
    } else if (whichScreen === "gameover") {
        //Adding the fade-in effect for the gameoverscreen
        gameoverFade = min(gameoverFade + 5, 255);
        gameoverScreen(gameoverFade);

    }

    //Displaying the score at the top left of the screen, only during the game
    if (whichScreen === "game") {
        fill(0);
        textSize(20);
        textAlign(LEFT, TOP);
        textFont('Courier New');
        text("SIN: " + score, 10, 10);
    }


    //Making the tongue of the frog launch automatically rather than relying on mousePressed
    if (whichScreen === "game" && frog.tongue.state === "idle") {
        frog.tongue.state = "outbound";
    }


}

//Implementing the different screens functions below, and the order/cause of their appearance

//Beginning with the Start Screen, features the title of the game and a prompt to click to start. Upon clicking, it will lead the user to the instructions screen by using an if statement.

function startScreen() {
    background("#81282bff");
    textAlign(CENTER, CENTER);
    textSize(40);
    fill(0);
    textFont('Courier New');
    textStyle(BOLD);

    //Title
    text("DANTE'S FROG", width / 2, 200);

    //Prompt
    textStyle(NORMAL);
    textSize(20);
    text("Click to Start", width / 2, height / 2 + 40);

}

//Instructions screen

function instructionsScreen() {

    background("#81282bff");
    textAlign(CENTER, CENTER);
    textSize(30);
    fill(0);
    textFont('Courier New');

    //Instructions Title
    textStyle(BOLD);
    text("Instructions", width / 2, 100);

    //Actual Instructions
    textStyle(NORMAL);
    textSize(20);
    textWrap(WORD);
    const instr = "Move the frog with the mouse. Avoid eating more than 20 flies to prevent your descent into hell. Yellow fly removes a sin, keeping you alive for longer";
    const boxW = 500;
    text(instr, width / 2 - boxW / 2, height / 2, boxW);
    textSize(20);
    text("Click to continue", width / 2, 350);

}

//Game Over screen, making it accept the fade effect
function gameoverScreen(fade) {

    //Setting the background to black with the fade effect
    background(0, fade);


    //Applying the fade effect to the image
    tint(255, fade)

    //Inserting Centering the image
    image(img1, 0, 0);

    //Resizing the image to fit the canvas
    img1.resize(640, 480);

    //Adding text with fade effect
    textAlign(CENTER, CENTER);
    fill(0, fade);
    textSize(30);
    fill(74, 1, 3);
    textFont('Courier New');
    textStyle(BOLD);
    textSize(40);
    text("Click Any Key To Restart", 320, 460);
}


//Functions for the second fly that I added, these follow the same code as the original fly with some minor tweaks
function moveFlyForgiveness() {

    flyForgiveness.x += flyForgiveness.speedX;

    if (flyForgiveness.x > width) {
        resetFlyForgiveness();
    }
}

//Reset the fly of forgivness
function resetFlyForgiveness() {

    flyForgiveness.x = 0;
    flyForgiveness.y = random(5, 175)
}

//Drawing the fly of forgiveness
function drawFlyForgivness() {
    push();
    noStroke();
    fill("#ffe100ff");
    ellipse(flyForgiveness.x, flyForgiveness.y, flyForgiveness.size);
    pop();

    //Adding modifications to make the fly look more like a fly by adding wings
    push();
    fill("#ffffffff");
    noStroke();
    ellipse(flyForgiveness.x - 3, flyForgiveness.y - 5, flyForgiveness.size / 1.5, flyForgiveness.size / 4);
    ellipse(flyForgiveness.x + 3, flyForgiveness.y - 5, flyForgiveness.size / 1.5, flyForgiveness.size / 4);
    pop();
}

//Check the tongue and fly of forgiveness overlap
function checkTongueFlyForgivenessOverlap() {

    // Get distance from tongue to fly
    const d = dist(frog.tongue.x, frog.tongue.y, flyForgiveness.x, flyForgiveness.y);

    // Check if it's an overlap
    const eaten = (d < frog.tongue.size / 2 + flyForgiveness.size / 2);

    //If statement for eating a forgiveness fly
    if (eaten) {
        resetFlyForgiveness();

        //When eaten, a point is removed delaying your trip to the third circle of hell
        score -= 1

        //Retracts tongue when eaten
        frog.tongue.state = "inbound";

        holySound.play();
    }

}



//Moving multiple flies
function moveFlies() {
    for (let fly of flies) {

        //Speed for X-Axis
        fly.x += fly.speedX;

        //Randomizing the speed of the flies on the X-Axis
        fly.speedX += random(-0.5, 0.5);

        //Constraining the speed of the flies so that they don't get too quick
        fly.speedX = constrain(fly.speedX, 2, 15);

        //Speed for Y-Axis
        fly.y += fly.speedY;

        //Randomizing the speed of the flies on the Y-Axis
        fly.speedY += random(-0.5, 0.5);

        //Constraining the speed of the flies so that they don't get too quick
        fly.speedY = constrain(fly.speedY, -1, 2);


        //Resets the fly if it surpasses the canvas
        if (fly.x > width) {
            fly.x = 0;
            fly.y = random(0, 300);
        }
    }
}



//Function to draw the multiple flies
function drawFlies() {

    //As "fly" is the same as the rest of the flies in the array, this draws all the flies
    for (let fly of flies) {

        push();
        noStroke();
        fill("#000000");
        ellipse(fly.x, fly.y, fly.size);
        pop();

        //Randomizing the size of the flies as they spawn in
        fly.size += random(-0.2, 0.2);

        //Constraining the size of the flies to ensure that they do not grow too big
        fly.size = constrain(fly.size, 3, 15);

        push();
        fill("#ffffffff");
        noStroke();
        ellipse(fly.x - 3, fly.y - 5, fly.size / 1.5, fly.size / 4);
        ellipse(fly.x + 3, fly.y - 5, fly.size / 1.5, fly.size / 4);
        pop();
    }
}

/**
 * Resets the fly to the left with a random y
 */
function resetFly() {
    fly.x = 0;
    fly.y = random(0, 300);
}

/**
 * Moves the frog to the mouse position on x
 */
function moveFrog() {

    //Adding a constrain to prevent the frog from going off screen
    frog.body.x = constrain(mouseX, frog.body.size / 6, width - frog.body.size / 6);

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

    // Draw the rest of the tongue
    push();
    stroke("#ff0000");
    strokeWeight(frog.tongue.size);
    line(frog.tongue.x, frog.tongue.y, frog.body.x, frog.body.y);
    pop();

    // Draw the frog's body
    push();
    fill("#00ff00");
    noStroke();
    ellipse(frog.body.x, frog.body.y, frog.body.size);
    pop();

    //Adding modifications to make the frog look more like a frog by adding eyes
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
}



function checkTongueFliesOverlap() {
    for (let fly of flies) {
        const d = dist(frog.tongue.x, frog.tongue.y, fly.x, fly.y);
        const eaten = (d < frog.tongue.size / 2 + fly.size / 2);
        if (eaten) {

            //Reset Fly
            fly.x = 0;
            fly.y = random(0, 300);

            flyAte.play();
            yumYum.play();
            frog.tongue.state = "inbound";


            frog.tongue.speed += 0.5;


            //If the score is under 20, eating a fly counts for one point. Relies on my scoreMax boolean as listed at the beginning
            if (!scoreMax) {

                //By default the score increases by 1 point
                score += 1;

                //If the score has reached 20, the max score(scoreMax) has been reached
                if (score >= 20) {
                    score = 20;
                    scoreMax = true;
                }
            }

            //As a result of the max score being reached, 20 points are deducted bringing you to 0 points, which is the required value for the game to be over.
            else {
                score -= 20;
                if (score <= 0) {
                    score = 0;
                    gameoverFade = 0;
                    whichScreen = "gameover";
                    rainSong.stop();
                    //The evil laugh plays
                    laughEvil.play();
                }
            }

            //End loop, prevents multiple flies from being eaten
            break;
        }
    }
}

/**
 * Launch the tongue on click (if it's not launched yet)
 */
function mousePressed() {

    //Initialzing rainSong to play once game has began
    if (typeof userStartAudio === 'function') {
        userStartAudio();
    }

    //Plays rainSong and loops it
    if (rainSong && !rainSong.isPlaying()) {
        rainSong.loop();
    }

    //Changing the screens upon clicking the mouse
    if (whichScreen === "start") {
        whichScreen = "instructions";
    } else if (whichScreen === "instructions") {
        whichScreen = "game";
    } else if (whichScreen === "gameover") {
    }

}

//Key pressed function in order to restart the game upon game over, all variables are reset to their original values
function keyPressed() {
    if (whichScreen === "gameover") {
        score = 0;
        scoreMax = false;
        frog.body.size = 150;
        frog.tongue.speed = 35;
        frog.tongue.y = 480;
        frog.tongue.state = "idle";
        resetFly();
        gameoverFade = 0;
        whichScreen = "game";
        rainSong.play()
        if (rainSong && !rainSong.isPlaying()) {
            rainSong.loop();
        }
    }
}