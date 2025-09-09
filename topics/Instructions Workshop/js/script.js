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

    //Change cursor to hand
    cursor(HAND);
}