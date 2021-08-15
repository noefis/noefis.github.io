let mic;
let fft;
let button;

let ww = window.innerWidth;
let wh = window.innerHeight;
let pow;
let bcolor;
let linecolor;
let lineWeight;
let barRange = [];
let h;
let vis;
let lineFill;
let fillcolor;

if (localStorage.getItem('barMultiple') === null) {
    pow = 9;
} else {
    pow = localStorage.getItem('barMultiple');
}

if (localStorage.getItem('bcolor') === null) {
    bcolor = "#000000"
} else {
    bcolor = localStorage.getItem('bcolor');
}

if (localStorage.getItem('linecolor') === null) {
    linecolor = "#ffffff"
} else {
    linecolor = localStorage.getItem('linecolor');
}


if (localStorage.getItem('lineWeight') === null) {
    lineWeight = 1;
} else {
    lineWeight = Number(localStorage.getItem('lineWeight'));
}

if (localStorage.getItem('barRange') === null) {
    barRange[0] = 1;
    barRange[1] = 100;
} else {
    barRange[0] = Number(localStorage.getItem('barRange').split(",")[0]);
    barRange[1] = Number(localStorage.getItem('barRange').split(",")[1]);
}
if (barRange[0] === barRange[1]) {
    barRange[1] = barRange[1] + 1;
}

if (localStorage.getItem('height') === null) {
    h = 1;
} else {
    h = Number(localStorage.getItem('height')) / 50;
}

if (localStorage.getItem('vis') === null) {
    vis = "bars";
} else {
    vis = localStorage.getItem('vis');
}

if (localStorage.getItem('lineFill') === null) {
    lineFill = false;
} else {
    lineFill = 'true' === localStorage.getItem('lineFill');
}


if (localStorage.getItem('fillcolor') === null) {
    fillcolor = "#ffffff"
} else {
    fillcolor = localStorage.getItem('fillcolor');
}


function setup() {
    createCanvas(ww, wh);

    mic = new p5.AudioIn();
    mic.start();
    angleMode(DEGREES);
    colorMode(HSB);
    fft = new p5.FFT(0.9, Math.pow(2, pow));
    fft.setInput(mic);
}

function draw() {
    background(bcolor);
    let spectrum = fft.analyze();
    let start = Math.floor((spectrum.length / 3) / 100 * barRange[0]);
    let stop = (spectrum.length / 3) / 100 * barRange[1];
    let l = stop - start;
    noStroke();
    fill(fillcolor);
    translate(width / 2, height / 2);
    if (!lineFill) {
        noFill();
    }
    beginShape();
    if (lineFill) {
        curveVertex(calX(l, 0), wh / 2 - 20);
        curveVertex(calX(l, 0), wh / 2 - 20);
    }
    for (let i = 0; i < l; i++) {
        let amp = spectrum[i + start] * 2.1;
        strokeWeight(lineWeight);
        stroke(linecolor);
        let x = calX(l, i);
        let y = calY(amp, i);
        curveVertex(x, y > 0 ? wh / 2 - 20 : y + wh / 2 - 20);
    }
    if (lineFill) {
        curveVertex(calX(l, l), wh / 2 - 20);
        curveVertex(calX(l, l), wh / 2 - 20);
    }
    endShape();
}

function calX(l, i) {
    return -ww / 2 + (wh / l - 3) / 2 + 6 + i * ww / (l + 1);
}

function calY(amp, i) {
    return -amp * Math.pow(i + 1, 1 / 5) * wh / 456 * h + wh / 2;
}
