let mic;
let fft;
let button;

let ww = window.innerWidth;
let wh = window.innerHeight;
let pow;
let bcolor;
let fillcolor;
let linecolor;
let lineWeight;
let barRange = [];
let h;
let vis;
let barMargin;

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

if (localStorage.getItem('fillcolor') === null) {
    fillcolor = "#ffffff"
} else {
    fillcolor = localStorage.getItem('fillcolor');
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

if (localStorage.getItem('barMargin') === null) {
    barMargin = 5;
} else {
    barMargin = Number(localStorage.getItem('barMargin'));
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
    translate(width / 2, height / 2);
    for (var i = 0; i < l; i++) {
        var amp = spectrum[i + start] * 2.1;

        strokeWeight(lineWeight);
        stroke(linecolor);
        fill(fillcolor);

        switch (vis) {
            case "bars":
                bars(amp, l, i);
                break;
            case "bar_circle":
                bar_circle(amp, l, i);
                break;
            case "doubleBars":
                doubleBars(amp, l, i);
                break;
            case "multiColor":
                multiColor(amp, l, i);
                break;
            case "sidebars":
                sidebars(amp, l, i);
                break;
            default:
                bars(amp, l, i);
                break;
        }
    }
}

function bars(amp, l, i) {
    let x = -ww / 2 + (wh / l - 3) / 2 + 6 + i * ww / (l + 1);
    let y = -amp * Math.pow(i + 1, 1 / 5) * wh / 456 * h + wh / 2;

    rect(x, wh - 20 - wh / 2, ww / l * 0.9 - 3, y > 0 ? 0 : y, 0, 0, barMargin, barMargin);

}

function bar_circle(amp, l, i) {

    let y = -amp * Math.pow(i + 1, 1 / 5) * wh / 690 * h + wh / 2;

    rotate(1 / l * 180);
    rect(-ww / l * 0.9 / 2, wh / 6, ww / l * 0.9 - 3, y > 0 ? 0 : -y, 0, 0, barMargin, barMargin);
    rotate(-(1 + i / l * 180) * 2);
    rect(-ww / l * 0.9 / 2, wh / 6, ww / l * 0.9 - 3, y > 0 ? 0 : -y, 0, 0, barMargin, barMargin);
    rotate((1 + i / l * 180) * 2);
}

function doubleBars(amp, l, i) {

    let x = -ww / 2 + (wh / l - 3) / 2 + 6 + i * ww / (l + 1);
    let y = -amp * Math.pow(i + 1, 1 / (pow / 2)) * wh / 456 * h + wh / 2;

    rect(x, wh / 2 - wh / 2, ww / l * 0.9 - 3, y > 0 ? 0 : y / 2, 0, 0, barMargin, barMargin);
    rect(x, wh / 2 - wh / 2, ww / l * 0.9 - 3, y > 0 ? 0 : -y / 2, 0, 0, barMargin, barMargin);
}

function multiColor(amp, l, i) {

    let x = -ww / 2 + (wh / l - 3) / 2 + 6 + i * ww / (l + 1);
    let y = -amp * Math.pow(i + 1, 1 / (pow / 2)) * wh / 456 * h + wh / 2;
    let z = (y > 0 ? 0 : abs(y / wh * 100 % 360));
    let c = color(abs(z - 31 % 360), 100, z);
    stroke(c);
    fill(c);
    rect(x, wh / 2 - wh / 2, ww / l * 0.9 - 3, y > 0 ? 0 : y / 2, 0, 0, barMargin, barMargin);
    rect(x, wh / 2 - wh / 2, ww / l * 0.9 - 3, y > 0 ? 0 : -y / 2, 0, 0, barMargin, barMargin);
}

function sidebars(amp, l, i) {

    let y = -wh / 2 + (wh / l - 3) / 2 + 6 + i * wh / (l + 1);
    let x = -amp * Math.pow(i + 1, 1 / (pow / 2)) * ww / 456 * h + ww / 2;

    rect(ww / 2 - 3, wh / 2 - y - wh / 2, x > 0 ? 0 : x / 2, wh / l * 0.9 - 3, 0, barMargin, barMargin, 0);
    rect(-ww / 2 + 3, wh / 2 - y - wh / 2, x > 0 ? 0 : -x / 2, wh / l * 0.9 - 3, 0, barMargin, barMargin, 0);
}
