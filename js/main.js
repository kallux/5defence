window.addEventListener('load', init, false);

var canvas,
    stage;

function init() {
    canvas = document.getElementById("canvas");
    stage = new Stage(canvas);
}