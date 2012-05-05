window.onload = init;

var canvas,
    stage,
    fpsLabel,
    characters = [];

function init() {
    var i;
    canvas = document.getElementById("gameCanvas");
    stage = new Stage(canvas);

    // add a text object to output the current FPS:
    fpsLabel = new Text("-- fps", "bold 14px Arial", "#FFF");
    stage.addChild(fpsLabel);
    fpsLabel.x = 10;
    fpsLabel.y = 20;

    // start the tick and point it at the window so we can do some work before updating the stage:
    Ticker.setFPS(60);
    Ticker.addListener(window);

    var g = new Graphics();
    g.beginFill("#f00");
    g.rect(0,0,100,100);
    var shape = new Shape(g);
    shape.x = parseInt(canvas.width/2-50);
    shape.y = parseInt(canvas.height/2-50);;
    stage.addChild(shape);
    stage.update();

    addCharacters();
}

function tick() {
    var i,
        charLen = characters.length;
    fpsLabel.text = Math.round(Ticker.getMeasuredFPS()) + " fps";
    
    for (var i=charLen - 1; i >=     0; i--) {
        characters[i].update();
    }

    // draw the updates to stage
    stage.update();
}

function addCharacters() {
    for(i = 0; i < 100; i += 1) {
        characters.push(new Character(Math.random() * canvas.width, Math.random() * canvas.height));
    }
}

function Character(x, y) {
    var self = this;
    self.speed = 1;
    self.entity = new Text("character: ", "8px Arial", "#CCC");
    self.update = function () {
        self.entity.text = Math.round(self.entity.x) + ' ' + Math.round(self.entity.y);
        self.entity.x += self.entity.vX;
        self.entity.y += self.entity.vY;

        if(self.entity.x > canvas.width) {
            self.entity.vX = -self.entity.vX;
        }
        if(self.entity.x < 0) {
            self.entity.x = 0;
            self.entity.vX = -self.entity.vX;
        }
        if(self.entity.y > canvas.height) {
            self.entity.vY = -self.entity.vY;
        }
        if(self.entity.y < 0) {
            self.entity.vY = -self.entity.vY;
            self.entity.y = 0;
        }
        self.entity.regX = Math.round(self.entity.width / 2.0);
        self.entity.regY = Math.round(self.entity.height / 2.0);
    };

    self.entity.x = x;
    self.entity.y = y;
    self.entity.rotation = Math.random() * 360;
    var a = Math.PI * 2 * Math.random();
    var v = (Math.random() - 0.5) * 2 * self.speed;
    self.entity.vX = Math.cos(a) * v;
    self.entity.vY = Math.sin(a) * v;

    stage.addChild(self.entity);
    return self;
}
