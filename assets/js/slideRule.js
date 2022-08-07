sizeX = 800;
sizeY = 800 / 5;

posX = 0;

fontsize = 7;

defaultColor = 200

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

    indexPos = 200;
    slidePos = 100;
}

function draw() {
    pixelDensity(10);
    fill(defaultColor);


    offset = width / 30
    length = width - 2 * offset
    tickHeight = height / 30

    strokeWeight(1);

    drawRule();
    drawSlide();

    // Index

}

function drawSlide() {
    //C
    for (i = 1; i < 11; i++) {
        line(slidePos + offset + length * log(i) / log(10), 3 / 4 * height, slidePos + offset + length * log(i) / log(10), 3 / 4 * height - tickHeight)
        text((i - 1) % 9 + 1, slidePos + offset + length * log(i) / log(10), 3 / 4 * height - tickHeight - fontsize);
    }

    for (i = 1; i < 10; i += 0.1) {
        line(slidePos + offset + length * log(i) / log(10), 3 / 4 * height, slidePos + offset + length * log(i) / log(10), 3 / 4 * height - tickHeight / 2)
    }

    //CI
    for (i = 1; i < 11; i++) {
        line(slidePos + width - offset - length * log(i) / log(10), height * 4 / 7, slidePos + width - offset - length * log(i) / log(10), height * 4 / 7 - tickHeight)
        text((i - 1) % 9 + 1, slidePos + width - offset - length * log(i) / log(10), height * 4 / 7 - tickHeight - fontsize);
    }

    for (i = 1; i < 10; i += 0.1) {
        line(slidePos + width - offset - length * log(i) / log(10), height * 4 / 7, slidePos + width - offset - length * log(i) / log(10), height * 4 / 7 - tickHeight / 2)
    }

    //B
    for (i = 1; i < 11; i++) {
        line(slidePos + offset + length * log(i) / log(10) / 2, height / 4, slidePos + offset + length * log(i) / log(10) / 2, height / 4 + tickHeight)
        text((i - 1) % 9 + 1, slidePos + offset + length * log(i) / log(10) / 2, height / 4 + tickHeight + fontsize);

        line(slidePos + offset + length / 2 + length * log(i) / log(10) / 2, height / 4, slidePos + offset + length / 2 + length * log(i) / log(10) / 2, height / 4 + tickHeight)
        text((i - 1) % 9 + 1, slidePos + offset + length / 2 + length * log(i) / log(10) / 2, height / 4 + tickHeight + fontsize);
    }

    for (i = 1; i < 10; i += 0.2) {
        line(slidePos + offset + length * log(i) / log(10) / 2, height / 4, slidePos + offset + length * log(i) / log(10) / 2, height / 4 + tickHeight / 2)

        line(slidePos + offset + length / 2 + length * log(i) / log(10) / 2, height / 4, slidePos + offset + length / 2 + length * log(i) / log(10) / 2, height / 4 + tickHeight / 2)
    }
}

function drawRule() {
    noFill();
    rect(0, 0, width, height);

    rect(posX + slidePos, height / 4, width, height / 2);

    fill(defaultColor);

    rect(posX, height / 4, slidePos, height / 2);

    line(indexPos, 0, indexPos, height)

    //L
    for (i = 0; i < 11; i++) {
        line(offset + length / 10 * i, height, offset + length / 10 * i, height - tickHeight)
        text(i % 10, offset + length / 10 * i, height - tickHeight - fontsize);
    }

    for (i = 0; i < 10; i += 0.1) {
        line(offset + length / 10 * i, height, offset + length / 10 * i, height - tickHeight / 2)
    }

    //D
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

    //A
    for (i = 1; i < 11; i++) {
        line(offset + length * log(i) / log(10) / 2, height / 4, offset + length * log(i) / log(10) / 2, height / 4 - tickHeight)
        text((i - 1) % 9 + 1, offset + length * log(i) / log(10) / 2, height / 4 - tickHeight - fontsize);

        line(offset + length / 2 + length * log(i) / log(10) / 2, height / 4, offset + length / 2 + length * log(i) / log(10) / 2, height / 4 - tickHeight)
        text((i - 1) % 9 + 1, offset + length / 2 + length * log(i) / log(10) / 2, height / 4 - tickHeight - fontsize);

    }

    for (i = 1; i < 10; i += 0.2) {
        line(offset + length * log(i) / log(10) / 2, height / 4, offset + length * log(i) / log(10) / 2, height / 4 - tickHeight / 2)
        line(offset + length / 2 + length * log(i) / log(10) / 2, height / 4, offset + length / 2 + length * log(i) / log(10) / 2, height / 4 - tickHeight / 2)
    }

    //K
    for (i = 1; i < 11; i++) {
        line(offset + length * log(i) / log(10) / 3, 0, offset + length * log(i) / log(10) / 3, tickHeight)
        text((i - 1) % 9 + 1, offset + length * log(i) / log(10) / 3, tickHeight + fontsize);

        line(offset + length / 3 + length * log(i) / log(10) / 3, 0, offset + length / 3 + length * log(i) / log(10) / 3, tickHeight)
        text((i - 1) % 9 + 1, offset + length / 3 + length * log(i) / log(10) / 3, tickHeight + fontsize);

        line(offset + 2 * length / 3 + length * log(i) / log(10) / 3, 0, offset + 2 * length / 3 + length * log(i) / log(10) / 3, tickHeight)
        text((i - 1) % 9 + 1, offset + 2 * length / 3 + length * log(i) / log(10) / 3, tickHeight + fontsize);
    }

    for (i = 1; i < 10; i += 0.2) {
        line(offset + length * log(i) / log(10) / 3, 0, offset + length * log(i) / log(10) / 3, tickHeight / 2)
        line(offset + length / 3 + length * log(i) / log(10) / 3, 0, offset + length / 3 + length * log(i) / log(10) / 3, tickHeight / 2)
        line(offset + 2 * length / 3 + length * log(i) / log(10) / 3, 0, offset + 2 * length / 3 + length * log(i) / log(10) / 3, tickHeight / 2)
    }
}

function windowResized() {
    var canvasDiv = document.getElementById('slide-rule');
    var canvasWidth = canvasDiv.offsetWidth;

    newSizeX = canvasWidth > sizeX ? sizeX : canvasWidth;
    newSizeY = newSizeX * sizeY / sizeX;
    resizeCanvas(newSizeX, newSizeY);
    redraw();
}