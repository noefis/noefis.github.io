var head = document.getElementsByTagName('head')[0];
var js = document.createElement("script");

js.type = "text/javascript";

let types = "mic_types";

if (localStorage.getItem('micOrSound') !== null && localStorage.getItem('micOrSound') === "sound") {
    var errorP = document.getElementById('errorP');
    if (localStorage.getItem('musicData') !== null) {
        types = "load_types";
        errorP.parentNode.removeChild(errorP);
    } else {
        console.log("p");
        errorP.innerHTML = "Could not load Audio";
        types = "none";
    }
}

switch (localStorage.getItem('micOrSound')) {
    case "mic":
        types = "mic_types";
        break;
    case "sound":
        types = "load_types";
        break;
    case "compareInputs":
        types = "compareInputs";
        break;
    case "toneGenerator":
        types = "sound_types";
        break;
    default:
        types = "mic_types";
        break;
}

if (types !== "none") {
    if (localStorage.getItem('type') === null) {
        type = "bar";
    } else {
        type = localStorage.getItem('type');
    }
    if (types === "compareInputs") {
        js.src = `mic_types/inputComparison/sketch.js`;
    } else {
        switch (type) {
            case "bar":
                js.src = `${types}/bar/sketch.js`;
                break;
            case "line":
                js.src = `${types}/line/sketch.js`;
                break;
            default:
                js.src = `${types}/bar/sketch.js`;
                break
        }

    }
}

head.appendChild(js);