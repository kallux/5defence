var money,
    buildMarineButton,
    buildMarineButtonRect,
    moneyLabel,
    buttonLabel
    marineCost = 50;

function setMoney(amount) {
    money = amount;
    moneyLabel.text = "$" + amount;
}
function addMoney(amount) {
    money += amount;
    setMoney(money);
}
function removeMoney(amount) {
    if(money - amount > 0) {
        money -= amount;
        setMoney(money);
        return true;
    } else {
        return false;
    }
}

function initHud() {
    buttons = [];

    moneyLabel = new Text("$", "bold 14px Arial", "#FFF");
    moneyLabel.x = canvas.width - 50;
    moneyLabel.y = 20;

    buttonLabel = new Text("$" + marineCost, "bold 14px Arial", "#FFF");
    buttonLabel.x = canvas.width - 50;
    buttonLabel.y = canvas.height - 10;

    setMoney(0);

    var g = new Graphics();
    g.beginFill("#9999FF");
    g.rect(0,0,80,30);
    buildMarineButton = new Shape(g);
    buildMarineButton.x = parseInt(canvas.width-80);
    buildMarineButton.y = parseInt(canvas.height-30);
    buildMarineButtonRect = new Rectangle(buildMarineButton.x, buildMarineButton.y, 80, 30)

    stage.addChild(moneyLabel);
    stage.addChild(buildMarineButton);
    stage.addChild(buttonLabel);

    buildMarineButton.onClick = function (event) {
        if(intersects(stage.mouseX, stage.mouseY, buildMarineButtonRect)) {
            if (removeMoney(marineCost)) {
                addTowers(1);
            }
        }
    };
}

function intersects(x, y, r) {
    return x >= r.x && x <= r.x + r.width && y >= r.y && y <= r.y + r.height;
}
