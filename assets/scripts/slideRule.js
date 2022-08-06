sizeX = 800;
sizeY = 800 / 5;

posX = 0;

fontsize = 12;

defaultColor = 200

function preload() {
    font = loadFont('assets/uniSansThin.otf');
}

function setup() {
    canvas = createCanvas(sizeX, sizeY);
    canvas.parent('slide-rule')

    strokeWeight(2);
    stroke(defaultColor);

    textFont(font);
    textSize(fontsize);
    textAlign(CENTER, CENTER);

    smooth();
}

function draw() {

    noFill();
    rect(0, 0, width, height);

    rect(posX, height / 4, width, height / 2);

    fill(defaultColor);

    offset = width / 10
    length = width - 2 * offset
    tickHeight = height / 20

    //L
    for (i = 0; i < 11; i++) {
        strokeWeight(1);
        line(offset + length / 10 * i, height, offset + length / 10 * i, height - tickHeight)
        strokeWeight(0.01);
        textFont('Arial');

        text(i % 10, offset + length / 10 * i, height - fontsize - 3);
    }

    for (i = 0; i < 10; i += 0.1) {
        strokeWeight(0.5);
        line(offset + length / 10 * i, height, offset + length / 10 * i, height - tickHeight / 2)
    }

    //D
    for (i = 1; i < 11; i++) {
        strokeWeight(1);
        line(offset + length * log(i) / log(10), 3 / 4 * height, offset + length * log(i) / log(10), 3 / 4 * height + tickHeight)
    }

    for (i = 1; i < 10; i += 0.1) {
        strokeWeight(0.2);
        line(offset + length * log(i) / log(10), 3 / 4 * height, offset + length * log(i) / log(10), 3 / 4 * height + tickHeight / 2)
    }

    //C
    for (i = 1; i < 11; i++) {
        strokeWeight(1);
        line(offset + length * log(i) / log(10), 3 / 4 * height, offset + length * log(i) / log(10), 3 / 4 * height - tickHeight)
    }

    for (i = 1; i < 10; i += 0.1) {
        strokeWeight(0.2);
        line(offset + length * log(i) / log(10), 3 / 4 * height, offset + length * log(i) / log(10), 3 / 4 * height - tickHeight / 2)
    }

    //CI
    for (i = 1; i < 11; i++) {
        strokeWeight(1);
        line(width - offset - length * log(i) / log(10), height / 2, width - offset - length * log(i) / log(10), height / 2 - tickHeight)
    }

    for (i = 1; i < 10; i += 0.1) {
        strokeWeight(0.2);
        line(width - offset - length * log(i) / log(10), height / 2, width - offset - length * log(i) / log(10), height / 2 - tickHeight / 2)
    }

    //B
    for (i = 1; i < 11; i++) {
        strokeWeight(1);
        line(offset + length * log(i) / log(10) / 2, height / 4, offset + length * log(i) / log(10) / 2, height / 4 + tickHeight)
        line(offset + length / 2 + length * log(i) / log(10) / 2, height / 4, offset + length / 2 + length * log(i) / log(10) / 2, height / 4 + tickHeight)
    }

    for (i = 1; i < 10; i += 0.2) {
        strokeWeight(0.2);
        line(offset + length * log(i) / log(10) / 2, height / 4, offset + length * log(i) / log(10) / 2, height / 4 + tickHeight / 2)
        line(offset + length / 2 + length * log(i) / log(10) / 2, height / 4, offset + length / 2 + length * log(i) / log(10) / 2, height / 4 + tickHeight / 2)
    }

    //A
    for (i = 1; i < 11; i++) {
        strokeWeight(1);
        line(offset + length * log(i) / log(10) / 2, height / 4, offset + length * log(i) / log(10) / 2, height / 4 - tickHeight)
        line(offset + length / 2 + length * log(i) / log(10) / 2, height / 4, offset + length / 2 + length * log(i) / log(10) / 2, height / 4 - tickHeight)
    }

    for (i = 1; i < 10; i += 0.2) {
        strokeWeight(0.2);
        line(offset + length * log(i) / log(10) / 2, height / 4, offset + length * log(i) / log(10) / 2, height / 4 - tickHeight / 2)
        line(offset + length / 2 + length * log(i) / log(10) / 2, height / 4, offset + length / 2 + length * log(i) / log(10) / 2, height / 4 - tickHeight / 2)
    }

    //K
    for (i = 1; i < 11; i++) {
        strokeWeight(1);
        line(offset + length * log(i) / log(10) / 3, 0, offset + length * log(i) / log(10) / 3, tickHeight)
        line(offset + length / 3 + length * log(i) / log(10) / 3, 0, offset + length / 3 + length * log(i) / log(10) / 3, tickHeight)
        line(offset + 2 * length / 3 + length * log(i) / log(10) / 3, 0, offset + 2 * length / 3 + length * log(i) / log(10) / 3, tickHeight)
    }

    for (i = 1; i < 10; i += 0.2) {
        strokeWeight(0.2);
        line(offset + length * log(i) / log(10) / 3, 0, offset + length * log(i) / log(10) / 3, tickHeight / 2)
        line(offset + length / 3 + length * log(i) / log(10) / 3, 0, offset + length / 3 + length * log(i) / log(10) / 3, tickHeight / 2)
        line(offset + 2 * length / 3 + length * log(i) / log(10) / 3, 0, offset + 2 * length / 3 + length * log(i) / log(10) / 3, tickHeight / 2)
    }
}

function windowResized() {
    newSizeX = windowWidth > sizeX ? sizeX : windowWidth;
    newSizeY = newSizeX * sizeY / sizeX;
    resizeCanvas(newSizeX, newSizeY);
    redraw();
}