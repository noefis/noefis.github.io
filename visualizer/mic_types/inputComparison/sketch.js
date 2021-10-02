let fft;

let ww = window.innerWidth;
let wh = window.innerHeight;

let mic = true;
let len = 1;
let h;
let clipping;
let barRange = [];
let pow;
let lineWeight;

function updateSettings() {

    if (localStorage.getItem('barMultiple') === null) {
        pow = 11;
    } else {
        pow = localStorage.getItem('barMultiple');
    }

    if (localStorage.getItem('height') === null) {
        h = 1;
    } else {
        h = Number(localStorage.getItem('height')) / 50;
    }

    if (localStorage.getItem('clipping') === null) {
        clipping = 0;
    } else {
        clipping = Number(localStorage.getItem('clipping'));
    }

    if (localStorage.getItem('barRange') === null) {
        barRange[0] = 1;
        barRange[1] = 50;
    } else {
        barRange[0] = Number(localStorage.getItem('barRange').split(",")[0]);
        barRange[1] = Number(localStorage.getItem('barRange').split(",")[1]);
    }
    if (barRange[0] === barRange[1]) {
        barRange[1] = barRange[1] + 1;
    }

    if (localStorage.getItem('lineWeight') === null) {
        lineWeight = 2;
    } else {
        lineWeight = Number(localStorage.getItem('lineWeight'));
        if (Number(localStorage.getItem('lineWeight')) < 1) {
            lineWeight = 1;
        }
    }
}

updateSettings();

window.addEventListener("storage", () => {
    updateSettings();
}, false);


function setup() {
    createCanvas(ww, wh);
    colorMode(HSB);

    audioIn1 = new p5.AudioIn();
    fft1 = new p5.FFT(0.9, Math.pow(2, pow));
    fft1.setInput(audioIn1);

    audioIn2 = new p5.AudioIn();
    fft2 = new p5.FFT(0.9, Math.pow(2, pow));
    fft2.setInput(audioIn2);

    audioIn1.getSources().then(deviceList => {
        console.log(deviceList);
        len = deviceList.length;
        audioIn1.setSource(0);
        audioIn2.setSource(len - 1);

        localStorage.setItem('icw', len + ',' + deviceList[0].label + ',' + deviceList[len - 1].label);

        audioIn1.start();
        audioIn2.start();
    });
}

function draw() {
    background(0);
    let spectrum1 = fft1.analyze();
    let start = Math.floor(spectrum1.length / 100 * barRange[0]);
    let stop = Math.floor(spectrum1.length / 100 * barRange[1]);
    let l = Math.floor(stop - start);

    translate(width / 2, height / 2);

    noFill();
    beginShape();
    strokeWeight(lineWeight);
    stroke("#00E0AA");
    for (let i = 0; i < l; i++) {
        let amp = spectrum1[i + start] * h;
        let x = calX(l, i);
        let y = calHeight(amp);
        curveVertex(x, -y + wh / 2 - 20);
    }
    endShape();

    let spectrum2 = fft2.analyze();
    smooth();
    beginShape();
    stroke("#FF00AA");
    for (let i = 0; i < l; i++) {
        let amp = spectrum2[i + start] * h;
        let x = calX(l, i);
        let y = calHeight(amp);
        curveVertex(x, -y + wh / 2 - 20);
    }
    endShape();

}

function calX(l, i) {
    return -ww / 2 + (wh / l - 3) / 2 + 6 + i * ww / (l + 1);
}

function calHeight(amp, WindowHeight = wh) {
    let he = amp * WindowHeight / 250 - (clipping / 100 * WindowHeight);
    if (he > 0) {
        return he;
    } else {
        return 0;
    }
}