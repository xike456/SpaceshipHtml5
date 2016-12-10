function Ship() {
    prototype.initialize();
//    var speed;

    var sprite = new createjs.Shape();
    sprite.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);

    prototype.addChild(sprite);
}

var prototype = Ship.prototype = new createjs.Container();

//public variable
prototype.speed;
prototype.vX;
prototype.vY;

prototype.Container_initialize = prototype.initialize;

prototype.initialize = function () {
    this.Container_initialize();
    this.x = 400;
    this.y = 240;
    this.vX = 0;
    this.vY = 0;
    this.speed = 100;
};

prototype.update = function (event) {
    var deltaTime = event.delta/1000;
    var mousePos = Global.getInstance().mouseHelper.getMousePos();
    var lenghX = Math.sqrt((mousePos.x - prototype.x)*(mousePos.x - prototype.x) + (mousePos.y - prototype.y)*(mousePos.y - prototype.y));
    var lenghX0 = Math.sqrt((mousePos.x - prototype.x)*(mousePos.x - prototype.x));

    var angle = Math.acos(lenghX0/lenghX);
    if (mousePos.x < prototype.x) {
        if (mousePos.y < prototype.y) {
            angle = angle +  Math.PI;
        } else {
            angle = Math.PI - angle;
        }
    } else {
        if (mousePos.y < prototype.y) {
            angle = Math.PI*2 - angle;
        } else {

        }
    }

//   console.log(angle* 180 / Math.PI);
    //accelerate
    this.vX = Math.cos(angle);
    this.vY = Math.sin(angle);
    console.log(this.vX + ' ' + this.vY);
    prototype.x += this.vX * prototype.speed * deltaTime;
    prototype.y += this.vY * prototype.speed * deltaTime;
};