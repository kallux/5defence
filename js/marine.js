var marines = [];

function Marine(x, y) {
    var self = this;
    self.speed = 1;
    self.moveToPoint = null;
    
    var g = new Graphics();
    g.beginFill("#f00");
    g.rect(-4,-4,10,10);
    g.beginFill("#00f");
    g.drawCircle(5,1,3);
    var shape = new Shape(g);
    self.entity = new Shape(g);
    self.label = new Text(Math.round(self.entity.x)+" "+Math.round(self.entity.y), "8px Arial", "#CCC");

    self.entity.x = x;
    self.entity.y = y;
    self.entity.rotation = Math.random() * 360;
    var a = self.entity.rotation / 360.0 * Math.PI * 2;

    stage.addChild(self.entity);
    stage.addChild(self.label);

    self.update = function () {
    };

    return self;
}

function addMarine() {
    marines.push(new Marine(canvas.width/2+200, canvas.height/2));
}
