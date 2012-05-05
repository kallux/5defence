window.onload = init;

var canvas,
    stage,
    fpsLabel,
    walls = [],
    enemies = [],
    towers = [],
    run = true;

function init() {
    var i;
    canvas = document.getElementById("gameCanvas");
    canvas.addEventListener('click', click, false);
    stage = new Stage(canvas);

    // add a text object to output the current FPS:
    fpsLabel = new Text("-- fps", "bold 14px Arial", "#FFF");
    stage.addChild(fpsLabel);
    fpsLabel.x = 10;
    fpsLabel.y = 20;

    // start the tick and point it at the window so we can do some work before updating the stage:
    Ticker.setFPS(60);
    Ticker.addListener(window);

    for (var i=3; i >= 0; i--) {
      wall = new Wall(Math.random() * canvas.width, Math.random() * canvas.height, 100, 100);
      wall.render();
      walls.push(wall);
    }

    addEnemies();
    addTowers();
    initHud();
}

function toggleRun() {
    run = !run;
}

function tick() {
    if(!run) {
        return;
    }
    var i,
        enemiesLen = enemies.length,
        towersLen = towers.length;
    fpsLabel.text = Math.round(Ticker.getMeasuredFPS()) + " fps";

    for(var i = enemiesLen - 1; i >= 0; i--) {
        enemies[i].update();
    }

    for(var i = towersLen - 1; i >= 0; i--) {
        towers[i].update();
    }

    // draw the updates to stage
    stage.update();
}

function addEnemies() {
    var e,
        sensorRange = 50,
        attackRange = 3,
        attackStrength = 5,
        life = 20;
    for(i = 0; i < 100; i += 1) {
        e = new Enemy(Math.random() * canvas.width, Math.random() * canvas.height, sensorRange, attackRange, attackStrength, life);
        enemies.push(e);
    }
}

function addTowers() {
    var t,
        sensorRange = 50,
        attackRange = 25,
        attackStrength = 10,
        life = 100;
    for(i = 0; i < 10; i += 1) {
        t = new Tower(Math.random() * canvas.width, Math.random() * canvas.height, sensorRange, attackRange, attackStrength, life);
        towers.push(t);
    }
}

function Character(x, y, graphics) {
    var self = this;
    self.speed = 1;
    self.rotateAmount = 15;
    self.rotateDirection = Math.round(Math.random()) === 1 ? 1 : -1;
    self.moveToPoint = null;
    
    self.entity = new Shape(graphics);
    self.label = new Text(Math.round(self.entity.x)+" "+Math.round(self.entity.y), "8px Arial", "#CCC");

    self.entity.x = x;
    self.entity.y = y;
    self.entity.rotation = Math.random() * 360;
    var a = self.entity.rotation / 360.0 * Math.PI * 2;
    self.entity.v = Math.random() * self.speed;
    self.entity.vX = Math.cos(a) * self.entity.v;
    self.entity.vY = Math.sin(a) * self.entity.v;
    self.entity.regX = Math.round(self.entity.width / 2.0);
    self.entity.regY = Math.round(self.entity.height / 2.0);

    stage.addChild(self.entity);
    stage.addChild(self.label);

    self.update = function () {
        self.label.text = Math.round(self.entity.x) + ' ' + Math.round(self.entity.y);

        if(self.moveToPoint !== null) {
            self.entity.rotation = Math.atan2(self.moveToPoint.y - self.entity.y, self.moveToPoint.x - self.entity.x) * 180.0 / Math.PI;

            self.label.text += ' ' + Math.round(self.entity.rotation);
        }

        self.entity.x += self.entity.vX;
        self.entity.y += self.entity.vY;

        self.label.x = self.entity.x + 10;
        self.label.y = self.entity.y;

        if(self.entity.x > canvas.width) {
            self.entity.x = canvas.width;
            self.entity.rotation += Math.random() * self.rotateAmount * self.rotateDirection;
        }
        if(self.entity.x < 0) {
            self.entity.x = 0;
            self.entity.rotation += Math.random() * self.rotateAmount * self.rotateDirection;
        }
        if(self.entity.y > canvas.height) {
            self.entity.y = canvas.height;
            self.entity.rotation += Math.random() * self.rotateAmount * self.rotateDirection;
        }
        if(self.entity.y < 0) {
            self.entity.y = 0;
            self.entity.rotation += Math.random() * self.rotateAmount * self.rotateDirection;
        }

        var a = self.entity.rotation / 360.0 * Math.PI * 2;
        self.entity.vX = Math.cos(a) * self.entity.v;
        self.entity.vY = Math.sin(a) * self.entity.v;
    };

    self.distanceTo = function (character) {
        var dx = character.entity.x - self.entity.x,
            dy = character.entity.y - self.entity.y;
        return Math.sqrt((dx * dx) + (dy * dy));
    }

    return self;
}

function click() {
    var p = new Point(stage.mouseX, stage.mouseY);
    for(i = 0; i < towers.length; i += 1) {
        if(towers[i].selected) {
            towers[i].moveToPoint = p;
        }
    }
}
