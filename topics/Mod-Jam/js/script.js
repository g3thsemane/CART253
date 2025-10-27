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
        speed: 35,
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

//Creating a secondly fly variable that will forgive some sins 
const flyForgiveness = {

    x: 0,
    y: 175,
    size: 10,

    speedX: 4,
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

//Variable for the score
let score = 0;

//Variable to let the gameover screen fade in
let gameoverFade = 0;

//Variable to track if the maximum number of flies has been eaten, in order to commence the descent into hell
let scoreMax = false;


/**
 * Creates the canvas and initializes the fly
 */
function setup() {
    createCanvas(640, 480);
    // Give the fly its first random position
    resetFly();
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
}

function draw() {
    background("#87ceeb");
    moveFly();
    drawFly();
    moveFlyForgiveness();
    drawFlyForgivness();
    moveFrog();
    moveTongue();
    drawFrog();
    checkTongueFlyOverlap();
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
        text("Score: " + score, 10, 10);
    }


}

//Implementing the different screens functions below, and the order/cause of their appearance

//Beginning with the Start Screen, features the title of the game and a prompt to click to start. Upon clicking, it will lead the user to the instructions screen by using an if statement.

function startScreen() {
    background("#87ceeb");
    textAlign(CENTER, CENTER);
    textSize(40);
    fill(0);
    textFont('Courier New');
    textStyle(BOLD);

    //Title
    text("Frogfrogfrog", width / 2, 200);

    //Prompt
    textStyle(NORMAL);
    textSize(20);
    text("Click to Start", width / 2, height / 2 + 40);

}

//Instructions screen

function instructionsScreen() {
    background("#87ceeb");
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
    const instr = "Move the frog along the X-axis with your mouse, and click the mouse to launch the tongue and catch the flies";
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

function moveFlyForgiveness() {
    flyForgiveness.x += flyForgiveness.speedX;

    if (flyForgiveness.x > width) {
        resetFlyForgiveness();
    }
}

function resetFlyForgiveness() {
    flyForgiveness.x = 0;
    flyForgiveness.y = random(5, 175)
}

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


/**
 * Moves the fly according to its speed
 * Resets the fly if it gets all the way to the right
 */
function moveFly() {
    // Move the fly along the X axis
    fly.x += fly.speedX;
    //Randomizing the fly's horizontal movement speed for more dynamic flight patterns
    fly.speedX += random(-0.5, 0.5);
    //Adding a constrain so the fly does not become absurdly quick, between speed = 2 and speed = 10
    fly.speedX = constrain(fly.speedX, 2, 15);

    //Move the fly along the Y axis
    fly.y += fly.speedY;
    //Randomizing the fly's vertical movement speed for more dynamic flight patterns
    fly.speedY += random(-0.5, 0.5);
    //Adding a constrain so the fly does not become absurdly quick, between speed = 0.1 and speed = 2
    fly.speedY = constrain(fly.speedY, -1, 2)

    // Handle the fly going off the canvas
    if (fly.x > width) {
        resetFly();
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

    //Randomizing the fly's size for more variation
    fly.size += random(-0.2, 0.2);
    fly.size = constrain(fly.size, 3, 15);

    //Adding modifications to make the fly look more like a fly by adding wings
    push();
    fill("#ffffffff");
    noStroke();
    ellipse(fly.x - 3, fly.y - 5, fly.size / 1.5, fly.size / 4);
    ellipse(fly.x + 3, fly.y - 5, fly.size / 1.5, fly.size / 4);
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
        resetFly()

        //Cue sound effects upon eating a fly
        flyAte.play();
        yumYum.play();

        // Bring back the tongue
        frog.tongue.state = "inbound";

        frog.body.size += 4; //Making the frog grow bigger upon eating a fly
        frog.tongue.speed += 0.5; //Making the tongue faster upon eating a fly


        //Increasing the score upon eating a fly, with a maximum score of 20, after which the score will start decrease to, leading to the game over screen
        if (!scoreMax) {
            score += 1;
            if (score >= 20) {
                score = 20;
                scoreMax = true; //Setting scoreMax to true once the maximum score is reached
            }
        }

        else {
            score -= 20;
            //Ensuring the game is over once a score of  0 is reached
            if (score <= 0) {
                score = 0;
                gameoverFade = 0;
                whichScreen = "gameover";
                //Game music stops when game over 
                rainSong.stop()
                //Evil laugh plays when game over
                laughEvil.play()
            }
        }
    }

}

function checkTongueFlyForgivenessOverlap() {
    // Get distance from tongue to fly
    const d = dist(frog.tongue.x, frog.tongue.y, flyForgiveness.x, flyForgiveness.y);
    // Check if it's an overlap
    const eaten = (d < frog.tongue.size / 2 + flyForgiveness.size / 2);

    if (eaten) {
        score -= 5
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

    if (frog.tongue.state === "idle") {
        frog.tongue.state = "outbound";
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
    }
}