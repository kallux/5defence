
function Enemy(x, y, sensorRange, attackRange, attackStrength, life) {
    var self = this;
    self.sensorRange = sensorRange;
    self.attackRange = attackRange;
    self.attackStrength = attackStrength;
    self.life = life;
    self.character = new Character(x, y);

    self.update = function () {
        var i = 0;
        for(i = 0; i < towers.length; i += 1) {
            if(self.character.distanceTo(towers[i].character) <= sensorRange) {
                self.moveToPoint = new Point(towers[i].character.x, towers[i].character.y);
                break;
            }
        }
        this.character.update();
    }
}
