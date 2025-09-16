/**
 * Intro To Variables
 * Benjamin
 * 
 * Practicing using variables in p5.js
 * 
 */

"use strict";

/**
 * Creating Canvas
*/
function setup() {
    createCanvas(640, 640)

}


/**
 * Creating a circle with variables
*/
function draw() {
    background(0);

    //Drawing a circle that changes colour depending on mouse position
    push();
    noStroke();
    fill(mouseX, 0, mouseY);
    ellipse(width / 2, height / 2, mouseX, mouseY);
    pop();

}