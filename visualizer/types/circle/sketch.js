let mic;
let fft;
let button;

let ww = window.innerWidth;
let wh = window.innerHeight;
let pow;
let bcolor;
let barcolor;
let barRange = [];
let h;

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

if (localStorage.getItem('barcolor') === null) {
  barcolor = "#ffffff"
} else {
  barcolor = localStorage.getItem('barcolor');
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

if (wh > ww) {
  var tmp = wh;
  wh = ww;
  ww = tmp;
}

function setup() {
  createCanvas(ww, wh);

  mic = new p5.AudioIn();
  mic.start();
  angleMode(DEGREES);
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

    let y = -amp * Math.pow(i + 1, 1 / 5) * wh / 690 * h + wh / 2;
    stroke(barcolor);
    fill(barcolor);
    rotate(1 / l * 180);
    rect(-ww / l * 0.9 / 2, wh / 6, ww / l * 0.9 - 3, y > 0 ? 0 : -y);
    rotate(-(1 + i / l * 180) * 2);
    rect(-ww / l * 0.9 / 2, wh / 6, ww / l * 0.9 - 3, y > 0 ? 0 : -y);
    rotate((1 + i / l * 180) * 2);
  }
}
