let mic;
let fft;
let button;

let ww = window.innerWidth;
let wh = window.innerHeight;
let pow, bcolor, fillcolor, linecolor, lineWeight, barRange = [0, 39], h, vis, lineFill, lineCircleSize, lineCircleShow,
    clipping;

let osc, playing, freq, freq_amp, noise, mouse, osc_started = false, mouse_osc = false;

let isNoisy = true;

let pinkNoise;

function updateSettings() {

    if (localStorage.getItem('pinkNoise') === null) {
        pinkNoise = false;
    } else {
        if (localStorage.getItem('pinkNoise') === "true") {
            pinkNoise = true;

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
        }
    }


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

    if (localStorage.getItem('height') === null) {
        h = 1;
    } else {
        h = Number(localStorage.getItem('height')) / 50;
    }

    if (localStorage.getItem('clipping') === null) {
        clipping = 20;
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

    if (localStorage.getItem('freq') !== null) {

        if (Number(localStorage.getItem('freq')) >= 50 && Number(localStorage.getItem('freq')) < 10000) {
            if (freq !== Number(localStorage.getItem('freq'))) {
                freq = Number(localStorage.getItem('freq'));
                freq_amp = 1;
                playing = true;
                mouse = false;
                if (!osc_started && osc !== undefined) {
                    osc.start();
                    osc_started = true;
                }
            }
        }
    }
}

updateSettings();

window.addEventListener("storage", () => {
    updateSettings();
}, false);


function setup() {
    createCanvas(ww, wh);
    osc = new p5.Oscillator('sine');
    noise = new p5.Noise("pink");
    if (pinkNoise) {
        noise.amp(1);
        noise.start();
    }
    angleMode(DEGREES);
    colorMode(HSB);
    fft = new p5.FFT(0.9, Math.pow(2, pow));
}

function mousePressed() {
    if (pinkNoise) {
        if (isNoisy) {
            isNoisy = false;
            noise.stop();
        } else {
            isNoisy = true;
            noise.start();
        }
    } else {
        osc_started = true;
        if (mouse_osc === false) {
            osc.start();
            mouse_osc = true;
        }
        osc.amp(1, 0.1);
        playing = true;
        mouse = true;
    }
}

function mouseReleased() {
    if (!pinkNoise) {
        osc.amp(0, 0.5);
        playing = false;
        mouse = false;
    }
}

function draw() {
    background(bcolor);
    if (pinkNoise) {

    } else if (playing) {

        if (mouse) {
            freq = constrain(map(mouseX - 12, 0, width, 50, 9410), 50, 9350);
            freq_amp = constrain(map((wh - mouseY), height, 0, 1, 0), 0, 1);
        }
        text('freq: ' + Math.floor(freq) + ' Hz', 20, 20);
        osc.freq(freq, 0.1);
        osc.amp(freq_amp, 0.1);
    }
    let spectrum = fft.analyze();

    let start = Math.floor(spectrum.length / 100 * barRange[0]);
    let stop = Math.floor(spectrum.length / 100 * barRange[1]);
    let l = Math.floor(stop - start);
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
        console.log(alpha);
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
