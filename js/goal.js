
function Goal(x, y, life) {
    var self = this;

    self.character = {};
    self.character.entity = new Shape(goalGraphic);
    self.character.entity.x = x;
    self.character.entity.y = y;
    self.character.entity.regX = 38;
    self.character.entity.regY = 224;

    self.baseLife = life;
    self.character.life = life;
    self.text = new Text(Math.round(self.life / self.baseLife * 100) + '%');
    self.text.x = x;
    self.text.y = y - 20;
    self.isGoal = true;
    stage.addChild(self.character.entity);
    stage.addChild(self.text);
    self.update = function () {
        if (self.character.life <= 0) {
            if (towers.length) {
                self.text.text = '';
            } else {
                self.text.text = 'Game Over';
            }
            self.character.isDead = true;
            return;
        } else {
            self.text.text = Math.round(self.character.life / self.baseLife * 100) + '%';
        }
    };
}
