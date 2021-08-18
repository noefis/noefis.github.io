var head = document.getElementsByTagName('head')[0];
var js = document.createElement("script");

js.type = "text/javascript";

let micOrSound = "mic_types";

if (localStorage.getItem('micOrSound') !== null && localStorage.getItem('micOrSound') === "sound") {
    var errorP = document.getElementById('errorP');
    if (localStorage.getItem('musicName') !== null) {
        micOrSound = "load_types";
        errorP.parentNode.removeChild(errorP);
    } else {
        console.log("p");
        errorP.innerHTML = "You need to select a song first...";
        errorP.style = "color: white";
        micOrSound = "none";
    }
}
if (micOrSound !== "none") {
    if (localStorage.getItem('type') === null) {
        js.src = `${micOrSound}/bar/sketch.js`;
    } else {
        type = localStorage.getItem('type');

        switch (type) {
            case "bar":
                js.src = `${micOrSound}/bar/sketch.js`;
                break;
            case "line":
                js.src = `${micOrSound}/line/sketch.js`;
                break;
            default:
                js.src = `${micOrSound}/bar/sketch.js`;
                break
        }
    }
}

head.appendChild(js);