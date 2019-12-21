// DS - MODULE EXAM



// Canvas Setup
let cnv = document.getElementById("myCanvas");
let ctx = cnv.getContext("2d");
cnv.width = 1200;
cnv.height = 700;

// Global Vars
let spaceImg = document.getElementById("spacebg")
let beamX = [];
let beamY = [];
let beamSpeed = [];
let beamColor = [];
let beamHeight = [];
let beamWidth = [];

//Number of Beams
let beamNum = 100;
//Bonus function Variable
let speedVar = 1

// Event Listeners
document.addEventListener("mousemove", mouseEventHandler);
document.addEventListener("keydown", keypressHandler);

//Bonus event listener
document.addEventListener("mousedown", mouseClickedFunction);


// Canvas Drawing
for (i = 0; i <= beamNum; i++) {
    //Getting values of lasers
    let xVal = 0.0001
    let rVal = Math.randomDec(0, cnv.height)
    let speedVal = Math.randomDec(10, 30)
    let widthVal = Math.randomDec(50, 200)
    let heightVal = 5
    let colVal = getRandomColor()

    //Pushing values in
    beamX.push(xVal);
    beamY.push(rVal);
    beamSpeed.push(speedVal);
    beamWidth.push(widthVal);
    beamHeight.push(heightVal);
    beamColor.push(colVal);
}


requestAnimationFrame(draw);

function draw() {

    //Draw
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    ctx.drawImage(spaceImg, 0, 0, cnv.width, cnv.height)


    //Creating beams
    for (n = 0; n < beamNum; n++) {
        //Change the xValue
        beamX[n] += beamSpeed[n];

        //Draw rect
        drawRect(beamX[n], beamY[n], beamWidth[n], beamHeight[n], beamColor[n])

        //Reset values if off the board
        if (beamX[n] > cnv.width + beamWidth[n]) {
            beamWidth[n] = Math.randomDec(50, 200)
            beamX[n] = 0.0001 - beamWidth[n];
            beamSpeed[n] = Math.randomDec(10, 30)
            beamY[n] = Math.randomDec(0, cnv.height) 
        }

        //Bonus function
        if (beamX[n] < 0 - beamWidth[n]) {
            myBonusFunction()
        }
    }

    //Request another animation frame
    requestAnimationFrame(draw);
}


//Function for creating rectangles
function drawRect(x1, y1, width, height, color) {
    ctx.beginPath();
    ctx.rect(x1, y1, width, height)
    ctx.fillStyle = color
    ctx.fill();
}







// getRandomColor
function getRandomColor() {
    // create an array of the numbers 0-9 and letters A-F (hint: you can start with the string '0123456789ABCDEF' and split it to save time)
    let colorChoice = "0123456789ABCDEF"
    colorChoice = colorChoice.split("")
    
    // create a variable to store the color. Initialize it with the value '#'
    let color = "#"

    // loop 6 times, each time adding a random value from the array created above.
    for (n = 0; n < 6; n++) {
        let randomVal = Math.randomInt(0, 16)
        color = color + colorChoice[randomVal]
    }

    // return the color variable
    return color;
}


// mouseEventHandler Handler
function mouseEventHandler(event) {

    //Change all the Y values into mouseY position
    for (n = 0; n < beamNum; n++) {
        beamY[n] = event.clientY
    }



}

// keypressHandler
function keypressHandler(event) {

    //If Q pressed increase speed
    if (event.code == "KeyQ") {
        for (n = 0; n < beamNum; n++) {
            beamSpeed[n] += speedVar
        }
    }

    //If Z pressed decrease speed
    if (event.code == "KeyZ") {
        for (n = 0; n < beamNum; n++) {
            beamSpeed[n] -= speedVar
        }
    }

}

// myBonusFunction
function myBonusFunction() {
    //If the beams go reverse make it repeat and go the other way
    for (e = 0; e < beamNum; e++) {
        beamWidth[n] = Math.randomDec(50, 200)
        beamX[n] = cnv.width + beamWidth[n]
        beamSpeed[n] = Math.randomDec(-10, -30)
        beamY[n] = Math.randomDec(0, cnv.height) 
    }
}

//Other bonus function
function mouseClickedFunction() {
    /*If mouse is clicked make all beams start going reverse(flip the left and right,
     anything increasing it to the will decrease vice versa). 

     If mouse is clicked it will also change the colors of all the beams*/

     
    for (n = 0; n < beamNum; n++) {
        beamSpeed[n] *= -1
    }
    //Change the variable so that it increases the speed in the right direction
    speedVar *= -1

    //Change the color on press down
    for (e = 0; e < beamNum; e++) {
        beamColor[e] = getRandomColor()
    }
    
}