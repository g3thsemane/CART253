/**
 * Instructions Workshop
 * Benjamin Merhi
 * 
 * Instructions Workshop in which a beautiful, Monet-esque 
 * landscape is brought to life, by yours truly
 */

"use strict";

/**
 * Creation of canvas, to display landscape
*/
function setup() {
    //Creation of canvas
    createCanvas(600, 600)
}


/**
 * Creation of light blue background, over the canvas
*/
function draw() {
    //Light blue background
    background("#ADD8E6")



    //Grass as rectangle
    push();
    noStroke();
    fill("#3F9B0B")
    rect(0, 500, 600, 150)
    pop();

    //creature: bird
    push();
    noStroke();
    fill("#FF0000")
    circle(500, 100, 20, 20)

    //Creation of sun
    push();
    noStroke();
    fill("#FFFF00")
    circle(25, 25, 150, 150)

    //Creature: Cow
    push();
    fill("#663300")
    rect(40, 485, 125, 85);
    pop();

    // head of cow 

    push();
    fill("#663300")
    circle(40, 485, 50, 50);
    pop();

    //eye of cow
    push();
    fill(250)
    circle(40, 485, 20, 20);
    pop();

    //Tent
    push();
    noStroke();
    fill(195, 99, 43)
    triangle(425, 300, 325, 530, 525, 530)
    pop();


    //Change cursor to hand
    cursor(HAND);
}