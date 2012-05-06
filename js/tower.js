
function Tower(x, y, sensorRange, attackRange, attackStrength, life) {
    var self = this;
    self.sensorRange = sensorRange;
    self.attackRange = attackRange;
    self.attackStrength = attackStrength;

    self.character = new Character(1, x, y, towerGraphic, life, true);

    self.showFlare = false;
    self.flareTime = 0;
    self.flare = new Shape(flareGraphic);

    self.update = function () {
        var i = 0,
            move = true;

        self.flareTime -= dt;
        if(self.showFlare && self.flareTime <= 0) {
            stage.removeChild(self.flare);
            self.showFlare = false;
            console.log('removed flare');
        }

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
        var a = self.character.entity.rotation / 360.0 * Math.PI * 2;
        self.flare.rotation = self.character.entity.rotation;
        self.flare.x = self.character.entity.x;
        self.flare.y = self.character.entity.y;
        self.flare.x += Math.cos(a) * 12 * dt;
        self.flare.y += Math.sin(a) * 12 * dt;
        self.flare.regX = 8;
        self.flare.regY = 8;
        if(!self.showFlare && self.flareTime <= 0) {
            stage.addChildAt(self.flare, stage.getNumChildren() - 1);
            self.showFlare = true;
            self.flareTime = 5;
            console.log("added flare at " + self.flare.x + " " + self.flare.y, a);
        }
        self.character.entity.rotation = Math.atan2(enemy.character.entity.y - self.character.entity.y, enemy.character.entity.x - self.character.entity.x) * 180.0 / Math.PI;
        enemy.character.life -= self.attackStrength * dt;
    };
}
