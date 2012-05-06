function Body(x, y, rotation, graphics) {
    var self = this;
    
    self.entity = new Shape(graphics);
    self.timer = Math.random() * 200 + 100;
    self.entity.x = x;
    self.entity.y = y;
    self.entity.rotation = rotation;

    stage.addChildAt(self.entity,bodies.length + 2);

    self.update = function () {
        self.timer -= dt;
        if(self.timer < 100) {
            self.entity.alpha = self.timer / 100.0;
        }
    };

    return self;
}
