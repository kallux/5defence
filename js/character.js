function Character(speed, x, y, graphics, life, stopAtTarget) {
    var self = this;
    self.baseSpeed = speed;
    self.speed = self.baseSpeed;
    self.rotateAmount = 23;
    self.rotateDirection = Math.round(Math.random()) === 1 ? 1 : -1;
    self.moveToPoint = null;
    self.baseLife = life;
    self.life = life;
    self.isDead = false;
    self.stopAtTarget = stopAtTarget;

    self.entity = new Shape(graphics);

    self.entity.x = x;
    self.entity.y = y;
    self.entity.rotation = Math.random() * 360;
    var a = self.entity.rotation / 360.0 * Math.PI * 2;
    self.entity.vX = Math.cos(a) * self.speed;
    self.entity.vY = Math.sin(a) * self.speed;
    self.entity.regX = 8;
    self.entity.regY = 8;
    self.aggressors = 0;
    self.collided = [false, false, false];

    stage.addChild(self.entity);

    self.update = function () {
        var move = !self.stopAtTarget;
        self.aggressors = 0;
        self.rotate = !self.collided[0] && !self.collided[1] && !self.collided[2];
        self.collided = [false, self.collided[0], self.collided[1]];

        for (var i = 0; walls.length > i; i++) {
            var noloop = 450;
            while (walls[i].collision(self.entity.x + self.entity.vX * 1.1, self.entity.y + self.entity.vY * 1.1) && --noloop) {
                self.entity.rotation += self.rotateDirection * 0.8;
                var a = self.entity.rotation / 360.0 * Math.PI * 2;
                self.entity.vX = Math.cos(a) * self.speed * dt;
                self.entity.vY = Math.sin(a) * self.speed * dt;
                self.rotate = false;
                self.collided[0] = true;
            }
            if (noloop <= 0) {
                self.entity.x -= self.entity.vX * 0.3;
                self.entity.y -= self.entity.vY * 0.3;
                self.collided[0] = true;
                return;
            }
        }

        if (self.moveToPoint !== null) {
            move = true;
            if (Math.round(self.moveToPoint.x) === Math.round(self.entity.x) ||
                Math.round(self.moveToPoint.y) === Math.round(self.entity.y)) {
                self.moveToPoint = null;
            } else if (self.rotate) {
                self.entity.rotation = Math.atan2(self.moveToPoint.y - self.entity.y, self.moveToPoint.x - self.entity.x) * 180.0 / Math.PI;
            }
        }

        if (move) {
            self.entity.x += self.entity.vX;
            self.entity.y += self.entity.vY;
        }

        if (self.entity.x > canvas.width) {
            self.entity.x = canvas.width;
            self.entity.rotation += Math.random() * self.rotateAmount * self.rotateDirection;
        }
        if (self.entity.x < 0) {
            self.entity.x = 0;
            self.entity.rotation += Math.random() * self.rotateAmount * self.rotateDirection;
        }
        if (self.entity.y > canvas.height) {
            self.entity.y = canvas.height;
            self.entity.rotation += Math.random() * self.rotateAmount * self.rotateDirection;
        }
        if (self.entity.y < 0) {
            self.entity.y = 0;
            self.entity.rotation += Math.random() * self.rotateAmount * self.rotateDirection;
        }



        var a = self.entity.rotation / 360.0 * Math.PI * 2;
        self.entity.vX = Math.cos(a) * self.speed * dt;
        self.entity.vY = Math.sin(a) * self.speed * dt;
    };

    self.distanceTo = function (character) {
        if(character.entity.x === self.entity.x &&
            character.entity.y === self.entity.Y) {
            return 0;
        }
        var dx = character.entity.x - self.entity.x,
            dy = character.entity.y - self.entity.y;
        return Math.sqrt((dx * dx) + (dy * dy));
    }

    return self;
}
