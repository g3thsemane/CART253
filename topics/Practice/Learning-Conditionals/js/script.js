/**
 * Learning Conditionals
 * Benjamin
 * 
 * Learning how to use Conditionals in p5.js
 * 
 */

"use strict";

let bigBall = {
    x: 300,
    y: 300,
    size: 100,
    fill: {
        r: 255,
        g: 0,
        b: 0

    },
    speedX: 2 //random(-2, 2),
    //speedY: random(-2, 2)
}

let skyColor = {
    r: 200,
    g: 89,
    b: 20
};

/**
 * OH LOOK I DIDN'T DESCRIBE SETUP!!
*/
function setup() {
    createCanvas(600, 600)

}


/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
*/
function draw() {
    background(20, 89, 203);

    push();
    noStroke();
    fill(bigBall.fill.r, bigBall.fill.g, bigBall.fill.b);
    ellipse(bigBall.x, bigBall.y, bigBall.size);
    pop();

    bigBall.x = bigBall.x + bigBall.speedX
    if (bigBall.x > width || bigBall.x < 0) {
        bigBall.speedX = bigBall.speedX * -1
    }

    if (bigBall.x > 300) {
        bigBall.fill.r = random(0, 255)
    }

    if (bigBall.x < 300) {
        bigBall.fill.b = random(0, 255)
    }

    if (bigBall.x === 350) {
        bigBall.size += 50
    }
    else {
        bigBall.size = bigBall.size - 50
    }






} 