var head = document.getElementsByTagName('head')[0];
var js = document.createElement("script");

js.type = "text/javascript";

switch (localStorage.getItem('vis')) {
    case "bars":
        js.src = "types/bars/sketch.js";
        break;
    case "doubleBars":
        js.src = "types/doubleBars/sketch.js";
        break;
    case "sidebars":
        js.src = "types/sidebars/sketch.js";
        break;
    case "circle":
        js.src = "types/circle/sketch.js";
        break;
    case "multiColor":
        js.src = "types/multiColor/sketch.js";
        break;
    default:
        js.src = "types/bars/sketch.js";
}

head.appendChild(js);