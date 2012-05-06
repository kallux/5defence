window.onload = init;

var canvas,
    stage,
    dt = 10,
    fpsLabel,
    backdrop,
    flareGraphic,
    bloodGraphic,
    stoneGraphic,
    bodies = [],
    walls = [],
    enemies = [],
    enemyGraphic,
    enemyBodyGraphic,
    enemySpawnpoints = [],
    currentEnemySpawnpoint = 0,
    towers = [],
    towerGraphic,
    towerBodyGraphic,
    run = true;

function init() {
    var i;
    canvas = document.getElementById("gameCanvas");
    stage = new Stage(canvas);
    Touch.enable(stage);
    backdrop = new Bitmap('/images/bg.jpg');
    backdrop.sourceRect = new Rectangle(0, 0, canvas.width, canvas.height);
    stoneGraphic = new Bitmap('/images/stone.jpg');
    flareGraphic = new Bitmap('/images/flare.png');
    bloodGraphic = new Bitmap('/images/blood.png');
    towerGraphic = new Bitmap('/images/marine.png');
    enemyGraphic = new Bitmap('/images/enemy.png');
    enemyBodyGraphic = new Bitmap('/images/zplat.png');
    towerBodyGraphic = new Bitmap('/images/dead-marine.png');
    stage.addChild(backdrop);

    // add a text object to output the current FPS:
    fpsLabel = new Text("-- fps", "bold 14px Arial", "#FFF");
    stage.addChild(fpsLabel);
    fpsLabel.x = 10;
    fpsLabel.y = 20;

    // start the tick and point it at the window so we can do some work before updating the stage:
    Ticker.setFPS(60);
    Ticker.addListener(window);

    enemySpawnpoints.push(new Point(0,0));
    enemySpawnpoints.push(new Point(canvas.width, 0));
    enemySpawnpoints.push(new Point(canvas.width, canvas.height));
    enemySpawnpoints.push(new Point(canvas.width / 2, canvas.height));
    enemySpawnpoints.push(new Point(0, canvas.height));

    backdrop.onClick =click;
    addWalls();
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
        body,
        enemiesLen = enemies.length,
        towersLen = towers.length;
    dt = 60 / Ticker.getMeasuredFPS(3);
    fpsLabel.text = Math.round(Ticker.getMeasuredFPS()) + " fps";

    for(var i = enemiesLen - 1; i >= 0; i--) {
        enemies[i].update();
        if(enemies[i].character.isDead) {
            body = new Body(enemies[i].character.entity.x, enemies[i].character.entity.y, enemies[i].character.entity.rotation, enemyBodyGraphic);
            bodies.push(body);
            stage.removeChild(enemies[i].character.entity);
            stage.removeChild(enemies[i].flare);
            enemies.splice(i, 1);
            addMoney(1);
        }
    }

    if(enemiesLen <= 10) {
        addEnemies(100);
    }

    for(i = towersLen - 1; i >= 0; i--) {
        towers[i].update();
        if(towers[i].character.isDead) {
            body = new Body(towers[i].character.entity.x, towers[i].character.entity.y, towers[i].character.entity.rotation, towerBodyGraphic);
            bodies.push(body);
            stage.removeChild(towers[i].character.entity);
            stage.removeChild(towers[i].flare);
            towers.splice(i, 1);
        }
    }

    for(i = bodies.length - 1; i >= 0; i -= 1) {
        bodies[i].update();
        if(bodies[i].timer <= 0) {
            stage.removeChild(bodies[i].entity);
            bodies.splice(i, 1);
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
        life = 200,
        startPoint = enemySpawnpoints[currentEnemySpawnpoint];
    count = count || 100;
    for(i = 0; i < count; i += 1) {
        e = new Enemy(startPoint.x, startPoint.y, sensorRange, attackRange, attackStrength, life);
        enemies.push(e);
    }
    currentEnemySpawnpoint += 1;
    if(currentEnemySpawnpoint > enemySpawnpoints.length - 1) {
        currentEnemySpawnpoint = 0;
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
        t = new Tower(canvas.width / 2, canvas.height / 2, sensorRange, attackRange, attackStrength, life);
        towers.push(t);
    }
}

function addWalls()
{
    wall = new Wall(200, 100, 50, 300);
    wall.render();
    walls.push(wall);
    wall = new Wall(250, 100, 100, 50);
    wall.render();
    walls.push(wall);
    wall = new Wall(250, 350, 100, 50);
    wall.render();
    walls.push(wall);
}

function click() {
    if(stage.mouseX <= canvas.width-25 && stage.mouseY <= canvas.height-25) {
      var p = new Point(stage.mouseX, stage.mouseY);
      for(i = 0; i < towers.length; i += 1) {
          towers[i].character.moveToPoint = p;
      }
      console.log("Marines move to: " + p.x + ' ' + p.y);
    }
}
