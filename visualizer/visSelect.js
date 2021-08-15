var head = document.getElementsByTagName('head')[0];
var js = document.createElement("script");

js.type = "text/javascript";


if (localStorage.getItem('type') === null) {
    js.src = "types/bar/sketch.js";
} else {
    type = localStorage.getItem('type');

    switch (type) {
        case "bar":
            js.src = "types/bar/sketch.js";
            break;
        case "line":
            js.src = "types/line/sketch.js";
            break;
        default:
            js.src = "types/bar/sketch.js";
            break
    }
}


head.appendChild(js);