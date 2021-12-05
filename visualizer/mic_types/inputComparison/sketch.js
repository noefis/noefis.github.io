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

let attack = 0.9;

let fftcopy1;
let fftcopy2;
let fftpause = false;

let capturer;

let recording = false;


if (localStorage.getItem('barMultiple') === null) {
    pow = 9;
} else {
    pow = localStorage.getItem('barMultiple');
}

if (localStorage.getItem('attack') === null) {
    attack = 0.9;
} else {
    attack = localStorage.getItem('attack');
}

function updateSettings() {

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
    window.addEventListener('resize', () => {
        ww = window.innerWidth;
        wh = window.innerHeight;
        resizeCanvas(window.innerWidth, window.innerHeight);
    });
    window.addEventListener("storage", () => {
        if (Number(localStorage.getItem('attack')) !== attack) {
            attack = Number(localStorage.getItem('attack'));
            fft = new p5.FFT(attack, Math.pow(2, pow));
            fft.setInput(mic);
        }
        if (Number(localStorage.getItem('barMultiple')) !== pow) {
            pow = Number(localStorage.getItem('barMultiple'));
            fft = new p5.FFT(attack, Math.pow(2, pow));
            fft.setInput(mic);
        }
        record();
    }, false);

    colorMode(HSB);

    audioIn1 = new p5.AudioIn();
    fft1 = new p5.FFT(attack, Math.pow(2, pow));
    fft1.setInput(audioIn1);

    audioIn2 = new p5.AudioIn();
    fft2 = new p5.FFT(attack, Math.pow(2, pow));
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

function record() {
    if (localStorage.getItem('record') === "png" && recording === false) {
        recording = true;
        capturer = new CCapture({format: 'png'});
        localStorage.removeItem('record');
        capturer.start();
        capturer.capture(document.getElementById('defaultCanvas0'));
    }
    if (localStorage.getItem('record') === "webm" && recording === false) {
        recording = true;
        capturer = new CCapture({format: 'webm-mediarecorder'});
        localStorage.removeItem('record');
        capturer.start();
        capturer.capture(document.getElementById('defaultCanvas0'));
    }
    if (localStorage.getItem('record') === "false" && recording === true) {
        recording = false;
        localStorage.removeItem('record');
        capturer.stop();
        capturer.save();
    }
}

function mousePressed() {
    if (!fftpause) {
        fftcopy1 = fft1.analyze();
        fftcopy2 = fft2.analyze();
        audioIn1.stop();
        audioIn2.stop();
        fftpause = true;
    } else {
        audioIn1.start();
        audioIn2.start();
        fftpause = false;
    }
}

function keyPressed() {
    if (keyCode === 80) {
        localStorage.setItem('record', 'png');
        record();
    }
    if (keyCode === 87) {
        localStorage.setItem('record', 'webm');
        record();
    }
    if (keyCode === 83) {
        localStorage.setItem('record', 'false');
        record();
    }
}

function draw() {
    background(0);
    let spectrum1;
    let spectrum2;
    if (!fftpause) {
        spectrum1 = fft1.analyze();
        spectrum2 = fft2.analyze();
    } else {
        spectrum1 = fftcopy1;
        spectrum2 = fftcopy2;
    }

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

    if (capturer !== undefined) {
        capturer.capture(document.getElementById('defaultCanvas0'));
    }
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