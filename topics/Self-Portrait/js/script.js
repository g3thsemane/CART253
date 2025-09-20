/**
 * When I Look In The Mirror
 * Benjamin Merhi
 * 
 * This is a digital self-portrait made using the p5js
 * library
 */

"use strict";

let myHead = {
    x: 340,
    y: 340,
    width: 325,
    height: 325,
    fill: {
        r: 255,
        g: 227,
        b: 189,
    }
}

//let myPupils = {

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
    push();
    noStroke();
    fill(myHead.fill.r, myHead.fill.g, myHead.fill.b)
    circle(myHead.x, myHead.y, myHead.width, myHead.height)


    myHead.y = mouseY;

    //Eyes

}