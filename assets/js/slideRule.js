sizeX = 800;
sizeY = 800 / 2.5;
fontsize = sizeX / 80;
defaultColor = 200
indexPos = 200;
slidePos = 0;
movingSlide = false;
movingIndex = false;
initialSlidePos = 0;
rectRadius = 10;
selectedRule1 = 0
selectedRule2 = 6

function preload() {
    font = loadFont('assets/uniSansThin.otf');
}

function setup() {

    var canvasDiv = document.getElementById('slide-rule');
    var canvasWidth = canvasDiv.offsetWidth;

    newSizeX = canvasWidth > sizeX ? sizeX : canvasWidth;
    newSizeY = newSizeX * sizeY / sizeX;

    canvas = createCanvas(newSizeX, newSizeY);
    canvas.parent('slide-rule')

    strokeWeight(1);
    stroke(defaultColor);

    textFont(font);
    textSize(fontsize);
    textAlign(CENTER, CENTER);
}

function draw() {
    updateIndexPos(0, height / 5, width, height * 3 / 5);
    updateSlidePos(0, height / 5, width, height * 3 / 5);

    pixelDensity(10);
    fill(defaultColor);
    smooth()

    offset = width / 30
    length = width - 2 * offset
    tickHeight = height / 30 * 3 / 5

    strokeWeight(1);
    drawRule(0, height / 5, width, height * 3 / 5);
    drawReversedSlide(0, height / 5, width, height * 3 / 5);
    drawIndex(0, height / 5, width, height * 3 / 5);
}

function drawSlide(x, y, width, height) {

    noFill()
    rect(x + slidePos, y + height / 4, width, height / 2, rectRadius);
    fill(defaultColor);

    //C
    text("C", x + slidePos + offset - 1.5 * fontsize, y + 3 / 4 * height - fontsize - tickHeight)
    for (i = 1; i < 11; i++) {
        line(x + slidePos + offset + length * log(i) / log(10), y + 3 / 4 * height, x + slidePos + offset + length * log(i) / log(10), y + 3 / 4 * height - tickHeight)
        text((i - 1) % 9 + 1, x + slidePos + offset + length * log(i) / log(10), y + 3 / 4 * height - tickHeight - fontsize);
    }

    for (i = 1; i < 10; i += 0.1) {
        line(x + slidePos + offset + length * log(i) / log(10), y + 3 / 4 * height, x + slidePos + offset + length * log(i) / log(10), y + 3 / 4 * height - 2 * tickHeight / 3)
    }

    for (i = 1; i < 2; i += 0.02) {
        line(x + slidePos + offset + length * log(i) / log(10), y + 3 / 4 * height, x + slidePos + offset + length * log(i) / log(10), y + 3 / 4 * height - tickHeight / 3)
    }

    for (i = 2; i < 5; i += 0.05) {
        line(x + slidePos + offset + length * log(i) / log(10), y + 3 / 4 * height, x + slidePos + offset + length * log(i) / log(10), y + 3 / 4 * height - tickHeight / 3)
    }

    //CI
    text("C I", x + slidePos + offset - 1.5 * fontsize, y + 4 / 7 * height - fontsize - tickHeight)
    for (i = 1; i < 11; i++) {
        line(x + slidePos + width - offset - length * log(i) / log(10), y + height * 4 / 7, x + slidePos + width - offset - length * log(i) / log(10), y + height * 4 / 7 - tickHeight)
        text((i - 1) % 9 + 1, x + slidePos + width - offset - length * log(i) / log(10), y + height * 4 / 7 - tickHeight - fontsize);
    }

    for (i = 1; i < 10; i += 0.1) {
        line(x + slidePos + width - offset - length * log(i) / log(10), y + height * 4 / 7, x + slidePos + width - offset - length * log(i) / log(10), y + height * 4 / 7 - 2 * tickHeight / 3)
    }

    for (i = 1; i < 2; i += 0.02) {
        line(x + slidePos + width - offset - length * log(i) / log(10), y + 4 / 7 * height, x + slidePos + width - offset - length * log(i) / log(10), y + 4 / 7 * height - tickHeight / 3)
    }

    for (i = 2; i < 5; i += 0.05) {
        line(x + slidePos + width - offset - length * log(i) / log(10), y + 4 / 7 * height, x + slidePos + width - offset - length * log(i) / log(10), y + 4 / 7 * height - tickHeight / 3)
    }

    //B
    text("B", x + slidePos + offset - 1.5 * fontsize, y + height / 4 + fontsize + tickHeight)
    for (i = 1; i < 11; i++) {
        line(x + slidePos + offset + length * log(i) / log(10) / 2, y + height / 4, x + slidePos + offset + length * log(i) / log(10) / 2, y + height / 4 + tickHeight)
        text((i - 1) % 9 + 1, x + slidePos + offset + length * log(i) / log(10) / 2, y + height / 4 + tickHeight + fontsize);

        line(x + slidePos + offset + length / 2 + length * log(i) / log(10) / 2, y + height / 4, x + slidePos + offset + length / 2 + length * log(i) / log(10) / 2, y + height / 4 + tickHeight)
        text((i - 1) % 9 + 1, x + slidePos + offset + length / 2 + length * log(i) / log(10) / 2, y + height / 4 + tickHeight + fontsize);
    }

    for (i = 1; i < 6; i += 0.1) {
        line(x + slidePos + offset + length * log(i) / log(10) / 2, y + height / 4, x + slidePos + offset + length * log(i) / log(10) / 2, y + height / 4 + 2 * tickHeight / 3)

        line(x + slidePos + offset + length / 2 + length * log(i) / log(10) / 2, y + height / 4, x + slidePos + offset + length / 2 + length * log(i) / log(10) / 2, y + height / 4 + 2 * tickHeight / 3)
    }

    for (i = 1; i < 3; i += 0.05) {
        line(x + slidePos + offset + length * log(i) / log(10) / 2, y + height / 4, x + slidePos + offset + length * log(i) / log(10) / 2, y + height / 4 + tickHeight / 3)

        line(x + slidePos + offset + length / 2 + length * log(i) / log(10) / 2, y + height / 4, x + slidePos + offset + length / 2 + length * log(i) / log(10) / 2, y + height / 4 + tickHeight / 3)
    }
    for (i = 6; i < 10; i += 0.2) {
        line(x + slidePos + offset + length * log(i) / log(10) / 2, y + height / 4, x + slidePos + offset + length * log(i) / log(10) / 2, y + height / 4 + 2 * tickHeight / 3)

        line(x + slidePos + offset + length / 2 + length * log(i) / log(10) / 2, y + height / 4, x + slidePos + offset + length / 2 + length * log(i) / log(10) / 2, y + height / 4 + 2 * tickHeight / 3)
    }
}

function drawReversedSlide(x, y, width, height) {

    noFill()
    rect(x + slidePos, y + height / 4, width, height / 2, rectRadius);
    fill(defaultColor);
    1
    //S
    text("S", x + slidePos + offset - 1.5 * fontsize, y + 1 / 4 * height + fontsize + tickHeight)
    for (i = 10; i <= 90; i += 10) {
        line(x + slidePos + offset + length * log(sin(i / 180 * Math.PI) * 10) / log(10), y + 1 / 4 * height, x + slidePos + offset + length * log(sin(i / 180 * Math.PI) * 10) / log(10), y + 1 / 4 * height + tickHeight)
        text(i, x + slidePos + offset + length * log(sin(i / 180 * Math.PI) * 10) / log(10), y + 1 / 4 * height + tickHeight + fontsize);
    }

    //S & T
    text("S T", x + slidePos + offset - 1.5 * fontsize, y + 4 / 7 * height - fontsize - tickHeight)
    for (i = 1; i <= 5; i++) {
        line(x + slidePos + offset + length * log(sin(i / 180 * Math.PI) * 100) / log(10), y + 4 / 7 * height, x + slidePos + offset + length * log(sin(i / 180 * Math.PI) * 100) / log(10), y + 4 / 7 * height - tickHeight)
        text(i, x + slidePos + offset + length * log(sin(i / 180 * Math.PI) * 100) / log(10), y + 4 / 7 * height - tickHeight - fontsize);
    }

    //T
    text("T", x + slidePos + offset - 1.5 * fontsize, y + 3 / 4 * height - fontsize - tickHeight)
    for (i = 10; i <= 45; i += 5) {
        line(x + slidePos + offset + length * log(tan(i / 180 * Math.PI) * 10) / log(10), y + 3 / 4 * height, x + slidePos + offset + length * log(tan(i / 180 * Math.PI) * 10) / log(10), y + 3 / 4 * height - tickHeight)
        text(i, x + slidePos + offset + length * log(tan(i / 180 * Math.PI) * 10) / log(10), y + 3 / 4 * height - tickHeight - fontsize);
    }
}

function drawRule(x, y, width, height) {
    noFill();
    rect(x, y, width, height / 4, rectRadius);
    rect(x, y + height * 3 / 4, width, height / 4, rectRadius);
    fill(defaultColor);


    //L
    text("L", x + offset - 1.5 * fontsize, y + height - tickHeight - fontsize)
    for (i = 0; i < 11; i++) {
        line(x + offset + length / 10 * i, y + height, x + offset + length / 10 * i, y + height - tickHeight)
        text(i % 10, x + offset + length / 10 * i, y + height - tickHeight - fontsize);
    }

    for (i = 0; i < 10; i += 0.1) {
        line(x + offset + length / 10 * i, y + height, x + offset + length / 10 * i, y + height - tickHeight / 2)
    }

    //D
    text("D", x + offset - 1.5 * fontsize, y + 3 / 4 * height + fontsize + tickHeight)
    for (i = 1; i < 11; i++) {
        line(x + offset + length * log(i) / log(10), y + 3 / 4 * height, x + offset + length * log(i) / log(10), y + 3 / 4 * height + tickHeight)
        text((i - 1) % 9 + 1, x + offset + length * log(i) / log(10), y + 3 / 4 * height + tickHeight + fontsize);
    }

    for (i = 1; i < 10; i += 0.1) {
        line(x + offset + length * log(i) / log(10), y + 3 / 4 * height, x + offset + length * log(i) / log(10), y + 3 / 4 * height + 2 * tickHeight / 3)
    }

    for (i = 1; i < 2; i += 0.02) {
        line(x + offset + length * log(i) / log(10), y + 3 / 4 * height, x + offset + length * log(i) / log(10), y + 3 / 4 * height + tickHeight / 3)
    }

    for (i = 2; i < 5; i += 0.05) {
        line(x + offset + length * log(i) / log(10), y + 3 / 4 * height, x + offset + length * log(i) / log(10), y + 3 / 4 * height + tickHeight / 3)
    }

    //A
    text("A", x + offset - 1.5 * fontsize, y + height / 4 - fontsize - tickHeight)
    for (i = 1; i < 11; i++) {
        line(x + offset + length * log(i) / log(10) / 2, y + height / 4, x + offset + length * log(i) / log(10) / 2, y + height / 4 - tickHeight)
        text((i - 1) % 9 + 1, x + offset + length * log(i) / log(10) / 2, y + height / 4 - tickHeight - fontsize);

        line(x + offset + length / 2 + length * log(i) / log(10) / 2, y + height / 4, x + offset + length / 2 + length * log(i) / log(10) / 2, y + height / 4 - tickHeight)
        text((i - 1) % 9 + 1, x + offset + length / 2 + length * log(i) / log(10) / 2, y + height / 4 - tickHeight - fontsize);

    }

    for (i = 1; i < 6; i += 0.1) {
        line(x + offset + length * log(i) / log(10) / 2, y + height / 4, x + offset + length * log(i) / log(10) / 2, y + height / 4 - 2 * tickHeight / 3)

        line(x + offset + length / 2 + length * log(i) / log(10) / 2, y + height / 4, x + offset + length / 2 + length * log(i) / log(10) / 2, y + height / 4 - 2 * tickHeight / 3)
    }

    for (i = 1; i < 3; i += 0.05) {
        line(x + offset + length * log(i) / log(10) / 2, y + height / 4, x + offset + length * log(i) / log(10) / 2, y + height / 4 - tickHeight / 3)

        line(x + offset + length / 2 + length * log(i) / log(10) / 2, y + height / 4, x + offset + length / 2 + length * log(i) / log(10) / 2, y + height / 4 - tickHeight / 3)
    }
    for (i = 6; i < 10; i += 0.2) {
        line(x + offset + length * log(i) / log(10) / 2, y + height / 4, x + offset + length * log(i) / log(10) / 2, y + height / 4 - 2 * tickHeight / 3)

        line(x + offset + length / 2 + length * log(i) / log(10) / 2, y + height / 4, x + offset + length / 2 + length * log(i) / log(10) / 2, y + height / 4 - 2 * tickHeight / 3)
    }

    //K
    text("K", x + offset - 1.5 * fontsize, y + fontsize + tickHeight)
    for (i = 1; i < 11; i++) {
        line(x + offset + length * log(i) / log(10) / 3, y, x + offset + length * log(i) / log(10) / 3, y + tickHeight)
        text((i - 1) % 9 + 1, x + offset + length * log(i) / log(10) / 3, y + tickHeight + fontsize);

        line(x + offset + length / 3 + length * log(i) / log(10) / 3, y, x + offset + length / 3 + length * log(i) / log(10) / 3, y + tickHeight)
        text((i - 1) % 9 + 1, x + offset + length / 3 + length * log(i) / log(10) / 3, y + tickHeight + fontsize);

        line(x + offset + 2 * length / 3 + length * log(i) / log(10) / 3, y, x + offset + 2 * length / 3 + length * log(i) / log(10) / 3, y + tickHeight)
        text((i - 1) % 9 + 1, x + offset + 2 * length / 3 + length * log(i) / log(10) / 3, y + tickHeight + fontsize);
    }

    for (i = 1; i < 4; i += 0.1) {
        line(x + offset + length * log(i) / log(10) / 3, y, x + offset + length * log(i) / log(10) / 3, y + tickHeight / 3)
        line(x + offset + length / 3 + length * log(i) / log(10) / 3, y, x + offset + length / 3 + length * log(i) / log(10) / 3, y + tickHeight / 3)
        line(x + offset + 2 * length / 3 + length * log(i) / log(10) / 3, y, x + offset + 2 * length / 3 + length * log(i) / log(10) / 3, y + tickHeight / 3)
    }

    for (i = 4; i < 10; i += 0.2) {
        line(x + offset + length * log(i) / log(10) / 3, y, x + offset + length * log(i) / log(10) / 3, y + tickHeight / 3)
        line(x + offset + length / 3 + length * log(i) / log(10) / 3, y, x + offset + length / 3 + length * log(i) / log(10) / 3, y + tickHeight / 3)
        line(x + offset + 2 * length / 3 + length * log(i) / log(10) / 3, y, x + offset + 2 * length / 3 + length * log(i) / log(10) / 3, y + tickHeight / 3)
    }

    for (i = 1; i < 2; i += 0.05) {
        line(x + offset + length * log(i) / log(10) / 3, y, x + offset + length * log(i) / log(10) / 3, y + tickHeight / 3)
        line(x + offset + length / 3 + length * log(i) / log(10) / 3, y, x + offset + length / 3 + length * log(i) / log(10) / 3, y + tickHeight / 3)
        line(x + offset + 2 * length / 3 + length * log(i) / log(10) / 3, y, x + offset + 2 * length / 3 + length * log(i) / log(10) / 3, y + tickHeight / 3)
    }
}

function drawIndex(x, y, width, height) {
    //Index
    line(indexPos, y, indexPos, y + height)
    if (selectedRule1 == 0)
        text(Math.pow(10, (indexPos - x - offset) / length * 3).toFixed(2), x + indexPos, y - tickHeight - fontsize)
    else if (selectedRule1 == 1)
        text(Math.pow(10, (indexPos - x - offset) / length * 2).toFixed(2), x + indexPos, y - tickHeight - fontsize)
    else if (selectedRule1 == 2)
        text(Math.pow(10, (indexPos - x - offset - slidePos) / length * 2).toFixed(2), x + indexPos, y - tickHeight - fontsize)
    else if (selectedRule1 == 3)
        text(Math.pow(10, (x + slidePos + width - offset - indexPos) / length).toFixed(2), x + indexPos, y - tickHeight - fontsize)
    else if (selectedRule1 == 4)
        text(Math.pow(10, (indexPos - x - offset - slidePos) / length).toFixed(2), x + indexPos, y - tickHeight - fontsize)
    else if (selectedRule1 == 5)
        text(Math.pow(10, (indexPos - x - offset) / length).toFixed(2), x + indexPos, y - tickHeight - fontsize)

    if (selectedRule2 == 1)
        text(Math.pow(10, (indexPos - x - offset) / length * 2).toFixed(2), x + indexPos, y + height + tickHeight + fontsize)
    else if (selectedRule2 == 2)
        text(Math.pow(10, (indexPos - x - offset - slidePos) / length * 2).toFixed(2), x + indexPos, y + height + tickHeight + fontsize)
    else if (selectedRule2 == 3)
        text(Math.pow(10, (x + slidePos + width - offset - indexPos) / length).toFixed(2), x + indexPos, y + height + tickHeight + fontsize)
    else if (selectedRule2 == 4)
        text(Math.pow(10, (indexPos - x - offset - slidePos) / length).toFixed(2), x + indexPos, y + height + tickHeight + fontsize)
    else if (selectedRule2 == 5)
        text(Math.pow(10, (indexPos - x - offset) / length).toFixed(2), x + indexPos, y + height + tickHeight + fontsize)
    else if (selectedRule2 == 6)
        text(((indexPos - x - offset) / length).toFixed(2), x + indexPos, y + height + tickHeight + fontsize)
}

function windowResized() {
    var canvasDiv = document.getElementById('slide-rule');
    var canvasWidth = canvasDiv.offsetWidth;

    newSizeX = canvasWidth > sizeX ? sizeX : canvasWidth;
    newSizeY = newSizeX * sizeY / sizeX;
    fontsize = newSizeX / 100;
    resizeCanvas(newSizeX, newSizeY);
    redraw();
}

function updateSlidePos() {
    if (movingSlide == true) {
        slidePos = slidePos + mouseX - initialSlidePos;
        initialSlidePos = mouseX;
    }
}

function updateIndexPos() {
    if (movingIndex == true) {
        indexPos = mouseX;
    }
}

function mousePressed() {
    if (mouseY < (height / 5 + height * 9 / 20) && mouseY > (height / 5 + height * 3 / 20)) {
        movingSlide = true
        initialSlidePos = mouseX
    }
    else {
        movingIndex = true
    }
}

function mouseReleased() {
    movingSlide = movingIndex = false;
}