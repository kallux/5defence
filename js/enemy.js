
function Enemy(x, y, sensorRange, attackRange, attackStrength, life) {
    var self = this;
    self.sensorRange = sensorRange;
    self.attackRange = attackRange;
    self.attackStrength = attackStrength;

    var g = new Graphics();
    g.beginFill("#f00");
    g.rect(-4, -4, 10, 10);
    g.beginFill("#00f");
    g.drawCircle(5, 1, 3);
    self.character = new Character(Math.random() + 1, x, y, g, life);

    self.update = function () {
        var i = 0,
            move = true;

        if(self.character.life <= 0) {
            self.character.isDead = true;
            return;
        }

        for(i = 0; i < enemies.length; i += 1) {
            var d = self.character.distanceTo(enemies[i].character);
            if(d < 3) {
                self.character.x = Math.round((Math.random() * 6 - 3));
                self.character.y = Math.round((Math.random() * 6 - 3));
                break;
            }
        }

        self.character.moveToPoint = null;
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
        tower.character.life -= self.attackStrength * dt;
    };
}
