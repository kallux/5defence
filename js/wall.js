
function Wall(x, y, width, height)
{
  self = this;
  self.color = "#f00";

  self.render = function() {
    var g = new Graphics();
    g.beginFill(self.color);
    g.rect(0,0,width,height);
    var shape = new Shape(g);
    shape.x = x;
    shape.y = y;
    stage.addChild(shape);
  }

}
