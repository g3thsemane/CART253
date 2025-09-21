/**
 * When I Look In The Mirror
 * Benjamin Merhi
 * 
 * This is a digital self-portrait made using the p5js
 * library
 */

"use strict";

//Setting up objects to represent different parts of my face

let myHead = {
    x: 340,
    y: 420,
    width: 325,
    height: 325,
    fill: {
        r: 255,
        g: 227,
        b: 189,
    }
}

let myHair = {
    x: 150,
    y: 170,
    width: 390,
    height: 200,
    fill: {
        r: 64,
        g: 40,
        b: 10,
    }
}

let eyeWhite1 = {
    x: 250,
    y: 410,
    width: 40,
    height: 20,
    fill: {
        r: 255,
        g: 255,
        b: 255,
    }
}

let eyePupil1 = {
    x: 250,
    y: 410,
    width: 20,
    height: 20,
    fill: {
        r: 0,
        g: 0,
        b: 0,
    }
}

let eyeWhite2 = {
    x: 390,
    y: 410,
    width: 40,
    height: 20,
    fill: {
        r: 255,
        g: 255,
        b: 255,
    }
}

let eyePupil2 = {
    x: 390,
    y: 410,
    width: 20,
    height: 20,
    fill: {
        r: 0,
        g: 0,
        b: 0,
    }
}

let myMouth = {
    x: 315,
    y: 500,
    width: 50,
    height: 20,
    fill: {
        r: 247,
        g: 173,
        b: 156,
    }
}

//Add constants so it doesn't mess up the organization of the face

const headBaseY = myHead.y;
const myHairOffsetY = myHair.y - headBaseY;
const eyeWhite1OffsetY = eyeWhite1.y - headBaseY;
const eyePupil1OffsetY = eyePupil1.y - headBaseY;
const eyeWhite2OffsetY = eyeWhite2.y - headBaseY;
const eyePupil2OffsetY = eyePupil2.y - headBaseY;
const myMouthOffsetY = myMouth.y - headBaseY;


/**
 * Preparing my project by creating a canvas to work on
*/
function setup() {
    //Creating a nice big square for the canvas
    createCanvas(680, 680)
}


/**
 * This draw function will bring life to many shapes, thus
 * giving life to my digital self
*/
function draw() {
    //Starting with the background, a nice calm blue
    background(152, 217, 227)


    //On to the red t-shirt/shoulders which will be placed at
    //the bottom portion of the canvas
    push();
    noStroke();
    fill(204, 4, 4);
    rect(45, 630, 590, 100)
    pop();

    //Creating the shoulders
    push();
    noStroke();
    fill(184, 18, 18);
    quad(75, 600, 605, 600, 635, 630, 45, 630)
    pop();

    //Going to add a collar to the shirt so it doesn't
    //look too bizarre, including some skin
    push();
    noStroke();
    fill(255, 227, 189)
    ellipse(340, 610, 225, 50)
    pop();

    //Time to add the neck
    //because that's how life works
    push();
    noStroke();
    fill(255, 227, 189)
    rect(241, 537, 200, 75)
    pop();

    //Interior portion of the neck
    push();
    noStroke();
    fill(242, 215, 177)
    ellipse(341, 540, 202, 50)
    pop();

    //Cartoon-esque bone in neck
    push();
    noStroke();
    fill(255, 255, 255)
    rect(320, 478, 40, 60)
    pop();

    push();
    noStroke();
    fill(255, 255, 255)
    circle(325, 478, 40)

    push();
    noStroke();
    fill(255, 255, 255)
    circle(355, 478, 40);

    push();
    noStroke();
    fill(255, 255, 255)
    ellipse(340, 538, 40, 15)
    pop();

    //Now for the head portion, which will include the facial features and hair
    //I am aiming for these to all be attached so they can move together

    //Making sure that it can move
    myHead.y = mouseY;

    push();

    //Head
    noStroke();
    fill(myHead.fill.r, myHead.fill.g, myHead.fill.b)
    circle(myHead.x, myHead.y, myHead.width, myHead.height)


    //Hair
    noStroke();
    fill(myHair.fill.r, myHair.fill.g, myHair.fill.b)
    rect(myHair.x, myHead.y + myHairOffsetY, myHair.width, myHair.height,)



    //Eye 1
    noStroke();
    fill(eyeWhite1.fill.r, eyeWhite1.fill.g, eyeWhite1.fill.b)
    rect(eyeWhite1.x, myHead.y + eyeWhite1OffsetY, eyeWhite1.width, eyeWhite1.height)



    //Pupil 1
    noStroke();
    fill(eyePupil1.fill.r, eyePupil1.fill.g, eyePupil1.fill.b)
    square(eyePupil1.x, myHead.y + eyePupil1OffsetY, eyePupil1.width, eyePupil1.height)



    //Eye 2
    noStroke();
    fill(eyeWhite2.fill.r, eyeWhite2.fill.g, eyeWhite2.fill.b)
    rect(eyeWhite2.x, myHead.y + eyeWhite2OffsetY, eyeWhite2.width, eyeWhite2.height)



    //Pupil 2
    noStroke();
    fill(eyePupil2.fill.r, eyePupil2.fill.g, eyePupil2.fill.b)
    square(eyePupil2.x, myHead.y + eyePupil2OffsetY, eyePupil2.width, eyePupil2.height)


    //Mouth
    noStroke();
    fill(myMouth.fill.r, myMouth.fill.g, myMouth.fill.b)
    rect(myMouth.x, myHead.y + myMouthOffsetY, myMouth.width, myMouth.height)



    pop();


}