
function Tower(x, y, sensorRange, attackRange, attackStrength, life) {
    var self = this;
    self.sensorRange = sensorRange;
    self.attackRange = attackRange;
    self.attackStrength = attackStrength;

    self.character = new Character(1, x, y, towerGraphic, life, true);

    self.update = function () {
        var i = 0,
            move = true;

        if(self.character.life <= 0) {
            self.character.isDead = true;
            return;
        }

        for(i = 0; i < towers.length; i += 1) {
            if(towers[i] !== self) {
                var d = self.character.distanceTo(towers[i].character);
                if(d < 8) {
                    self.character.entity.x += Math.round((Math.random() * 8 - 4));
                    self.character.entity.y += Math.round((Math.random() * 8 - 4));
                    break;
                }
            }
        }

        for(i = 0; i < enemies.length; i += 1) {
            var d = self.character.distanceTo(enemies[i].character);
            if(d <= self.sensorRange) {
                if(d <= self.attackRange) {
                    self.attack(enemies[i]);
                    move = false;
                    break;
                }
                break;
            }
        }
        if(move) {
            this.character.update();
        }
    };

    self.attack = function (enemy) {
        self.character.entity.rotation = Math.atan2(enemy.character.entity.y - self.character.entity.y, enemy.character.entity.x - self.character.entity.x) * 180.0 / Math.PI;
        enemy.character.life -= self.attackStrength * dt;
    };
}
