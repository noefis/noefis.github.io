let ww = window.innerWidth;
let wh = window.innerHeight;
let bcolor;
let h;

const fft = [40, 60, 80, 40, 20, 35, 69, 100, 50, 10, 40];

function updateSettings() {

    if (localStorage.getItem('height') === null) {
        h = 1;
    } else {
        h = Number(localStorage.getItem('height')) / 50;
    }
}

updateSettings();

window.addEventListener("storage", () => {
    updateSettings();
}, false);


function setup() {
    createCanvas(ww, wh);
    window.addEventListener('resize', () => {
        ww = window.innerWidth;
        wh = window.innerHeight;
        resizeCanvas(window.innerWidth, window.innerHeight);
    });
    angleMode(DEGREES);
    colorMode(HSB);
}


function draw() {
    background("#17171d");

    noStroke();
    translate(width / 2, height / 2);
    for (let i = 0; i < fft.length; i++) {
        const amp = fft[i] * h;
        const round = -(ww / fft.length * 0.75 - 3);
        const width = ww / fft.length * 0.75 - 3;


        multiColor(amp, fft.length, i, width, round);
    }
}

function multiColor(amp, l, i, width, round) {

    let x = width / 2 + -ww / 2 + (wh / l - 3) / 2 + 6 + i * ww / (l + 1);
    const y = calHeight(amp, round);
    let z = (-y > 0 ? 0 : abs(-y / wh * 100 % 360));
    let c = color(abs(z - 31 % 360), 100, z);
    stroke(c);
    fill(c);
    rect(x, y / 2, width, -y, 100, 100, 100, 100);
}

function calHeight(amp, round = 0, WindowHeight = wh) {
    let he = amp * (WindowHeight / 250)/ Math.max(1,(ww/1000));
    if (he > 0) {
        return he - round < 0 ? 0 : he - round;
    } else {
        return -round < 0 ? 0 : -round;
    }
}
