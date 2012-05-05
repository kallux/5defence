window.onload = init;

var canvas,
    stage;

function init() {
    alert('woot');
    canvas = document.getElementById("gameCanvas");
    stage = new Stage(canvas);
}