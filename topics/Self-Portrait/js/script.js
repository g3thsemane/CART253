/**
 * When I Look In The Mirror
 * Benjamin Merhi
 * 
 * This is a digital self-portrait made using the p5js
 * library, that involves some user interraction
 * 
 * Controls:
 * -Press and hold mouse to move the head
 * 
 * Uses:
 * p5.js
 * https://p5js.org
 */

"use strict";

//Setting up JS objects to represent different parts of my face

let myHead = {
    x: 175,
    y: 360,
    width: 325,
    height: 215,
    fill: {
        r: 255,
        g: 227,
        b: 189,
    }
}


let myHair = {
    x: 150,
    y: 170,
    width: 375,
    height: 200,
    fill: {
        r: 64,
        g: 40,
        b: 10,
    }
}


let hairTop = {
    x1: 175,
    y1: 145,
    x2: 505,
    y2: 145,
    x3: 525,
    y3: 170,
    x4: 150,
    y4: 170,
    fill: {
        r: 54,
        g: 33,
        b: 7,
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
    },
    speedX: 0.1 // Giving this pupil a speed so it can move

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
    },
    speedX: 0.1 // Giving this pupil a speed so it can move
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


let myNose = {
    x: 330,
    y: 460,
    width: 20,
    height: 30,
    fill: {
        r: 219,
        g: 187,
        b: 149,
    }
}


let eyeBrow1 = {
    x: 250,
    y: 390,
    width: 40,
    height: 10,
    fill: {
        r: 64,
        g: 40,
        b: 10,
    }
}


let eyeBrow2 = {
    x: 390,
    y: 390,
    width: 40,
    height: 10,
    fill: {
        r: 64,
        g: 40,
        b: 10,
    }
}


//Adding a background variable so that it can change colours as the head rises
let skyShade = {
    fill: {
        r: 152,
        g: 217,
        b: 227
    }
}


//Adding constant offsets so it doesn't mess up the organization of the face while moving along the Y axis
//Offsets will constantly update the position of the different face variables dependant on the position of myHead.y
//"headBaseY" will serve as the main point of reference for the other moving parts
const headBaseY = myHead.y;
const myHairOffsetY = myHair.y - headBaseY;
const eyeWhite1OffsetY = eyeWhite1.y - headBaseY;
const eyePupil1OffsetY = eyePupil1.y - headBaseY;
const eyeWhite2OffsetY = eyeWhite2.y - headBaseY;
const eyePupil2OffsetY = eyePupil2.y - headBaseY;
const myMouthOffsetY = myMouth.y - headBaseY;
const myNoseOffsetY = myNose.y - headBaseY;
const eyeBrow1OffsetY = eyeBrow1.y - headBaseY;
const eyeBrow2OffsetY = eyeBrow2.y - headBaseY;
const hairTop1OffsetY = hairTop.y1 - headBaseY;
const hairTop2OffsetY = hairTop.y2 - headBaseY;
const hairTop3OffsetY = hairTop.y3 - headBaseY;
const hairTop4OfssetY = hairTop.y4 - headBaseY;



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
    background(skyShade.fill.r, skyShade.fill.g, skyShade.fill.b);

    //Making the background become darker as the myHead.y variable rises up the canvas
    //the skyShade.fill.r follows a "map()" function, so that the colour range of skyShade is relative to the length of the canvas. When myHead.Y follows the Y-axis up and down, it is essentially following a path from 0-255 in regards to colors. I found that by doing it this way for red, it prevented the color switch from happening to quickly and more smoothly
    skyShade.fill.r = map(myHead.y, 0, height, 0, 255);
    skyShade.fill.g = myHead.y;
    skyShade.fill.b = myHead.y;

    //Adding constrains so the background never becomes white 
    skyShade.fill.r = constrain(skyShade.fill.r, 0, 165);
    skyShade.fill.g = constrain(skyShade.fill.g, 0, 230);
    skyShade.fill.b = constrain(skyShade.fill.b, 0, 240);


    //On to the red t-shirt/shoulders which will be placed at
    //the bottom portion of the canvas
    push();
    noStroke();
    fill(204, 4, 4);
    rect(45, 630, 590, 100);

    //Creating the shoulders
    noStroke();
    fill(184, 18, 18);
    quad(75, 600, 605, 600, 635, 630, 45, 630);
    pop();

    //Going to add a collar to the shirt so it doesn't
    //look too bizarre, including some skin
    push();
    noStroke();
    fill(255, 227, 189);
    ellipse(340, 610, 225, 50);


    //Time to add the neck
    //because that's how life works
    noStroke();
    fill(255, 227, 189);
    rect(241, 537, 200, 75);

    //Interior portion of the neck
    //push();
    noStroke();
    fill(242, 215, 177);
    ellipse(341, 540, 202, 50);

    noStroke();
    fill(255, 0, 0)
    ellipse(341, 540, 150, 25)
    pop();

    //Cartoon-esque bone in neck
    push();
    noStroke();
    fill(255, 255, 255);
    rect(320, 478, 40, 60);

    push();
    noStroke();
    fill(255, 255, 255);
    circle(325, 478, 40);

    push();
    noStroke();
    fill(255, 255, 255);
    circle(355, 478, 40);

    push();
    noStroke();
    fill(255, 255, 255)
    ellipse(340, 538, 40, 15)
    pop();



    //Now for the head portion, which will include the facial features and hair
    //I am aiming for these to all be attached so they can move together
    //This portion will include movement for the objects declared at the beginning

    push();



    //Head
    noStroke();
    fill(myHead.fill.r, myHead.fill.g, myHead.fill.b);
    rect(myHead.x, myHead.y, myHead.width, myHead.height);

    //Adding a constant "collision line" for the head, so that it doesn't go below the neck and torso
    const headMaxY = 575;

    //Attaching the movement to the mouse, and adding the constrain so that the head does not surpass a certain point on the Y-Axis
    //Adding headBarrier constant as largest allowed Y for my myHead.y
    if (mouseIsPressed) {
        const headBarrier = headMaxY - myHead.height;
        myHead.y = constrain(mouseY, 0, headBarrier);
    };





    //Hair and top of hair with offsets
    noStroke();
    fill(myHair.fill.r, myHair.fill.g, myHair.fill.b);
    rect(myHair.x, myHead.y + myHairOffsetY, myHair.width, myHair.height,);

    noStroke();
    fill(hairTop.fill.r, hairTop.fill.g, hairTop.fill.b);
    quad(hairTop.x1, myHead.y + hairTop1OffsetY, hairTop.x2, myHead.y + hairTop2OffsetY, hairTop.x3, myHead.y + hairTop3OffsetY, hairTop.x4, myHead.y + hairTop4OfssetY);





    //Eye 1 with offsets
    noStroke();
    fill(eyeWhite1.fill.r, eyeWhite1.fill.g, eyeWhite1.fill.b);
    rect(eyeWhite1.x, myHead.y + eyeWhite1OffsetY, eyeWhite1.width, eyeWhite1.height);

    ////Pupil 1 with offsets, and making it move from side to side
    noStroke();
    fill(eyePupil1.fill.r, eyePupil1.fill.g, eyePupil1.fill.b);
    rect(eyePupil1.x, myHead.y + eyePupil1OffsetY, eyePupil1.width, eyePupil1.height);

    eyePupil1.x += eyePupil1.speedX;
    eyePupil1.x = constrain(eyePupil1.x, 250, 270);
    if (eyePupil1.x <= 250 || eyePupil1.x >= 270) {
        eyePupil1.speedX *= -1;
    };

    //////Eyebrow 1 with offsets, including condition to raise eyebrow if myHead.y < 300
    noStroke();
    fill(eyeBrow1.fill.r, eyeBrow1.fill.g, eyeBrow1.fill.b);
    rect(eyeBrow1.x, myHead.y + eyeBrow1OffsetY + (myHead.y < 300 ? -12 : 0), eyeBrow1.width, eyeBrow1.height);





    //Eye 2 with offsets
    noStroke();
    fill(eyeWhite2.fill.r, eyeWhite2.fill.g, eyeWhite2.fill.b);
    rect(eyeWhite2.x, myHead.y + eyeWhite2OffsetY, eyeWhite2.width, eyeWhite2.height);

    ////Pupil 2 with offsets, and making it move from side to side
    noStroke();
    fill(eyePupil2.fill.r, eyePupil2.fill.g, eyePupil2.fill.b);
    rect(eyePupil2.x, myHead.y + eyePupil2OffsetY, eyePupil2.width, eyePupil2.height);

    eyePupil2.x += eyePupil2.speedX;
    eyePupil2.x = constrain(eyePupil2.x, 390, 410);
    if (eyePupil2.x <= 390 || eyePupil2.x >= 410) {
        eyePupil2.speedX *= -1;
    };

    //////Eyebrow 2 with offsets, including condition to raise eyebrow if myHead.y < 300
    noStroke();
    fill(eyeBrow2.fill.r, eyeBrow2.fill.g, eyeBrow2.fill.b);
    rect(eyeBrow2.x, myHead.y + eyeBrow2OffsetY + (myHead.y < 300 ? -12 : 0), eyeBrow2.width, eyeBrow2.height);





    //Mouth and Nose
    noStroke();
    fill(myMouth.fill.r, myMouth.fill.g, myMouth.fill.b);
    rect(myMouth.x, myHead.y + myMouthOffsetY, myMouth.width, myMouth.height);

    noStroke();
    fill(myNose.fill.r, myNose.fill.g, myNose.fill.b);
    rect(myNose.x, myHead.y + myNoseOffsetY, myNose.width, myNose.height);



    pop();

}