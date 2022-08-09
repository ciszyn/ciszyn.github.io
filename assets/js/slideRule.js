sizeX = 800;
sizeY = 800 / 5;
fontsize = sizeX / 100;
defaultColor = 200
indexPos = 200;
slidePos = 0;
movingSlide = false;
movingIndex = false;
initialSlidePos = 0;

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
    pixelDensity(10);
    fill(defaultColor);

    offset = width / 30
    length = width - 2 * offset
    tickHeight = height / 30

    strokeWeight(1);

    updateIndexPos();
    updateSlidePos();
    drawRule();
    drawSlide();

    // Index

}

function drawSlide() {
    //C

    text("C", slidePos + offset - 2 * fontsize, 3 / 4 * height - fontsize - tickHeight)
    for (i = 1; i < 11; i++) {
        line(slidePos + offset + length * log(i) / log(10), 3 / 4 * height, slidePos + offset + length * log(i) / log(10), 3 / 4 * height - tickHeight)
        text((i - 1) % 9 + 1, slidePos + offset + length * log(i) / log(10), 3 / 4 * height - tickHeight - fontsize);
    }

    for (i = 1; i < 10; i += 0.1) {
        line(slidePos + offset + length * log(i) / log(10), 3 / 4 * height, slidePos + offset + length * log(i) / log(10), 3 / 4 * height - 2 * tickHeight / 3)
    }

    for (i = 1; i < 2; i += 0.02) {
        line(slidePos + offset + length * log(i) / log(10), 3 / 4 * height, slidePos + offset + length * log(i) / log(10), 3 / 4 * height - tickHeight / 3)
    }

    for (i = 2; i < 5; i += 0.05) {
        line(slidePos + offset + length * log(i) / log(10), 3 / 4 * height, slidePos + offset + length * log(i) / log(10), 3 / 4 * height - tickHeight / 3)
    }

    //CI

    text("C I", slidePos + offset - 2 * fontsize, 4 / 7 * height - fontsize - tickHeight)
    for (i = 1; i < 11; i++) {
        line(slidePos + width - offset - length * log(i) / log(10), height * 4 / 7, slidePos + width - offset - length * log(i) / log(10), height * 4 / 7 - tickHeight)
        text((i - 1) % 9 + 1, slidePos + width - offset - length * log(i) / log(10), height * 4 / 7 - tickHeight - fontsize);
    }

    for (i = 1; i < 10; i += 0.1) {
        line(slidePos + width - offset - length * log(i) / log(10), height * 4 / 7, slidePos + width - offset - length * log(i) / log(10), height * 4 / 7 - 2 * tickHeight / 3)
    }

    for (i = 1; i < 2; i += 0.02) {
        line(slidePos + width - offset - length * log(i) / log(10), 4 / 7 * height, slidePos + width - offset - length * log(i) / log(10), 4 / 7 * height - tickHeight / 3)
    }

    for (i = 2; i < 5; i += 0.05) {
        line(slidePos + width - offset - length * log(i) / log(10), 4 / 7 * height, slidePos + width - offset - length * log(i) / log(10), 4 / 7 * height - tickHeight / 3)
    }

    //B

    text("B", slidePos + offset - 2 * fontsize, height / 4 + fontsize + tickHeight)
    for (i = 1; i < 11; i++) {
        line(slidePos + offset + length * log(i) / log(10) / 2, height / 4, slidePos + offset + length * log(i) / log(10) / 2, height / 4 + tickHeight)
        text((i - 1) % 9 + 1, slidePos + offset + length * log(i) / log(10) / 2, height / 4 + tickHeight + fontsize);

        line(slidePos + offset + length / 2 + length * log(i) / log(10) / 2, height / 4, slidePos + offset + length / 2 + length * log(i) / log(10) / 2, height / 4 + tickHeight)
        text((i - 1) % 9 + 1, slidePos + offset + length / 2 + length * log(i) / log(10) / 2, height / 4 + tickHeight + fontsize);
    }

    for (i = 1; i < 6; i += 0.1) {
        line(slidePos + offset + length * log(i) / log(10) / 2, height / 4, slidePos + offset + length * log(i) / log(10) / 2, height / 4 + 2 * tickHeight / 3)

        line(slidePos + offset + length / 2 + length * log(i) / log(10) / 2, height / 4, slidePos + offset + length / 2 + length * log(i) / log(10) / 2, height / 4 + 2 * tickHeight / 3)
    }

    for (i = 1; i < 3; i += 0.05) {
        line(slidePos + offset + length * log(i) / log(10) / 2, height / 4, slidePos + offset + length * log(i) / log(10) / 2, height / 4 + tickHeight / 3)

        line(slidePos + offset + length / 2 + length * log(i) / log(10) / 2, height / 4, slidePos + offset + length / 2 + length * log(i) / log(10) / 2, height / 4 + tickHeight / 3)
    }
    for (i = 6; i < 10; i += 0.2) {
        line(slidePos + offset + length * log(i) / log(10) / 2, height / 4, slidePos + offset + length * log(i) / log(10) / 2, height / 4 + 2 * tickHeight / 3)

        line(slidePos + offset + length / 2 + length * log(i) / log(10) / 2, height / 4, slidePos + offset + length / 2 + length * log(i) / log(10) / 2, height / 4 + 2 * tickHeight / 3)
    }
}

function drawRule() {
    noFill();
    rect(0, 0, width, height / 4);
    rect(0, height * 3 / 4, width, height / 4);

    rect(slidePos, height / 4, width, height / 2);

    fill(defaultColor);

    line(indexPos, 0, indexPos, height)

    //L

    text("L", offset - 2 * fontsize, height - tickHeight - fontsize)
    for (i = 0; i < 11; i++) {
        line(offset + length / 10 * i, height, offset + length / 10 * i, height - tickHeight)
        text(i % 10, offset + length / 10 * i, height - tickHeight - fontsize);
    }

    for (i = 0; i < 10; i += 0.1) {
        line(offset + length / 10 * i, height, offset + length / 10 * i, height - tickHeight / 2)
    }

    //D
    text("D", offset - 2 * fontsize, 3 / 4 * height + fontsize + tickHeight)
    for (i = 1; i < 11; i++) {
        line(offset + length * log(i) / log(10), 3 / 4 * height, offset + length * log(i) / log(10), 3 / 4 * height + tickHeight)
        text((i - 1) % 9 + 1, offset + length * log(i) / log(10), 3 / 4 * height + tickHeight + fontsize);
    }

    for (i = 1; i < 10; i += 0.1) {
        line(offset + length * log(i) / log(10), 3 / 4 * height, offset + length * log(i) / log(10), 3 / 4 * height + 2 * tickHeight / 3)
    }

    for (i = 1; i < 2; i += 0.02) {
        line(offset + length * log(i) / log(10), 3 / 4 * height, offset + length * log(i) / log(10), 3 / 4 * height + tickHeight / 3)
    }

    for (i = 2; i < 5; i += 0.05) {
        line(offset + length * log(i) / log(10), 3 / 4 * height, offset + length * log(i) / log(10), 3 / 4 * height + tickHeight / 3)
    }

    //A
    text("A", offset - 2 * fontsize, height / 4 - fontsize - tickHeight)
    for (i = 1; i < 11; i++) {
        line(offset + length * log(i) / log(10) / 2, height / 4, offset + length * log(i) / log(10) / 2, height / 4 - tickHeight)
        text((i - 1) % 9 + 1, offset + length * log(i) / log(10) / 2, height / 4 - tickHeight - fontsize);

        line(offset + length / 2 + length * log(i) / log(10) / 2, height / 4, offset + length / 2 + length * log(i) / log(10) / 2, height / 4 - tickHeight)
        text((i - 1) % 9 + 1, offset + length / 2 + length * log(i) / log(10) / 2, height / 4 - tickHeight - fontsize);

    }

    for (i = 1; i < 6; i += 0.1) {
        line(offset + length * log(i) / log(10) / 2, height / 4, offset + length * log(i) / log(10) / 2, height / 4 - 2 * tickHeight / 3)

        line(offset + length / 2 + length * log(i) / log(10) / 2, height / 4, offset + length / 2 + length * log(i) / log(10) / 2, height / 4 - 2 * tickHeight / 3)
    }

    for (i = 1; i < 3; i += 0.05) {
        line(offset + length * log(i) / log(10) / 2, height / 4, offset + length * log(i) / log(10) / 2, height / 4 - tickHeight / 3)

        line(offset + length / 2 + length * log(i) / log(10) / 2, height / 4, offset + length / 2 + length * log(i) / log(10) / 2, height / 4 - tickHeight / 3)
    }
    for (i = 6; i < 10; i += 0.2) {
        line(offset + length * log(i) / log(10) / 2, height / 4, offset + length * log(i) / log(10) / 2, height / 4 - 2 * tickHeight / 3)

        line(offset + length / 2 + length * log(i) / log(10) / 2, height / 4, offset + length / 2 + length * log(i) / log(10) / 2, height / 4 - 2 * tickHeight / 3)
    }

    //K
    text("K", offset - 2 * fontsize, fontsize + tickHeight)
    for (i = 1; i < 11; i++) {
        line(offset + length * log(i) / log(10) / 3, 0, offset + length * log(i) / log(10) / 3, tickHeight)
        text((i - 1) % 9 + 1, offset + length * log(i) / log(10) / 3, tickHeight + fontsize);

        line(offset + length / 3 + length * log(i) / log(10) / 3, 0, offset + length / 3 + length * log(i) / log(10) / 3, tickHeight)
        text((i - 1) % 9 + 1, offset + length / 3 + length * log(i) / log(10) / 3, tickHeight + fontsize);

        line(offset + 2 * length / 3 + length * log(i) / log(10) / 3, 0, offset + 2 * length / 3 + length * log(i) / log(10) / 3, tickHeight)
        text((i - 1) % 9 + 1, offset + 2 * length / 3 + length * log(i) / log(10) / 3, tickHeight + fontsize);
    }

    for (i = 1; i < 4; i += 0.1) {
        line(offset + length * log(i) / log(10) / 3, 0, offset + length * log(i) / log(10) / 3, tickHeight / 3)
        line(offset + length / 3 + length * log(i) / log(10) / 3, 0, offset + length / 3 + length * log(i) / log(10) / 3, tickHeight / 3)
        line(offset + 2 * length / 3 + length * log(i) / log(10) / 3, 0, offset + 2 * length / 3 + length * log(i) / log(10) / 3, tickHeight / 3)
    }

    for (i = 4; i < 10; i += 0.2) {
        line(offset + length * log(i) / log(10) / 3, 0, offset + length * log(i) / log(10) / 3, tickHeight / 3)
        line(offset + length / 3 + length * log(i) / log(10) / 3, 0, offset + length / 3 + length * log(i) / log(10) / 3, tickHeight / 3)
        line(offset + 2 * length / 3 + length * log(i) / log(10) / 3, 0, offset + 2 * length / 3 + length * log(i) / log(10) / 3, tickHeight / 3)
    }

    for (i = 1; i < 2; i += 0.05) {
        line(offset + length * log(i) / log(10) / 3, 0, offset + length * log(i) / log(10) / 3, tickHeight / 3)
        line(offset + length / 3 + length * log(i) / log(10) / 3, 0, offset + length / 3 + length * log(i) / log(10) / 3, tickHeight / 3)
        line(offset + 2 * length / 3 + length * log(i) / log(10) / 3, 0, offset + 2 * length / 3 + length * log(i) / log(10) / 3, tickHeight / 3)
    }
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
    if (mouseY < height * 3 / 4 && mouseY > height / 4) {
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