
function Wall(xx, yy, width, height)
{
  self = this;
  self.color = "#f00";
  self.x = xx;
  self.y = yy;
  self.width = width;
  self.height = height;

  self.render = function () {
      var g = stoneGraphic.clone();
      g.sourceRect = new Rectangle(0, 0, width, height);
      var shape = new Shape(g);
      shape.x = self.x;
      shape.y = self.y;
      shape.shadow = new Shadow('#000', 5, 5, 15);
      stage.addChild(shape);
      return shape;
  }

  self.collision = function(targetX, targetY) {
    return targetX >= xx && targetX <= xx + width && targetY >= yy && targetY <= yy + height;
  }

}
