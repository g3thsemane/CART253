/**
 * Git Workflow Example
 * Pippin Barr
 * 
 * Some sample code for playing with version control.
 * Draws a pyramid in the centre of the canvas and a
 * red circle at the user's mouse position.
 */

"use strict";

/**
 * Create a canvas, hides the cursor
*/
function setup() {
    // A 640x480 canvas
    createCanvas(650, 200);

    // Don't show the cursor
    noCursor();
}

/**
 * Draws a top-down view of a pyramid and also a green circle
 * at the position of the user's cursor
*/
function draw() {
    // Make the background red (specified as RGB)
    background(0, 310, 255);

    // Draw a pyramid
    // How many levels for the pyramid
    const levels = 25;
    // Loop through every level (backwards)
    for (let level = levels; level > 0; level--) {
        // Draw this layer
        push();
        // Set the grey shade of the level based on its number
        // e.g. level 1 will get a shade of 10 (dark gray), 
        // level 10 will be 255(white)
        const shade = map(level, 1, levels, 15, 205);
        // No line around the levels
        noStroke();
        // Set the fill colour to our shade (RGB)
        fill(shade, shade, 0);
        // Draw rectangles from the centre
        rectMode(CENTER);
        // Draw the rectangle in the centre of the canvas
        // (320, 320) with a size based on the level
        // e.g. level 1 will be a 48x48 rectangle and
        // level 10 will be a 480x480 rectangle
        rect(320, 350, level * 20, level * 150);
        pop();
    }

    // Draw a red circle at the position of the mouse
    push();
    // No line around the shape
    noStroke();
    // Make it blue (RGB)
    fill(0, 0, 210);
    // Draw a 100x100 circle at the mouse position
    ellipse(mouseX, mouseY, 20, 80);
    pop();
}