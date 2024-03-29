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
let lineCircleSize;
let lineCircleShow;
let clipping;
let audio;
let link;
let s;
let changeTime = 0;

let attack = 0.8;

let fftcopy;
let fftpause = false;

let song;

let capturer;

let recording = false;


if (localStorage.getItem('barMultiple') === null) {
    pow = 9;
} else {
    pow = localStorage.getItem('barMultiple');
}

if (localStorage.getItem('attack') === null) {
    attack = 0.8;
} else {
    attack = localStorage.getItem('attack');
}

function updateSettings() {

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
        barRange[1] = 10;
    } else {
        barRange[0] = Number(localStorage.getItem('barRange').split(",")[0]);
        barRange[1] = Number(localStorage.getItem('barRange').split(",")[1]);
    }
    if (barRange[0] === barRange[1]) {
        barRange[1] = barRange[1] + 1;
    }

    if (localStorage.getItem('height') === null) {
        h = 0.6;
    } else {
        h = Number(localStorage.getItem('height')) / 50;
    }

    if (localStorage.getItem('clipping') === null) {
        clipping = 50;
    } else {
        clipping = Number(localStorage.getItem('clipping'));
    }

    if (localStorage.getItem('vis') === null) {
        vis = "line";
    } else {
        vis = localStorage.getItem('vis');
    }

    if (localStorage.getItem('lineFill') === null) {
        lineFill = false;
    } else {
        lineFill = 'true' === localStorage.getItem('lineFill');
    }

    if (localStorage.getItem('showLineCircle') === null) {
        lineCircleShow = false;
    } else {
        lineCircleShow = 'true' === localStorage.getItem('showLineCircle');
    }


    if (localStorage.getItem('fillcolor') === null) {
        fillcolor = "#ffffff"
    } else {
        fillcolor = localStorage.getItem('fillcolor');
    }

    if (localStorage.getItem('lineCircleSize') === null) {
        lineCircleSize = 50;
    } else {
        lineCircleSize = Number(localStorage.getItem('lineCircleSize'));
    }

    if (localStorage.getItem('barMargin') === null) {
        barMargin = 5;
    } else {
        barMargin = Number(localStorage.getItem('barMargin'));
    }

    if (localStorage.getItem('ytlink') === null) {
        audio = localStorage.getItem('musicData');
    } else {
        audio = localStorage.getItem('ytlink');
    }

    if (localStorage.getItem('changeTime') !== null) {
        changeTime = localStorage.getItem('changeTime');
        localStorage.removeItem('changeTime');
    }
}

updateSettings();

window.addEventListener("storage", () => {
    updateSettings();
}, false);

function preload() {
    song = loadSound(audio, removeLoadingPercent(), removeLoadingPercent(), whileLoading);
}

function whileLoading(total) {
    let percent = Math.floor(total * 100 + 1);
    if (percent < 100) {
        localStorage.setItem("percentLoaded", percent.toString());
    } else {
        localStorage.removeItem("percentLoaded");
    }
}

function removeLoadingPercent() {
    localStorage.removeItem("percentLoaded");
}

function setup() {
    createCanvas(ww, wh);
    window.addEventListener('resize', () => {
        ww = window.innerWidth;
        wh = window.innerHeight;
        resizeCanvas(window.innerWidth, window.innerHeight);
    });

    window.addEventListener("storage", () => {
        if (Number(localStorage.getItem('attack')) !== attack && localStorage.getItem('attack') !== null) {
            attack = Number(localStorage.getItem('attack'));
            fft = new p5.FFT(attack, Math.pow(2, pow));
        }
        if (Number(localStorage.getItem('barMultiple')) !== pow && localStorage.getItem('barMultiple') !== null) {
            pow = Number(localStorage.getItem('barMultiple'));
            fft = new p5.FFT(attack, Math.pow(2, pow));
        }
        record();
    }, false);
    song.play();
    angleMode(DEGREES);
    colorMode(HSB);
    fft = new p5.FFT(attack, Math.pow(2, pow));
    localStorage.setItem("duration", song.duration());
}


function record() {
    if ((localStorage.getItem('record') === "png" || localStorage.getItem('record') === "webm") && recording === false) {
        recording = true;
        if (localStorage.getItem('record') === "png") {
            capturer = new CCapture({format: 'png'});
        }
        if (localStorage.getItem('record') === "webm") {
            capturer = new CCapture({format: 'webm-mediarecorder'});
        }
        localStorage.removeItem('record');
        if (localStorage.getItem('startOnZero') === "true") {
            song.jump(0);
            song.stop();
            setTimeout(() => {
                song.play();
                setTimeout(() => {
                    capturer.start();
                    capturer.capture(document.getElementById('defaultCanvas0'));
                }, 330);
            }, 2700);

        } else {
            capturer.start();
            capturer.capture(document.getElementById('defaultCanvas0'));
        }
    }
    if (localStorage.getItem('record') === "false" && recording) {
        recording = false;
        localStorage.removeItem('record');
        capturer.stop();
        capturer.save();
    }
}

function mousePressed() {
    if (song.isPlaying()) {
        fftcopy = fft.analyze();
        song.pause();
        fftpause = true;
    } else {
        song.play();
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
    background(bcolor);
    if (Math.floor(millis() / 500) !== s) {
        s = Math.floor(millis() / 500);
        localStorage.setItem("currentTime", song.currentTime());
    }
    if (changeTime !== 0) {
        if (changeTime < song.duration()) {
            song.jump(changeTime);
        }
        changeTime = 0;
    }

    let spectrum;
    if (!fftpause) {
        spectrum = fft.analyze();
    } else {
        spectrum = fftcopy;
    }

    let start = Math.floor(spectrum.length / 100 * barRange[0]);
    let stop = Math.floor(spectrum.length / 100 * barRange[1]);
    let l = Math.max(Math.floor(stop - start), 4);
    
    noStroke();
    fill(fillcolor);
    translate(width / 2, height / 2);
    if (!lineFill) {
        noFill();
    }
    beginShape();
    strokeWeight(lineWeight <= 0 ? 1 : lineWeight);
    if (vis === "line") {
        if (lineFill) {
            curveVertex(calX(l, 0), wh / 2 - 20);
            curveVertex(calX(l, 0), wh / 2 - 20);
        }
        for (let i = 0; i < l; i++) {
            let amp = spectrum[i + start] * h;
            if (lineWeight > 0) {
                stroke(linecolor);
            }
            let x = calX(l, i);
            let y = calHeight(amp);
            if (lineFill && i > 0 && i < l - 1) {
                if ((calHeight(spectrum[i - 1 + start] * h) > 20 || calHeight(spectrum[i + 1 + start] * h) > 20) && y < 10) {
                    y = 10;
                }
            }
            curveVertex(x, -y + wh / 2 - 20);
        }
        if (lineFill) {
            curveVertex(calX(l, l), wh / 2 - 20);
            curveVertex(calX(l, l), wh / 2 - 20);
        }
    } else if (vis === "line_circle") {

        for (let i = 0; i < l; i++) {
            let angle = map(i, 1, l - 1, 0, 180) - 90;
            let amp = spectrum[i + start] * h;
            let height = calHeight(amp) / 2.7;
            let x = (-height - lineCircleSize) * cos(angle);
            let y = (-height - lineCircleSize) * sin(angle);
            if (lineWeight > 0) {
                stroke(linecolor);
            }
            curveVertex(x, y);
        }
        for (let i = l - 2; i >= 0; i--) {
            let angle = map(i, 1, l - 1, 0, 180) - 90;
            let amp = spectrum[i + start] * h;
            let height = calHeight(amp) / 2.7;
            let x = (-height - lineCircleSize) * cos(angle);
            let y = (-height - lineCircleSize) * sin(angle);
            if (lineWeight > 0) {
                stroke(linecolor);
            }
            curveVertex(-x, y);
        }
    } else {
        let max_amp = 0;
        for (let i = 0; i < l; i++) {
            let angle = map(i, 1, l - 1, 0, 180) - 90;
            let amp = spectrum[i + start] * h;
            let height = calHeight(amp) / 2.7;
            if (max_amp < Math.abs(height)) {
                max_amp = Math.abs(height);
            }
            let x = (-height - lineCircleSize) * cos(angle);
            let y = (-height - lineCircleSize) * sin(angle);
            if (lineWeight > 0) {
                stroke(bcolor);
            }
            curveVertex(x, y);
        }
        for (let i = l - 2; i >= 0; i--) {
            let angle = map(i, 1, l - 1, 0, 180) - 90;
            let amp = spectrum[i + start] * h;
            let height = calHeight(amp) / 2.7;
            let x = (-height - lineCircleSize) * cos(angle);
            let y = (-height - lineCircleSize) * sin(angle);
            if (lineWeight > 0) {
                stroke(bcolor);
            }
            curveVertex(-x, y);
        }
        let z = (max_amp / wh * 180 % 360);
        let c = color(abs(z - 31 % 360), 100, z - 10);
        alpha = z / 2 - 10 < 0 ? 0 : z / 2 - 10;
        lc = color(linecolor);
        lc.setAlpha(alpha);
        if (lineWeight > 0) {
            stroke(lc);
        }
        fill(c);
    }
    endShape();
    if (vis !== "line" && lineCircleShow) {
        lc = color(linecolor);
        lc.setAlpha(alpha);
        if (lineWeight > 0) {
            stroke(lc);
        }
        circle(0, 0, lineCircleSize * 2);
    }

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
