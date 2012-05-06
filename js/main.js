window.onload = init;

var canvas,
    stage,
    fpsLabel,
    walls = [],
    enemies = [],
    enemySpawnpoints = [],
    currentEnemySpawnpoint = 0,
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

    enemySpawnpoints.push(new Point(0,0));
    enemySpawnpoints.push(new Point(canvas.width, 0));
    enemySpawnpoints.push(new Point(canvas.width, canvas.height));
    enemySpawnpoints.push(new Point(canvas.width / 2, canvas.height));
    enemySpawnpoints.push(new Point(0, canvas.height));

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
        t = new Tower(Math.random() * canvas.width, Math.random() * canvas.height, sensorRange, attackRange, attackStrength, life);
        towers.push(t);
    }
}

function click() {
    var p = new Point(stage.mouseX, stage.mouseY);
    for(i = 0; i < towers.length; i += 1) {
        towers[i].character.moveToPoint = p;
    }
    console.log("Marines move to: " + p.x + ' ' + p.y);
}
