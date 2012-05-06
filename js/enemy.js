
function Enemy(x, y, sensorRange, attackRange, attackStrength, life) {
    var self = this;
    self.sensorRange = sensorRange;
    self.attackRange = attackRange;
    self.attackStrength = attackStrength;

    self.character = new Character(Math.random() + 1, x, y, enemyGraphic, life, false);

    self.update = function () {
        var i = 0,
            move = true;

        if(self.character.life <= 0) {
            self.character.isDead = true;
            return;
        }

        for(i = 0; i < enemies.length; i += 1) {
            if(enemies[i] !== self) {
                var d = self.character.distanceTo(enemies[i].character);
                if(d < 8) {
                    self.character.entity.x += Math.round((Math.random() * 8 - 4));
                    self.character.entity.y += Math.round((Math.random() * 8 - 4));
                    break;
                }
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
        self.character.entity.rotation = Math.atan2(tower.character.entity.y - self.character.entity.y, tower.character.entity.x - self.character.entity.x) * 180.0 / Math.PI;

        tower.character.life -= self.attackStrength * dt;
    };
}
