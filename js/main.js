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
    canvas.onclick = click;
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
      wall = new Wall(parseInt(Math.random() * canvas.width), parseInt(Math.random() * canvas.height), 100, 100);
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
        if(enemies[i].character.isDead) {
            stage.removeChild(enemies[i].character.entity);
            stage.removeChild(enemies[i].character.label);
            enemies.splice(i, 1);
            addMoney(1);
        }
    }

    if(enemiesLen <= 10) {
        addEnemies(100);
    }

    for(var i = towersLen - 1; i >= 0; i--) {
        towers[i].update();
        if(towers[i].character.isDead) {
            stage.removeChild(towers[i].character.entity);
            stage.removeChild(towers[i].character.label);
            towers.splice(i, 1);
        }
    }

    // draw the updates to stage
    stage.update();
}

function addEnemies(count) {
    var e,
        sensorRange = 100,
        attackRange = 3,
        attackStrength = 3,
        life = 200;
    count = count || 100;
    for(i = 0; i < count; i += 1) {
        e = new Enemy(Math.random() * canvas.width, Math.random() * canvas.height, sensorRange, attackRange, attackStrength, life);
        enemies.push(e);
    }
}

function addTowers(count) {
    var t,
        sensorRange = 100,
        attackRange = 70,
        attackStrength = 8,
        life = 1000;
    count = count || 10;
    for(i = 0; i < count; i += 1) {
        t = new Tower(Math.random() * canvas.width, Math.random() * canvas.height, sensorRange, attackRange, attackStrength, life);
        towers.push(t);
    }
}

function Character(speed, x, y, graphics, life) {
    var self = this;
    self.baseSpeed = Math.random() * speed;
    self.speed = self.baseSpeed;
    self.rotateAmount = 15;
    self.rotateDirection = Math.round(Math.random()) === 1 ? 1 : -1;
    self.moveToPoint = null;
    self.baseLife = life;
    self.life = life;
    self.isDead = false;

    self.entity = new Shape(graphics);
    self.label = new Text(Math.round(self.entity.x)+" "+Math.round(self.entity.y), "8px Arial", "#CCC");

    self.entity.x = x;
    self.entity.y = y;
    self.entity.rotation = Math.random() * 360;
//    var a = Math.PI * 2 * Math.random();
    var a = self.entity.rotation / 360.0 * Math.PI * 2;
    self.entity.vX = Math.cos(a) * self.speed;
    self.entity.vY = Math.sin(a) * self.speed;
    self.entity.regX = Math.round(self.entity.width / 2.0);
    self.entity.regY = Math.round(self.entity.height / 2.0);

    stage.addChild(self.entity);
    stage.addChild(self.label);

    self.update = function () {
        self.label.text = Math.round(self.life / self.baseLife * 100) + '%';

        if(self.moveToPoint !== null) {
            self.entity.rotation = Math.atan2(self.moveToPoint.y - self.entity.y, self.moveToPoint.x - self.entity.x) * 180.0 / Math.PI;
        }

        for(var i = 0; walls.length > i; i++)
        {
          if(walls[i].collision(self.entity.x, self.entity.y))
          {
            self.entity.rotation += Math.random() * self.rotateAmount * self.rotateDirection;
            break;
          }
        }

        self.entity.x += self.entity.vX;
        self.entity.y += self.entity.vY;

        self.label.x = self.entity.x+10;
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
        self.entity.vX = Math.cos(a) * self.speed;
        self.entity.vY = Math.sin(a) * self.speed;
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
