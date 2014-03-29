
function Enemy(x, y, sensorRange, attackRange, attackStrength, life) {
    var self = this;
    self.sensorRange = sensorRange;
    self.attackRange = attackRange;
    self.attackStrength = attackStrength;

    self.character = new Character(Math.random() + 1, x, y, enemyGraphic, life, false);

    self.showFlare = false;
    self.flareTime = 0;
    self.flare = new Shape(bloodGraphic);
    self.target = new Point(canvas.width / 2 + Math.random() * 100 - 50, canvas.height / 2 + Math.random() * 100 - 50);

    self.update = function () {
        var i = 0,
            move = true;

        self.flareTime -= dt;
        if(self.showFlare && self.flareTime <= 0) {
            stage.removeChild(self.flare);
            self.showFlare = false;
        }

        if(self.character.life <= 0) {
            self.character.isDead = true;
            return;
        }

        for(i = 0; i < enemies.length; i += 1) {
            if(enemies[i] !== self) {
                var d = self.character.distanceTo(enemies[i].character);
                if(d < 8) {
                    var newx = self.character.entity.x + Math.round((Math.random() * 8 - 4)),
                        newy = self.character.entity.y + Math.round((Math.random() * 8 - 4)),
                        collision = false;
                    for (var j = 0; walls.length > j; j++) {
                        if (walls[j].collision(newx, newy)) {
                            collision = true;
                            break;
                        }
                    }
                    if (collision === false) {
                        self.character.entity.x = newx;
                        self.character.entity.y = newy;
                    }
                    break;
                }
            }
        }

        if (self.target) {
            self.character.moveToPoint = self.target;
            if (Math.round(self.character.entity.x) === Math.round(self.target.x) &&
                Math.round(self.character.entity.y) === Math.round(self.target.y)) {
                self.target = null;
                self.character.moveToPoint = null;
            }
        }
        self.character.speed = self.character.baseSpeed;

        for(i = 0; i < towers.length; i += 1) {
            var d = self.character.distanceTo(towers[i].character);
            if(d <= self.sensorRange) {
                if(d <= self.attackRange) {
                    self.attack(towers[i]);
                    move = false;
                    break;
                } else {
                    self.character.moveToPoint = new Point(towers[i].character.entity.x, towers[i].character.entity.y);
                    self.character.speed = 2;
                }
                break;
            }
        }
        if(move) {
            this.character.update();
        }
    };

    self.attack = function (tower) {
        var a = self.character.entity.rotation / 360.0 * Math.PI * 2;
        self.flare.rotation = self.character.entity.rotation;
        self.flare.x = self.character.entity.x;
        self.flare.y = self.character.entity.y;
        self.flare.x += Math.cos(a) * 4 * dt;
        self.flare.y += Math.sin(a) * 4 * dt;
        self.flare.regX = 8;
        self.flare.regY = 8;
        if(!self.showFlare && self.flareTime <= 0) {
            stage.addChildAt(self.flare, stage.getNumChildren() - 1);
            self.showFlare = true;
            self.flareTime = 5;
        }
        self.character.entity.rotation = Math.atan2(tower.character.entity.y - self.character.entity.y, tower.character.entity.x - self.character.entity.x) * 180.0 / Math.PI;
        tower.character.life -= self.attackStrength * dt;
    };
}
