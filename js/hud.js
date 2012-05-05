var money,
    buildMarineButton,
    buildMarineButtonRect,
    moneyLabel;

function initHud() {
    money = 0;
    buttons = [];

    moneyLabel = new Text("$0", "bold 14px Arial", "#FFF");
    moneyLabel.x = canvas.width - 50;
    moneyLabel.y = 20;

    var g = new Graphics();
    g.beginFill("#00f");
    g.rect(0,0,50,50);
    buildMarineButton = new Shape(g);
    buildMarineButton.x = parseInt(canvas.width-25);
    buildMarineButton.y = parseInt(canvas.height-25);
    buildMarineButtonRect = new Rectangle(buildMarineButton.x, buildMarineButton.y, 50, 50)

    stage.addChild(moneyLabel);
    stage.addChild(buildMarineButton);

    canvas.onclick = function(event) {
        if (intersects(event.x, event.y, buildMarineButtonRect)) {
            console.log('collision');
        }
    }
}

function intersects(x, y, r) {
    return x >= r.x && x <= r.x + r.width && y >= r.y && y <= r.y + r.height;
}
