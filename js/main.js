window.onload = init;

var canvas,
    stage,
    fpsLabel,
    characters = [],
    run = true;

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

    addCharacters();
}

function toggleRun() {
    run = !run;
}

function tick() {
    if(!run) {
        return;
    }
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
    self.rotateAmount = 30;

    var g = new Graphics();
    g.beginFill("#0f0");
    g.rect(0,0,10,10);
    g.beginFill("#00f");
    g.drawCircle(10,5,3);
    var shape = new Shape(g);
    self.entity = new Shape(g);
    self.label = new Text(Math.round(self.entity.x)+" "+Math.round(self.entity.y), "8px Arial", "#CCC");

    self.update = function () {
        self.label.text = Math.round(self.entity.x) + ' ' + Math.round(self.entity.y);
        self.entity.x += self.entity.vX;
        self.entity.y += self.entity.vY;

        self.label.x = self.entity.x+10;
        self.label.y = self.entity.y;

        if(self.entity.x > canvas.width) {
            self.entity.rotation += Math.random() * self.rotateAmount;
        }
        if(self.entity.x < 0) {
            self.entity.x = 0;
            self.entity.rotation += Math.random() * self.rotateAmount;
        }
        if(self.entity.y > canvas.height) {
            self.entity.rotation += Math.random() * self.rotateAmount;
        }
        if(self.entity.y < 0) {
            self.entity.y = 0;
            self.entity.rotation += Math.random() * self.rotateAmount;
        }

        var a = self.entity.rotation / 360.0 * Math.PI * 2;
        self.entity.vX = Math.cos(a) * self.entity.v;
        self.entity.vY = Math.sin(a) * self.entity.v;
    };

    self.entity.x = x;
    self.entity.y = y;
    self.entity.rotation = Math.random() * 360;
//    var a = Math.PI * 2 * Math.random();
    var a = self.entity.rotation / 360.0 * Math.PI * 2;
    self.entity.v = Math.random()* self.speed;
    self.entity.vX = Math.cos(a) * self.entity.v;
    self.entity.vY = Math.sin(a) * self.entity.v;
    self.entity.regX = Math.round(self.entity.width / 2.0);
    self.entity.regY = Math.round(self.entity.height / 2.0);

    stage.addChild(self.entity);
    stage.addChild(self.label);
    return self;
}
