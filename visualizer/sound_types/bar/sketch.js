let mic;
let fft;
let button;

let ww = window.innerWidth;
let wh = window.innerHeight;
let pow, bcolor, fillcolor, linecolor, lineWeight, barRange = [0, 39], h, vis, barMargin, clipping;

let osc, playing, freq, freq_amp, noise;

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
        vis = "bars";
    } else {
        vis = localStorage.getItem('vis');
    }

    if (localStorage.getItem('barMargin') === null) {
        barMargin = 5;
    } else {
        barMargin = Number(localStorage.getItem('barMargin'));
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
    console.log(pinkNoise);
    if (pinkNoise) {
        noise.amp(1);
        noise.start();
    }
    angleMode(DEGREES);
    colorMode(HSB);
    fft = new p5.FFT(0.9, Math.pow(2, pow));
}

function playOscillator() {
    osc.start();
    playing = true;
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
        playOscillator();
    }
}

function mouseReleased() {
    if (!pinkNoise) {
        osc.amp(0, 0.5);
        playing = false;
    }
}


function draw() {
    background(bcolor);
    if (pinkNoise) {

    } else {
        freq = constrain(map(mouseX - 12, 0, width, 50, 9410), 50, 9410);
        freq_amp = constrain(map((wh - mouseY), height, 0, 1, 0), 0, 1);

        text('freq: ' + Math.floor(freq) + ' Hz', 20, 20);
        if (playing) {
            osc.freq(freq, 0.1);
            osc.amp(freq_amp, 0.1);
        }
    }

    let spectrum = fft.analyze();

    let start = Math.floor(spectrum.length / 100 * barRange[0]);
    let stop = Math.floor(spectrum.length / 100 * barRange[1]);
    let l = stop - start;

    noStroke();
    translate(width / 2, height / 2);
    for (let i = 0; i < l; i++) {
        const amp = spectrum[i + start] * h;
        const round = barMargin >= 5 ? -(ww / l * 0.75 - 3) : 0;
        const width = ww / l * 0.75 - 3;
        if (lineWeight > 0) {
            strokeWeight(lineWeight);
            stroke(linecolor);
        }

        fill(fillcolor);

        switch (vis) {
            case "bars":
                bars(amp, l, i, width, round);
                break;
            case "bar_circle":
                bar_circle(amp, l, i, width, round);
                break;
            case "doubleBars":
                doubleBars(amp, l, i, width, round);
                break;
            case "multiColor":
                multiColor(amp, l, i, width, round);
                break;
            case "sidebars":
                sidebars(amp, l, i, width, round);
                break;
            default:
                bars(amp, l, i, width, round);
                break;
        }
    }
}

function bars(amp, l, i, width, round) {
    const x = -ww / 2 + (wh / l - 3) / 2 + 6 + i * ww / (l + 1);
    const y = calHeight(amp, round);
    rect(x, wh - 20 - wh / 2, width, -y, barMargin, barMargin, barMargin, barMargin);

}

function bar_circle(amp, l, i, width, round) {

    const y = calHeight(amp, round) / 3;

    rotate(1 / l * 180);
    rect(-ww / l * 0.9 / 2, wh / 6, width, y, barMargin, barMargin, barMargin, barMargin);
    rotate(-(1 + i / l * 180) * 2);
    rect(-ww / l * 0.9 / 2, wh / 6, width, y, barMargin, barMargin, barMargin, barMargin);
    rotate((1 + i / l * 180) * 2);
}

function doubleBars(amp, l, i, width, round) {

    const x = -ww / 2 + (wh / l - 3) / 2 + 6 + i * ww / (l + 1);
    const y = calHeight(amp, round);

    rect(x, y / 2, width, -y, barMargin, barMargin, barMargin, barMargin);
}

function multiColor(amp, l, i, width, round) {

    let x = -ww / 2 + (wh / l - 3) / 2 + 6 + i * ww / (l + 1);
    const y = calHeight(amp, round);
    let z = (-y > 0 ? 0 : abs(-y / wh * 100 % 360));
    let c = color(abs(z - 31 % 360), 100, z);
    stroke(c);
    fill(c);
    rect(x, y / 2, width, -y, barMargin, barMargin, barMargin, barMargin);
}

function sidebars(amp, l, i) {
    const round = barMargin >= 5 ? -(wh / l * 0.75 - 3) : 0;

    let y = -wh / 2 + (wh / l - 3) / 2 + 6 + i * wh / (l + 1);
    let x = calHeight(amp, round, ww);

    rect(ww / 2 - 3, wh / 2 - y - wh / 2, -x / 2.4, wh / l * 0.75 - 3, 0, barMargin, barMargin, 0);
    rect(-ww / 2 + 3, wh / 2 - y - wh / 2, x / 2.4, wh / l * 0.75 - 3, 0, barMargin, barMargin, 0);
}

function calHeight(amp, round = 0, WindowHeight = wh) {
    let he = amp * WindowHeight / 250 - (clipping / 100 * WindowHeight);
    if (he > 0) {
        return he - round;
    } else {
        return -round;
    }
}