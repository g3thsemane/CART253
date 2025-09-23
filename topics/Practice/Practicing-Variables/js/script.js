/**
 * Variables Pratice
 * Benjamin Merhi
 *
 * Practicing using variables so I don't get lost
 */

"use strict";

//Creating variable for tinyMan
let tinyMan = {
    x: 300, //Starting x position of tinyMan
    y: 80,  //Starting y position of tinyMan
    size: 20,  //Diameter of tinyMan
    fill: {   //Color of tinyMan
        r: 70,
        g: 45,
        b: 182,
    },
    speedX: 1, //Dictates how fast tinyMan moves horizontally
    speedY: 1, //Dictates how fast tinyMan moves vertically
}

let fatBoy = {
    x: 300,
    y: 520,
    size: 80,
    fill: {
        r: 178,
        g: 34,
        b: 179,
    },
    speedX: 0.2,
    speedY: 0.2,
}


//Creating Canvas
function setup() {
    createCanvas(600, 600)
}

//Brings life to our imagination
function draw() {

    // Making a background that changes color based on the positions of tinyMan and fatBoy
    let r = map(tinyMan.x, 0, width, 0, 255); //Mapping tinyMan's x position to a value between 0 and 255
    let g = map(fatBoy.y, 0, height, 0, 255); //Mapping fatBoy's y position to a value between 0 and 255
    let b = map(tinyMan.y + fatBoy.x, 0, width + height, 0, 255); //Mapping the sum of tinyMan's y position and fatBoy's x position to a value between 0 and 255

    background(r, g, b);


    // background(150, 25, 255)

    //1. Adding "tinyMan" variable to canvas
    push();
    noStroke();
    fill(tinyMan.fill.r, tinyMan.fill.g, tinyMan.fill.b);
    circle(tinyMan.x, tinyMan.y, tinyMan.size);
    pop();

    //1.1 Moving tinyMan across the canvas
    tinyMan.x = tinyMan.x + tinyMan.speedX; //Updating tinyMan's x position
    tinyMan.y = tinyMan.y + tinyMan.speedY; //Updating tinyMan's y position

    //1.1.1 Make tinyMan's path more random
    tinyMan.speedX += random(-0.5, 0.5); //Adding a range of -0.5 to 0.5 to tinyMan's speedX
    tinyMan.speedY += random(-0.5, 0.5); //Adding a range of -0.5 to 0.5 to tinyMan's speedY

    //1.1.2 Constraining tinyMan's speed to prevent it from getting too fast
    tinyMan.speedX = constrain(tinyMan.speedX, -5, 5); //Constraining tinyMan's speedX to be between -5 and 5
    tinyMan.speedY = constrain(tinyMan.speedY, -5, 5); //Constraining tinyMan's speedY to be between -5 and 5

    //1.2 Regulating tinyMan's speed
    if (tinyMan.x > width || tinyMan.x < 0) { //Analyzing if tinyMan goes off the canvas horizontally
        tinyMan.speedX = tinyMan.speedX * -1; //If so, reverse his direction and double his speed
    }
    if (tinyMan.y > height || tinyMan.y < 0) { //Analyzing if tinyMan goes off the canvas vertically
        tinyMan.speedY = tinyMan.speedY * -1;  //If so, reverse his direction and double his speed
    }

    //2. Adding "fatBoy" variable to canvas
    push();
    noStroke();
    fill(fatBoy.fill.r, fatBoy.fill.g, fatBoy.fill.b);
    circle(fatBoy.x, fatBoy.y, fatBoy.size);
    pop();

    //2.1 Moving fatBoy across the canvas
    fatBoy.x += fatBoy.speedX; //Using "+="" is shorthad for fatBoy.x = fatBoy.x + fatBoy.speedX;
    fatBoy.y += fatBoy.speedY;

    //2.2 Regulating fatBoy's speed
    if (fatBoy.x > width || fatBoy.x < 0) {
        fatBoy.speedX = fatBoy.speedX * -1;
    }
    if (fatBoy.y > height || fatBoy.y < 0) {
        fatBoy.speedY = fatBoy.speedY * -1;
    }

    //2.3 Making fatBoy's path more random
    fatBoy.speedX += random(-0.2, 0.2);

}
